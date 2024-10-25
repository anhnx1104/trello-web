import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { Card as MuiCard } from "@mui/material";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CommentIcon from "@mui/icons-material/Comment";
import GroupIcon from "@mui/icons-material/Group";
import AttachmentIcon from "@mui/icons-material/Attachment";

const Cards = ({ hidenMedia }) => {
  if (hidenMedia)
    return (
      <MuiCard
        sx={{
          cursor: "pointer",
          boxShadow: "0 1px 1px rgba(0,0,0,0.2)",
          overflow: "unset",
        }}
      >
        <CardContent
          sx={{
            p: 1.5,
            "&:last-child": {
              p: 1.5,
            },
          }}
        >
          <Typography>Card test 01</Typography>
        </CardContent>
      </MuiCard>
    );
  return (
    <MuiCard
      sx={{
        cursor: "pointer",
        boxShadow: "0 1px 1px rgba(0,0,0,0.2)",
        overflow: "unset",
      }}
    >
      <CardMedia
        sx={{ height: 140 }}
        image="https://ima.global/static/eb5994962050fc30ced1f6ee66064660/5f18e/ima_487b64a1a2.jpg"
        title="green iguana"
      />
      <CardContent
        sx={{
          p: 1.5,
          "&:last-child": {
            p: 1.5,
          },
        }}
      >
        <Typography>Xuan Anh Nguyen</Typography>
      </CardContent>
      <CardActions
        sx={{
          p: "0 4px 8px 4px",
        }}
      >
        <Button startIcon={<GroupIcon />} size="small">
          15
        </Button>
        <Button startIcon={<CommentIcon />} size="small">
          40
        </Button>
        <Button startIcon={<AttachmentIcon />} size="small">
          30
        </Button>
      </CardActions>
    </MuiCard>
  );
};

export default Cards;
