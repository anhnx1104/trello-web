import Container from "@mui/material/Container";
import AppBar from "~/components/AppBar/AppBar";
import BoardBar from "./BoardBar/BoardBar";
import BoardContent from "./BoardContent/BoardContent";
// import { mockData } from "~/apis/mock-data";
import { useEffect, useState } from "react";
import {
  fetchBoardDetailsApi,
  createColumnApi,
  createCardApi,
  updateBoradDetailsApi,
} from "~/apis";
import { generatePlaceholderCard } from "~/utils/formatters";
import { isEmpty } from "lodash";

const BoardDetails = () => {
  const [board, setBoard] = useState(null);
  useEffect(() => {
    const boardId = "672352d2bd6409b6e0251b2b";

    fetchBoardDetailsApi(boardId).then((res) => {
      res.columns.forEach((column) => {
        if (isEmpty(column.cards)) {
          column.cards = [generatePlaceholderCard(column)];
          column.cardOrderIds = [generatePlaceholderCard(column)._id];
        }
      });
      setBoard(res);
    });
  }, []);

  // Implement API call to create new column
  const createNewColumn = async (newColumnData) => {
    const createdColumn = await createColumnApi({
      ...newColumnData,
      boardId: board._id,
    });

    createdColumn.cards = [generatePlaceholderCard(createdColumn)];
    createdColumn.cardOrderIds = [generatePlaceholderCard(createdColumn)._id];
    const newBoard = {
      ...board,
    };

    newBoard.columns.push(createdColumn);
    newBoard.columnOrderIds.push(createdColumn._id);
    setBoard(newBoard);
  };

  // Implement API call to create new Card
  const createNewCard = async (newCardData) => {
    const createdCard = await createCardApi({
      ...newCardData,
      boardId: board._id,
    });
    const newBoard = {
      ...board,
    };
    const columnsToUpdate = newBoard.columns.find(
      (column) => column._id === createdCard.columnId
    );
    if (columnsToUpdate) {
      columnsToUpdate.cards.push(createdCard);
      columnsToUpdate.cardOrderIds.push(createdCard._id);
    }
    setBoard(newBoard);
  };
  const moveColumns = async (dndOrderedColumns) => {
    const dndOrderedColumnsIds = dndOrderedColumns.map((c) => c._id);
    const newBoard = {
      ...board,
    };
    newBoard.columns = dndOrderedColumns;
    newBoard.columnOrderIds = dndOrderedColumnsIds;
    setBoard(newBoard);

    // call api
    await updateBoradDetailsApi(newBoard._id, {
      columnOrderIds: dndOrderedColumnsIds,
    });
  };
  return (
    <Container disableGutters maxWidth={false} sx={{ height: "100vh" }}>
      <AppBar />
      <BoardBar board={board} />
      <BoardContent
        moveColumns={moveColumns}
        createNewCard={createNewCard}
        createNewColumn={createNewColumn}
        board={board}
      />
    </Container>
  );
};

export default BoardDetails;
