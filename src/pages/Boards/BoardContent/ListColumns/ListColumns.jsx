import Box from "@mui/material/Box";
import Column from "./Column/Column";
import Button from "@mui/material/Button";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import {
  SortableContext,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import CloseIcon from "@mui/icons-material/Close";
import { toast } from "react-toastify";

const ListColumns = (props) => {
  const { columns } = props;
  const [openNewColumnForm, setOpenNewColumnForm] = useState(false);
  const toggleColumnNewColumnForm = () =>
    setOpenNewColumnForm(!openNewColumnForm);
  const [valueColumn, setValueColumn] = useState("");

  const addNewColumn = () => {
    // Add new column logic here
    if (!valueColumn) {
      toast.error("Please enter column title");
      return;
    }

    toggleColumnNewColumnForm();
    setValueColumn("");
  };
  return (
    /**  Value truyền vào items yêu cầu là 1 mảng  dạng ["1", "2", "3"], not [{id: "1"}, {id: "2}, {id: "3}]
     *  Vấn đề khi không chuyển động animations : https://github.com/clauderic/dnd-kit/issues/183#issuecomment-812569512
     * **/
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
        {!openNewColumnForm ? (
          <Box
            onClick={toggleColumnNewColumnForm}
            sx={{
              minWidth: "250px",
              maxWidth: "250px",
              bgcolor: "#ffffff3d",
              ml: 2,
              borderRadius: "6px",
              height: "fit-content",
              maxHeight: (theme) =>
                `calc(${
                  theme.trelloCustom.boardContentHeight
                } - ${theme.spacing(5)})`,
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
        ) : (
          <Box
            sx={{
              minWidth: "250px",
              maxWidth: "250px",
              mx: 2,
              p: 1,
              borderRadius: "6px",
              height: "fit-content",
              bgcolor: "#ffffff3d",
              display: "flex",
              flexDirection: "column",
              gap: 1,
            }}
          >
            <TextField
              label="Enter column title ..."
              type="text"
              size="small"
              variant="outlined"
              autoFocus
              value={valueColumn}
              onChange={(e) => setValueColumn(e.target.value)}
              sx={{
                "& label": { color: "white" },
                "& input": { color: "white" },
                "& label.Mui-focused": { color: "white" },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "white",
                  },
                  "&:hover fieldset": {
                    borderColor: "white",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "white",
                  },
                },
              }}
            />
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              <Button
                onClick={addNewColumn}
                variant="contained"
                color="success"
                size="small"
                sx={{
                  boxShadow: "none",
                  border: "0.5px solid",
                  borderColor: (theme) => theme.palette.success.main,
                  "&:hover": { bgcolor: (theme) => theme.palette.success.main },
                }}
              >
                Add Column
              </Button>
              <CloseIcon
                fontSize="small"
                sx={{
                  color: "white",
                  cursor: "pointer",
                  "&:hover": {
                    color: (theme) => theme.palette.warning.light,
                  },
                }}
                onClick={toggleColumnNewColumnForm}
              />
            </Box>
          </Box>
        )}
      </Box>
    </SortableContext>
  );
};

export default ListColumns;
