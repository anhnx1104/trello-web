import axios from "axios";
import { API_ROOT } from "~/utils/constant";

// api board
export const fetchBoardDetailsApi = async (boardId) => {
  const response = await axios.get(`${API_ROOT}/v1/boards/${boardId}`);

  return response.data;
};

// api columns

export const createColumnApi = async (newColumnData) => {
  console.log(newColumnData);
  const response = await axios.post(`${API_ROOT}/v1/columns`, newColumnData);

  return response.data;
};

// cards
export const createCardApi = async (newCardData) => {
  const response = await axios.post(`${API_ROOT}/v1/cards`, newCardData);

  return response.data;
};
