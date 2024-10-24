import * as React from "react";

import Box from "@mui/material/Box";

const BoardContent = () => {
  return (
    <Box
      sx={{
        bgcolor: (theme) =>
          theme.palette.mode === "dark" ? "#34495e" : "#1976d2",
        width: "100%",
        height: (theme) =>
          `calc(100vh - ${theme.trelloCustom.appBarHeight} - ${theme.trelloCustom.boardBarHeight})`,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      Board Content
    </Box>
  );
};

export default BoardContent;
