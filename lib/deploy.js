import DataService from "lib/data";
import ApiService from "lib/api";

export default {
  log() {
    return ApiService.post("/api/deploy");
  },
  getCount() {
    return DataService.fetch("/api/deploy/get")
      .then((response) => response.ok && response.json())
      .then(({ count }) => count);
  },
};
