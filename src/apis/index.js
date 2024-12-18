import axios from "axios";
import { API_ROOT } from "~/utils/constant";

// api board
export const fetchBoardDetailsApi = async (boardId) => {
  const response = await axios.get(`${API_ROOT}/v1/boards/${boardId}`);

  return response.data;
};

// api columns
export const updateBoradDetailsApi = async (boardId, updateData) => {
  const response = await axios.put(
    `${API_ROOT}/v1/boards/${boardId}`,
    updateData
  );

  return response.data;
};

export const moveCardToDifferrentColumsApi = async (updateData) => {
  const response = await axios.put(
    `${API_ROOT}/v1/boards/supports/moving_card`,
    updateData
  );

  return response.data;
};

export const createColumnApi = async (newColumnData) => {
  const response = await axios.post(`${API_ROOT}/v1/columns`, newColumnData);

  return response.data;
};
export const updateColumnDetailsApi = async (columnId, updateData) => {
  const response = await axios.put(
    `${API_ROOT}/v1/columns/${columnId}`,
    updateData
  );

  return response.data;
};

// cards
export const createCardApi = async (newCardData) => {
  const response = await axios.post(`${API_ROOT}/v1/cards`, newCardData);
  return response.data;
};
