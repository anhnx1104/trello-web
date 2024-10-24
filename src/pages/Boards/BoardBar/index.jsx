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
const menuStyle = {
  color: "primary.main",
  bgcolor: "white",
  border: "none",
  paddingX: "5px",
  borderRadius: "4px",
  "& .MuiSvgIcon-root": {
    color: "primary.main",
  },
  "&:hover": {
    backgroundColor: "primary.50",
  },
};

const BoardBar = () => {
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
        borderTop: "1px solid #00bfa5",
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
          label="Anh NX"
        />
        <Chip
          sx={menuStyle}
          clickable
          icon={<VpnLockIcon />}
          label="Workpace"
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
        <Button startIcon={<PersonAddIcon />} variant="outlined">
          Invite
        </Button>

        <AvatarGroup
          max={4}
          sx={{
            "& .MuiAvatar-root": {
              width: 34,
              height: 34,
              fontSize: 16,
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
