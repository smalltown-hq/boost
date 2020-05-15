import { useEffect } from "react";
import Router from "next/router";
import useSWR from "swr";
import ApiService from "services/api";

function fetcher(route) {
  return ApiService.fetch(route)
    .then((r) => r.ok && r.json())
    .then((user) => user || null);
}

export default function useAuth({ redirectTo } = {}) {
  const { data: user, error } = useSWR("/user", fetcher);
  const loading = user === undefined;

  // handle redirections
  useEffect(() => {
    if (!redirectTo || loading) return;

    if (redirectTo && !user) {
      localStorage.setItem("_bRedirectTo", Router.route);
      Router.push(redirectTo);
    }
  }, [redirectTo, user, loading]);

  return error ? null : user;
}
