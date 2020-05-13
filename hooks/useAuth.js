import { useEffect } from "react";
import Router from "next/router";
import useSWR from "swr";

const fetcher = (route) =>
  fetch(route)
    .then((r) => r.json())
    .then((user) => user || null);

export default function useAuth({ redirectTo } = {}) {
  const { data: user, error } = useSWR("/api/user", fetcher);
  const loading = user === undefined;

  // handle redirections
  useEffect(() => {
    if (!redirectTo || loading) return;

    if (redirectTo && !user) {
      Router.push(redirectTo);
    }
  }, [redirectTo, user, loading]);

  return error ? null : user;
}
