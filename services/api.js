const API_HOST =
  process.env.NODE_ENV === "production"
    ? "https://getboost.app"
    : "http://localhost:3001";

export default {
  fetch(route, options) {
    return fetch(`${API_HOST}/api${route}`, options);
  },
};
