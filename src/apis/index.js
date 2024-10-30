import axios from "axios";
import { API_ROOT } from "~/utils/constant";

export const fetchBoardDetailsApi = async (boardId) => {
  const response = await axios.get(`${API_ROOT}/v1/boards/${boardId}`);

  return response.data;
};