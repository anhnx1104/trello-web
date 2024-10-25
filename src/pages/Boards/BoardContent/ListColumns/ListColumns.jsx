import Box from "@mui/material/Box";
import Column from "./Column/Column";
import Button from "@mui/material/Button";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import {
  SortableContext,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";

const ListColumns = (props) => {
  const { columns } = props;
  /**  Value truyền vào items yêu cầu là 1 mảng  dạng ["1", "2", "3"], not [{id: "1"}, {id: "2}, {id: "3}]
   *  Vấn đề khi không chuyển động animations : https://github.com/clauderic/dnd-kit/issues/183#issuecomment-812569512
   * **/
  return (
    <SortableContext
      items={columns?.map((a) => a._id)}
      strategy={horizontalListSortingStrategy}
    >
      <Box
        sx={{
          bgcolor: "inherit",
          width: "100%",
          height: "100%",
          display: "flex",
          overflowX: "auto",
          overflowY: "hidden",
          "&::-webkit-scrollbar-track": {
            m: 2,
          },
        }}
      >
        {columns?.map((column) => {
          return <Column column={column} key={column._id} />;
        })}

        {/* Add new column here */}
        <Box
          sx={{
            minWidth: "200px",
            maxWidth: "200px",
            bgcolor: "#ffffff3d",
            ml: 2,
            borderRadius: "6px",
            height: "fit-content",
            maxHeight: (theme) =>
              `calc(${theme.trelloCustom.boardContentHeight} - ${theme.spacing(
                5
              )})`,
          }}
        >
          <Button
            sx={{
              color: "white",
              width: "100%",
              justifyContent: "flex-start",
              pl: 2.5,
              py: 1,
            }}
            startIcon={<NoteAddIcon />}
          >
            Add new column
          </Button>
        </Box>
      </Box>
    </SortableContext>
  );
};

export default ListColumns;
