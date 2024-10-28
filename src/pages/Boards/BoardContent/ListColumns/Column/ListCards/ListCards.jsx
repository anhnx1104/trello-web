import Box from "@mui/material/Box";
import Cards from "./Card/Card";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

const ListCards = (props) => {
  const { cards } = props;

  return (
    <SortableContext
      items={cards?.map((a) => a._id)}
      strategy={verticalListSortingStrategy}
    >
      <Box
        sx={{
          p: "0 5px",
          m: "0 5px",
          display: "flex",
          flexDirection: "column",
          gap: 1,
          overflowX: "hidden",
          overflowY: "auto",
          maxHeight: (theme) =>
            `calc(
            ${theme.trelloCustom.boardContentHeight} - 
            ${theme.spacing(5)} - 
            ${theme.trelloCustom.columnHeaderHeight} -
            ${theme.trelloCustom.columnFooterHeight} )`,
          /* Tùy chỉnh thanh cuộn */
          "&::-webkit-scrollbar": {
            width: "8px",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#ced0da",
            borderRadius: "8px",
          },
          "&::-webkit-scrollbar-thumb:hover": {
            backgroundColor: "#bfc2cf",
          },
        }}
      >
        {cards?.map((card) => {
          return <Cards card={card} key={card._id} />;
        })}
      </Box>
    </SortableContext>
  );
};

export default ListCards;
