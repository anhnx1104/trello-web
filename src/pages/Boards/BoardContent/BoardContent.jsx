import Box from "@mui/material/Box";
import ListColumns from "./ListColumns/ListColumns";
import { mapOrder } from "~/utils/sorts";
import { useEffect, useState } from "react";
import {
  DndContext,
  PointerSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";

const BoardContent = (props) => {
  const { board } = props;

  const poiterSensors = useSensor(PointerSensor, {
    activationConstraint: { distance: 10 },
  });

  // yêu cầu di chuyển  ( distance ) 10px thì mới  kích hoạt event

  const mouseSensors = useSensor(MouseSensor, {
    activationConstraint: { distance: 10 },
  });

  // nhấn dữ 250ms của cảm ứng và di chuyển chênh lệch 5px thì kích hoặt event
  // sử lý trải nghiệm di chuyển  vào màn hình trên mobile
  const touchSensors = useSensor(TouchSensor, {
    activationConstraint: { delay: 250, tolerance: 500 },
  });

  const userMoveSensor = useSensors(mouseSensors, touchSensors);

  const [orderedColumns, setOrderedColumns] = useState([]);

  useEffect(() => {
    setOrderedColumns(mapOrder(board?.columns, board.columnOrderIds, "_id"));
  }, [board]);

  const handleDragEnd = (event) => {
    console.log("Drag ended: ", event);
    // Update columnOrderIds and cardOrderIds in the board

    const { active, over } = event;
    if (!over) return;

    if (active.id !== over.id) {
      // lấy vị trí cũ từ active
      const oldIndex = orderedColumns.findIndex((c) => c._id === active.id);
      // lấy vị trí mới từ over, điểm kết thúc

      const newIndex = orderedColumns.findIndex((c) => c._id === over.id);

      //  Dùng arrayMove để sắp xép lại mảng ban đầu
      const dndOrderedColumns = arrayMove(orderedColumns, oldIndex, newIndex);

      // const dndOrderedColumnsIds = dndOrderedColumns.map((c) => c._id);
      setOrderedColumns(dndOrderedColumns);
    }
  };

  return (
    <DndContext sensors={userMoveSensor} onDragEnd={handleDragEnd}>
      <Box
        sx={{
          bgcolor: (theme) =>
            theme.palette.mode === "dark" ? "#34495e" : "#1976d2",
          width: "100%",
          height: (theme) => theme.trelloCustom.boardContentHeight,
          p: "10px 0",
        }}
      >
        <ListColumns columns={orderedColumns} />
      </Box>
    </DndContext>
  );
};

export default BoardContent;
