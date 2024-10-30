import Container from "@mui/material/Container";
import AppBar from "~/components/AppBar/AppBar";
import BoardBar from "./BoardBar/BoardBar";
import BoardContent from "./BoardContent/BoardContent";
import { mockData } from "~/apis/mock-data";
import { useEffect, useState } from "react";
import { fetchBoardDetailsApi } from "~/apis";

const BoardDetails = () => {
  const [board, setBoard] = useState(null);

  useEffect(() => {
    const boardId = "6721da00bee5d8bbf2540f89";

    fetchBoardDetailsApi(boardId).then((res) => {
      setBoard(res);
      console.log("data", res);
    });
  }, []);
  return (
    <Container disableGutters maxWidth={false} sx={{ height: "100vh" }}>
      <AppBar />
      <BoardBar board={mockData.board} />
      <BoardContent board={mockData.board} />
    </Container>
  );
};

export default BoardDetails;
