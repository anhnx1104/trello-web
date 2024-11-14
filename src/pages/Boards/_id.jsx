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
  updateColumnDetailsApi,
  moveCardToDifferrentColumsApi,
} from "~/apis";
import { generatePlaceholderCard } from "~/utils/formatters";
import { isEmpty } from "lodash";
import { mapOrder } from "~/utils/sorts";
import Box from "@mui/material/Box";

const BoardDetails = () => {
  const [board, setBoard] = useState(null);
  useEffect(() => {
    const boardId = "672352d2bd6409b6e0251b2b";
    fetchBoardDetailsApi(boardId).then((res) => {
      res.columns = mapOrder(res?.columns, res?.columnOrderIds, "_id");
      res.columns.forEach((column) => {
        if (isEmpty(column.cards)) {
          column.cards = [generatePlaceholderCard(column)];
          column.cardOrderIds = [generatePlaceholderCard(column)._id];
        } else {
          column.cards = mapOrder(column?.cards, column.cardOrderIds, "_id");
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
      if (columnsToUpdate.cards.some((card) => card.FE_PlaceholderCard)) {
        columnsToUpdate.cards = [createdCard];
        columnsToUpdate.cardOrderIds = [createdCard._id];
      } else {
        columnsToUpdate.cards.push(createdCard);
        columnsToUpdate.cardOrderIds.push(createdCard._id);
      }
    }
    setBoard(newBoard);
  };
  const moveColumns = (dndOrderedColumns) => {
    const dndOrderedColumnsIds = dndOrderedColumns.map((c) => c._id);
    const newBoard = {
      ...board,
    };
    newBoard.columns = dndOrderedColumns;
    newBoard.columnOrderIds = dndOrderedColumnsIds;
    setBoard(newBoard);

    // call api
    updateBoradDetailsApi(newBoard._id, {
      columnOrderIds: dndOrderedColumnsIds,
    });
  };

  //  di chuyển card cùng 1 column
  const moveCardInTheSameColumn = (
    dndOrderedCards,
    dndOderCardIds,
    columnId
  ) => {
    const newBoard = {
      ...board,
    };
    const columnsToUpdate = newBoard?.columns.find(
      (column) => column._id === columnId
    );
    if (columnsToUpdate) {
      columnsToUpdate.cards = dndOrderedCards;
      columnsToUpdate.cardOrderIds = dndOderCardIds;
    }
    setBoard(newBoard);
    updateColumnDetailsApi(columnId, {
      cardOrderIds: dndOderCardIds,
    });
  };

  const moveCardToDifferrentColums = (
    curentCardId,
    prevColumnId,
    nextColumnId,
    dndOrderedColumns
  ) => {
    // console.log("curentCardId", curentCardId);
    // console.log("prevColumnId", prevColumnId);
    // console.log("nextColumn", nextColumn);
    // console.log("dndOrderedColumns", dndOrderedColumns);

    const dndOrderedColumnsIds = dndOrderedColumns.map((c) => c._id);
    const newBoard = {
      ...board,
    };
    newBoard.columns = dndOrderedColumns;
    newBoard.columnOrderIds = dndOrderedColumnsIds;
    setBoard(newBoard);

    let prevCardOrderIds = dndOrderedColumns.find(
      (c) => c._id === prevColumnId
    )?.cardOrderIds;
    if (prevCardOrderIds[0].includes("placeholder-card")) {
      prevCardOrderIds = [];
    }
    // call api handle move card
    moveCardToDifferrentColumsApi({
      curentCardId,
      prevColumnId,
      prevCardOrderIds,
      nextColumnId,
      nextCardOrderIds: dndOrderedColumns.find((c) => c._id === nextColumnId)
        ?.cardOrderIds,
    });
  };
  if (!board) {
    return <Box>Loadding ....</Box>;
  }
  return (
    <Container disableGutters maxWidth={false} sx={{ height: "100vh" }}>
      <AppBar />
      <BoardBar board={board} />
      <BoardContent
        moveColumns={moveColumns}
        moveCardInTheSameColumn={moveCardInTheSameColumn}
        createNewCard={createNewCard}
        createNewColumn={createNewColumn}
        board={board}
        moveCardToDifferrentColums={moveCardToDifferrentColums}
      />
    </Container>
  );
};

export default BoardDetails;
