import { useContext } from "react";
import { Button } from "@mui/material";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import { UIContext } from "../../context/ui";

export const AddTodoButton = () => {
  const { setIsAddingEntry } = useContext(UIContext);
  return (
    <>
      <Button
        startIcon={<AddCircleOutlineOutlinedIcon />}
        fullWidth
        variant="outlined"
        onClick={() => setIsAddingEntry(true)}
      >
        Add Todo
      </Button>
    </>
  );
};
