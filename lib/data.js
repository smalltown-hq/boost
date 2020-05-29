const API_HOST =
  process.env.NODE_ENV === "production"
    ? "https://api.getboost.app"
    : "http://localhost:3001";

export default {
  fetch(route, options = {}) {
    return fetch(`${API_HOST}${route}`, options);
  },
};
