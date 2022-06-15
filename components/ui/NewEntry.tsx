import { useContext, useState } from "react";
import { Box } from "@mui/material";
import { AddTodoForm, AddTodoButton } from "./";
import { UIContext } from "../../context/ui/UIContext";

export const NewEntry = () => {
  const { isAddingEntry } = useContext(UIContext);
  return (
    <Box sx={{ marginBottom: 2, paddingX: 2 }}>
      {isAddingEntry ? <AddTodoForm /> : <AddTodoButton />}
    </Box>
  );
};
