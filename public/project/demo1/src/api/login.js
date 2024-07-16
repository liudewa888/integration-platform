import { request } from "../utils/request";

export const toLoginApi = (data) => {
  const url = "/admin/login";
  return request.post(url, data);
};
