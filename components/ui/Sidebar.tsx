import { useContext } from "react";

import {
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";

import { UIContext } from "../../context/ui";

export const Sidebar = () => {
  const { sideMenuOpen, closeSideMenu } = useContext(UIContext);

  return (
    <Drawer anchor="left" open={sideMenuOpen} onClose={closeSideMenu}>
      <Box sx={{ width: 250 }}>
        <Box
          sx={{
            padding: "5px 10px",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h4">Menu</Typography>
        </Box>
        <Divider />
        <List>
          <ListItem button>
            <ListItemIcon>
              <AddCircleOutlineOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary={"Create"} />
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );
};
