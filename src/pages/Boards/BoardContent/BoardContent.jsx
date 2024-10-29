import Box from "@mui/material/Box";
import ListColumns from "./ListColumns/ListColumns";
import { mapOrder } from "~/utils/sorts";
import { useEffect, useState } from "react";
import {
  DndContext,
  // PointerSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  DragOverlay,
  defaultDropAnimationSideEffects,
  closestCorners,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import Column from "./ListColumns/Column/Column";
import Cards from "./ListColumns/Column/ListCards/Card/Card";
import { cloneDeep } from "lodash";

const ACTIVE_DRAG_ITEM_TYPE = {
  COLUMN: "ACTIVE_DRAG_ITEM_TYPE_COLUMN",
  CARD: "ACTIVE_DRAG_ITEM_TYPE_CARD",
};

const BoardContent = (props) => {
  const { board } = props;

  // const poiterSensors = useSensor(PointerSensor, {
  //   activationConstraint: { distance: 10 },
  // });

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

  //  sử lý active xem đang kéo card hay kéo column, và chỉ có thể kéo column hoặc ID
  const [activeDragItemId, setActiveDragItemId] = useState([]);
  const [activeDragItemType, setActiveDragItemType] = useState([]);
  const [activeDragItemData, setActiveDragItemData] = useState([]);
  const [oldColumnWhenDraggingCard, setOldColumnWhenDraggingCard] = useState(
    []
  );

  useEffect(() => {
    setOrderedColumns(mapOrder(board?.columns, board.columnOrderIds, "_id"));
  }, [board]);

  const findColumnByCard = (cardId) => {
    return orderedColumns.find((column) =>
      column?.cards?.map((card) => card._id)?.includes(cardId)
    );
  };

  //  cập nhật lại state  trong trường hợp di chuyển card
  const moveCardBetweenDifferentColumns = (
    overColumn,
    overCardId,
    active,
    over,
    activeColumn,
    activeDraggingCardId,
    activeDraggingCardData
  ) => {
    setOrderedColumns((prevColumns) => {
      //  Tìm vị trí mà cái card đang active sắp được thả
      const overCardIndex = overColumn?.cards?.findIndex(
        (card) => card._id === overCardId
      );
      let newCardIndex;
      const isBelowOverItem =
        active.rect.current.translated &&
        active.rect.current.translated.top > over.rect.top + over.rect.height;

      const modifier = isBelowOverItem ? 1 : 0;

      newCardIndex =
        overCardIndex >= 0
          ? overCardIndex + modifier
          : overColumn?.cards?.length + 1;

      // console.log("newCardIndex", newCardIndex);
      // sử dụng thư viện Lodash để lưu dữ liệu , deep copy
      const nextColumns = cloneDeep(prevColumns);
      const nextActiveColumn = nextColumns.find(
        (column) => column._id === activeColumn._id
      );
      const nextOverColumn = nextColumns.find(
        (column) => column._id === overColumn._id
      );

      if (nextActiveColumn) {
        // Xoá card ra khỏi column cũ
        nextActiveColumn.cards = nextActiveColumn.cards.filter(
          (card) => card._id !== activeDraggingCardId
        );
        // Cập nhật lại mảng vào cho chuẩn dữ liệu
        nextActiveColumn.cardOrderIds = nextActiveColumn.cards.map(
          (card) => card._id
        );
      }

      // Update cardOrderIds in the over column

      if (nextOverColumn) {
        // kiểm tra card đang kéo có ở cột mới chưa, nếu có rồi thì xoá đi
        nextOverColumn.cards = nextOverColumn.cards.filter(
          (card) => card._id !== activeDraggingCardId
        );

        const rebuild_activeDraggingCardData = {
          ...activeDraggingCardData,
          columnId: nextOverColumn._id,
        };

        // thêm cái card đang kéo vào column mới
        nextOverColumn.cards = nextOverColumn.cards.toSpliced(
          newCardIndex,
          0,
          rebuild_activeDraggingCardData
        );
        // Cập nhật lại mảng vào cho chuẩn dữ liệu
        nextOverColumn.cardOrderIds = nextOverColumn.cards.map(
          (card) => card._id
        );
      }
      return nextColumns;
    });
  };

  const handleDragStart = (event) => {
    // console.log(" handleDragStart: ", event);
    setActiveDragItemId(event?.active?.id);
    setActiveDragItemType(
      event?.active?.data?.current?.columnId
        ? ACTIVE_DRAG_ITEM_TYPE.CARD
        : ACTIVE_DRAG_ITEM_TYPE.COLUMN
    );

    setActiveDragItemData(event?.active?.data?.current);

    // Nếu là kéo card thì set giá trị cũ của cột
    if (event?.active?.data?.current?.columnId) {
      setOldColumnWhenDraggingCard(findColumnByCard(event?.active?.id));
    }
  };

  // hàm sử lý quá trình kéo 1 phần tử
  const handleDragOver = (event) => {
    if (ACTIVE_DRAG_ITEM_TYPE === ACTIVE_DRAG_ITEM_TYPE.COLUMN) return;

    const { active, over } = event;

    if (!over || !active) return;

    const {
      id: activeDraggingCardId,
      data: { current: activeDraggingCardData },
    } = active;

    // overCard là card đang bấm vào tương tác
    const { id: overCardId } = over;

    const activeColumn = findColumnByCard(activeDraggingCardId);
    const overColumn = findColumnByCard(overCardId);

    // console.log("activeColumn", activeColumn);
    // console.log("overColumn", overColumn);

    if (!activeColumn || !overColumn) return;
    if (activeColumn._id !== overColumn._id) {
      // code chạy vào đây khi thay đổi từ cột này sang cột khác còn cùng 1 cột thì ko làm gì hết
      moveCardBetweenDifferentColumns(
        overColumn,
        overCardId,
        active,
        over,
        activeColumn,
        activeDraggingCardId,
        activeDraggingCardData
      );
    }
  };

  // hàm sử lý khi kết thúc hành động thả tay ra
  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over) return;

    // console.log("Drag ended: ", event);
    // Xử lý khi kéo card
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD) {
      const {
        id: activeDraggingCardId,
        data: { current: activeDraggingCardData },
      } = active;

      // overCard là card đang bấm vào tương tác
      const { id: overCardId } = over;

      const activeColumn = findColumnByCard(activeDraggingCardId);
      const overColumn = findColumnByCard(overCardId);

      if (!activeColumn || !overColumn) return;

      if (oldColumnWhenDraggingCard._id !== overColumn._id) {
        // console.log("hành động kéo thả card giữa 2 column khác nhau")
        moveCardBetweenDifferentColumns(
          overColumn,
          overCardId,
          active,
          over,
          activeColumn,
          activeDraggingCardId,
          activeDraggingCardData
        );
      } else {
        // console.log("Hành động kéo thả card cùng 1 column");
        // lấy vị trí cũ từ oldColumnWhenDraggingCard

        const oldCardIndex = oldColumnWhenDraggingCard?.cards.findIndex(
          (c) => c._id === activeDragItemId
        );
        // lấy vị trí mới từ over, điểm kết thúc

        const newCardIndex = overColumn?.cards?.findIndex(
          (c) => c._id === overCardId
        );

        //  Dùng arrayMove để sắp xép lại mảng ban đầu, logic tương tự kéo coloum trong boardContents

        const dndOrderedCards = arrayMove(
          oldColumnWhenDraggingCard?.cards,
          oldCardIndex,
          newCardIndex
        );
        setOrderedColumns((prevColumns) => {
          const nextColumns = cloneDeep(prevColumns);

          //  tìm đến đúng cái coulum mà card được thả
          const targetColumn = nextColumns.find(
            (column) => column._id === overColumn._id
          );

          targetColumn.cards = dndOrderedCards;
          targetColumn.cardOrderIds = dndOrderedCards.map((card) => card._id);

          return nextColumns;
        });
      }
    }

    // Xử lý khi kéo column
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) {
      if (active.id !== over.id) {
        // lấy vị trí cũ từ active
        const oldColumnIndex = orderedColumns.findIndex(
          (c) => c._id === active.id
        );
        // lấy vị trí mới từ over, điểm kết thúc

        const newColumnIndex = orderedColumns.findIndex(
          (c) => c._id === over.id
        );

        //  Dùng arrayMove để sắp xép lại mảng ban đầu
        const dndOrderedColumns = arrayMove(
          orderedColumns,
          oldColumnIndex,
          newColumnIndex
        );

        // const dndOrderedColumnsIds = dndOrderedColumns.map((c) => c._id);
        setOrderedColumns(dndOrderedColumns);
      }
    }

    // set giá trị về null khi thả tay
    setActiveDragItemId(null);
    setActiveDragItemType(null);
    setActiveDragItemData(null);
    setOldColumnWhenDraggingCard(null);
  };

  // Sử lý animation khi thả tay ra cho mượt
  const dropAnimationCustom = {
    sideEffect: defaultDropAnimationSideEffects({
      styles: {
        active: {
          backgroundColor: (theme) =>
            theme.palette.mode === "dark" ? "#34495e" : "#1976d2",
          opacity: 0.5,
        },
      },
    }),
  };

  return (
    <DndContext
      sensors={userMoveSensor}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
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
        {/* Hiển thị khi đang di chuyển */}
        <DragOverlay dropAnimation={dropAnimationCustom}>
          {!activeDragItemType && null}
          {activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN && (
            <Column column={activeDragItemData} />
          )}
          {activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD && (
            <Cards card={activeDragItemData} />
          )}
        </DragOverlay>{" "}
      </Box>
    </DndContext>
  );
};

export default BoardContent;
