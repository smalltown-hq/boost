import { useEffect } from "react";
import Router from "next/router";
import useSWR from "swr";
import CookieService from "services/cookie";

function fetcher(route) {
  return fetch(route)
    .then((r) => r.ok && r.json())
    .then((user) => user || null);
}

export default function useAuth({ redirectTo } = {}) {
  const { data: user, error, mutate } = useSWR("/api/user", fetcher);
  const loading = user === undefined;

  // handle redirections
  useEffect(() => {
    if (!redirectTo || loading) return;

    if (redirectTo && !user) {
      localStorage.setItem("_bRedirectTo", Router.route);
      Router.push(redirectTo);
    }
  }, [redirectTo, user, loading]);

  if (user) {
    user.logout = () => {
      CookieService.removeAuthCookie();
      mutate();
    };
  }

  return {
    user,
    loading,
    error,
  };
}
