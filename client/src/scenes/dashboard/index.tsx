import { Box, useMediaQuery, useTheme } from "@mui/material";
import React from "react";

// type indexProps = {};
//# represents the grid how each "box" will fill out at this point
const gridTemplateLargeScreens = `
    "a b c"
    "a b c"
    "a b c"
    "a b f"
    "d e f"
    "d e f"
    "d h i"
    "g h i"
    "g h j"
    "g h j"
    "g h j"
`;

const gridTemplateSmallScreens = `
    "a"
    "a"
    "a"
    "a"
    "b"
    "b"
    "b"
    "c"
    "c"
    "c"
    "d"
    "d"
    "d"
    "e"
    "e"
    "f"
    "f"
    "f"
    "g"
    "g"
    "g"
    "h"
    "h"
    "h"
    "h"
    "i"
    "i"
    "j"
    "j"

`;
const Dashboard: React.FC = () => {
  const isAboveMediumScreens = useMediaQuery("(min-width:1000px)");

  const { palette } = useTheme();

  return (
    <Box
      width="100%"
      height="100%"
      display={"grid"}
      gap="1.5rem"
      //dictatexs the layout of the boxes
      sx={
        isAboveMediumScreens
          ? {
              gridTemplateColumns: "repeat(3,minmax(370px, 1fr))",
              gridTemplateRows: "repeat(10,minmax(60px,1fr))",
              gridTemplateAreas: gridTemplateLargeScreens,
            }
          : {
              gridTemplateAreas: gridTemplateSmallScreens,
              gridAutoColumns: "1fr",
              gridAutoRows: "80px",
            }
      }
    >
      <Box gridArea={"a"} bgcolor="#fff"></Box>
      <Box gridArea={"b"} bgcolor="#fff"></Box>
      <Box gridArea={"c"} bgcolor="#fff"></Box>
      <Box gridArea={"d"} bgcolor="#fff"></Box>
      <Box gridArea={"e"} bgcolor="#fff"></Box>
      <Box gridArea={"f"} bgcolor="#fff"></Box>
      <Box gridArea={"g"} bgcolor="#fff"></Box>
      <Box gridArea={"h"} bgcolor="#fff"></Box>
      <Box gridArea={"i"} bgcolor="#fff"></Box>
      <Box gridArea={"j"} bgcolor="#fff"></Box>
    </Box>
  );
};
export default Dashboard;
