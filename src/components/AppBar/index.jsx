import Box from "@mui/material/Box";
import ModeSelect from "~/components/ModeSelect";
import AppsIcon from "@mui/icons-material/Apps";
import SvgIcon from "@mui/material/SvgIcon";
import Typography from "@mui/material/Typography";
import { ReactComponent as TrelloLogo } from "~/assets/trello.svg";
import Workpaces from "./Menus/Workpace";
import Recent from "./Menus/Recent";
import Starred from "./Menus/Starred";
import Templates from "./Menus/Template";
import Profile from "./Menus/Profile";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Badge from "@mui/material/Badge";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import Tooltip from "@mui/material/Tooltip";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";

function AppBar() {
  return (
    <Box
      px={2}
      sx={{
        width: "100%",
        height: (theme) => theme.trelloCustom.appBarHeight,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 2,
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
        }}
      >
        <AppsIcon sx={{ color: "primary.main" }} />
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 0.5,
          }}
        >
          <SvgIcon
            component={TrelloLogo}
            inheritViewBox
            sx={{
              color: "primary.main",
            }}
          />
          <Typography
            variant="span"
            sx={{
              color: "primary.main",
              fontWeight: "bold",
              fontSize: "1.2rem",
            }}
          >
            {" "}
            Trello
          </Typography>
        </Box>

        <Workpaces />
        <Recent />
        <Starred />
        <Templates />

        <Button variant="outlined">Create Board</Button>
      </Box>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
        }}
      >
        <TextField
          id="outlined-search"
          label="Search ..."
          type="search"
          size="small"
        />

        <ModeSelect />
        <Tooltip title="Notificationsn">
          <Badge
            color="secondary"
            variant="dot"
            sx={{
              cursor: "pointer",
            }}
          >
            <NotificationsNoneIcon />
          </Badge>
        </Tooltip>

        <Tooltip title="HelpOutlineIcon">
          <Badge
            color="secondary"
            variant="dot"
            sx={{
              cursor: "pointer",
            }}
          >
            <HelpOutlineIcon />
          </Badge>
        </Tooltip>
        <Profile />
      </Box>
    </Box>
  );
}

export default AppBar;
