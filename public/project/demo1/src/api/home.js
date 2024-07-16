import { request } from "../utils/request";

export const findWinnerApi = (data) => {
  const url = "/findWinner";
  return request.post(url, data);
};
