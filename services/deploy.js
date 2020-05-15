import ApiService from "services/api";

export default {
  log() {
    return fetch("/api/deploy", { method: "POST" });
  },
  getCount() {
    return ApiService.fetch("/api/deploy/get")
      .then((response) => response.ok && response.json())
      .then(({ count }) => count);
  },
};
