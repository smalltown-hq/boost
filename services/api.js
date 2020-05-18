export default {
  post(route, options) {
    return fetch(route, {
      ...options,
      method: "POST",
    });
  },
  get(route, options) {
    return fetch(route, {
      ...options,
      method: "GET",
    });
  },
};
