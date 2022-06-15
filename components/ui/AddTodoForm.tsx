import { ChangeEvent, useContext, useState } from "react";
import { Button, Box, TextField } from "@mui/material";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import { EntriesContex } from "../../context/entries";
import { UIContext } from "../../context/ui";

export const AddTodoForm = () => {
  const [inputValue, setInputValue] = useState("");
  const [touched, setTouched] = useState(false);

  const { addNewEntry } = useContext(EntriesContex);
  const { setIsAddingEntry } = useContext(UIContext);

  const onTextFieldChanged = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const onSave = () => {
    if (inputValue.length === 0) return;
    addNewEntry(inputValue);
    setInputValue("");
    setTouched(false);
    setIsAddingEntry(false);
  };
  return (
    <>
      <TextField
        fullWidth
        autoFocus
        multiline
        placeholder="New Entry"
        label="New Entry"
        value={inputValue}
        onChange={onTextFieldChanged}
        helperText={inputValue.length <= 0 && touched && "Enter a value"}
        error={inputValue.length <= 0 && touched}
        onBlur={() => setTouched(true)}
        sx={{ marginTop: 2, marginBottom: 1 }}
      />
      <Box display="flex" justifyContent="space-between">
        <Button
          variant="text"
          color="warning"
          onClick={() => {
            setTouched(false);
            setIsAddingEntry(false);
          }}
        >
          Cancel
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          endIcon={<SaveOutlinedIcon />}
          onClick={() => onSave()}
        >
          Save
        </Button>
      </Box>
    </>
  );
};
