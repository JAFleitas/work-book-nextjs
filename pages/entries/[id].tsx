import { ChangeEvent, useState, useMemo, FC, useContext } from "react";
import { GetServerSideProps } from "next";
import {
  Button,
  capitalize,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  IconButton,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";

import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { Layout } from "../../components/layouts/Layout";
import { Entry, EntryStatus } from "../../interfaces";
import { dbEntries } from "../../database";
import { EntriesContex } from "../../context/entries";

const validStatus: EntryStatus[] = ["pending", "in-progress", "finished"];

interface Props {
  entry: Entry;
}

const EntryPage: FC<Props> = ({ entry }) => {
  const [inputValue, setInputValue] = useState(entry.description);
  const [status, setStatus] = useState<EntryStatus>(entry.status);
  const [touched, setTouched] = useState(false);
  const isNotValid = useMemo(
    () => inputValue.length <= 0 && touched,
    [inputValue, touched]
  );

  const { updateEntry } = useContext(EntriesContex);

  const onTextFieldChanged = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const onStatusChanged = (event: ChangeEvent<HTMLInputElement>) => {
    setStatus(event.target.value as EntryStatus);
  };
  const onSave = () => {
    if (inputValue.trim().length === 0) return;
    const updatedEntry: Entry = {
      ...entry,
      status,
      description: inputValue,
    };
    updateEntry(updatedEntry);
  };
  return (
    <Layout title={inputValue.substring(0, 20) + "..."}>
      <Grid
        container
        justifyContent="center"
        sx={{
          marginTop: 2,
        }}
      >
        <Grid item xs={12} sm={8} md={6}>
          <Card>
            <CardHeader
              title={`Entry:`}
              subheader={`Created ${entry.createdAt} ago`}
            />
            <CardContent>
              <TextField
                sx={{ marginTop: 2, marginBottom: 1 }}
                fullWidth
                placeholder="New Entry."
                autoFocus
                multiline
                label="New Entry"
                value={inputValue}
                onChange={onTextFieldChanged}
                onBlur={() => setTouched(true)}
                helperText={isNotValid && "Enter a value!"}
                error={isNotValid}
              />
              <FormControl>
                <FormLabel> Status: </FormLabel>
                <RadioGroup row value={status} onChange={onStatusChanged}>
                  {validStatus.map((status) => (
                    <FormControlLabel
                      key={status}
                      value={status}
                      control={<Radio />}
                      label={capitalize(status)}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            </CardContent>
            <CardActions>
              <Button
                startIcon={<SaveOutlinedIcon />}
                variant="contained"
                fullWidth
                disabled={inputValue.length === 0}
                onClick={onSave}
              >
                Save
              </Button>
            </CardActions>
          </Card>
        </Grid>
        <IconButton
          sx={{
            position: "fixed",
            bottom: 30,
            right: 30,
            backgroundColor: "error.dark",
          }}
        >
          <DeleteOutlinedIcon />
        </IconButton>
      </Grid>
    </Layout>
  );
};

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { id } = params as { id: string };
  const entry = await dbEntries.getEntryByID(id);
  if (!entry) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return {
    props: { entry },
  };
};

export default EntryPage;
