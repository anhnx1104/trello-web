import Chip from "@mui/material/Chip";
import DashboardIcon from "@mui/icons-material/Dashboard";

import Box from "@mui/material/Box";
import theme from "~/theme";
import VpnLockIcon from "@mui/icons-material/VpnLock";
import AddToDriveIcon from "@mui/icons-material/AddToDrive";
import BoltIcon from "@mui/icons-material/Bolt";
import FilterListIcon from "@mui/icons-material/FilterList";
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import { Tooltip } from "@mui/material";
import Button from "@mui/material/Button";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { capitalizeFirstLetter } from "~/utils/formatters";
const menuStyle = {
  color: "white",
  bgcolor: "transparent",
  border: "none",
  paddingX: "5px",
  borderRadius: "4px",
  ".MuiSvgIcon-root": {
    color: "white",
  },
  "&:hover": {
    bgcolor: "primary.50",
  },
};

const BoardBar = (props) => {
  const { board } = props;

  return (
    <Box
      sx={{
        px: 2,
        width: "100%",
        height: theme.trelloCustom.boardBarHeight,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 2,
        overflowX: "auto",
        bgcolor: (theme) =>
          theme.palette.mode === "dark" ? "#34495e" : "#1976d2",
        borderBottom: "1px solid #fff",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
        }}
      >
        <Chip
          sx={menuStyle}
          clickable
          icon={<DashboardIcon />}
          label={capitalizeFirstLetter(board?.title)}
        />
        <Chip
          sx={menuStyle}
          clickable
          icon={<VpnLockIcon />}
          label={capitalizeFirstLetter(board?.type)}
        />
        <Chip
          sx={menuStyle}
          clickable
          icon={<AddToDriveIcon />}
          label="Add Google"
        />
        <Chip sx={menuStyle} clickable icon={<BoltIcon />} label="Automation" />
        <Chip
          sx={menuStyle}
          clickable
          icon={<FilterListIcon />}
          label="Filters"
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
        }}
      >
        <Button
          sx={{
            color: "white",
            borderColor: "white",

            "&:hover": {
              borderColor: "white",
            },
          }}
          startIcon={<PersonAddIcon />}
          variant="outlined"
        >
          Invite
        </Button>

        <AvatarGroup
          max={4}
          sx={{
            gap: "10px",
            "& .MuiAvatar-root": {
              width: 34,
              height: 34,
              fontSize: 16,
              border: "none",
              color: "white",
              cursor: "pointer",
              "&:first-of-type": { bgColor: "red" },
            },
          }}
        >
          <Tooltip title="Remy Sharp">
            <Avatar alt="Remy Sharp" src="./src/assets/avata.jpg" />
          </Tooltip>
          <Tooltip title="Remy Sharp">
            <Avatar alt="Remy Sharp" src="./src/assets/avata.jpg" />
          </Tooltip>
          <Tooltip title="Remy Sharp">
            <Avatar alt="Remy Sharp" src="./src/assets/avata.jpg" />
          </Tooltip>
          <Tooltip title="Remy Sharp">
            <Avatar alt="Remy Sharp" src="./src/assets/avata.jpg" />
          </Tooltip>
          <Tooltip title="Remy Sharp">
            <Avatar alt="Remy Sharp" src="./src/assets/avata.jpg" />
          </Tooltip>
        </AvatarGroup>
      </Box>
    </Box>
  );
};

export default BoardBar;
