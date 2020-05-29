function request(route, { method, body, ...options }) {
  return fetch("/api/data", {
    ...options,
    headers: {
      ...options.headers,
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({ route, body, method }),
  });
}

export default {
  post(route, options = {}) {
    return request(route, (options = { ...options, method: "POST" }));
  },
  get(route, options = {}) {
    return request(route, (options = { ...options, method: "GET" }));
  },
};
