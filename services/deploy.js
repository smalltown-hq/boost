import ApiService from "services/api";

export default {
  log() {
    return ApiService.fetch("/deploy", { method: "POST" });
  },
  getCount() {
    return ApiService.fetch("/deploy/get")
      .then((response) => response.ok && response.json())
      .then(({ count }) => count);
  },
};
