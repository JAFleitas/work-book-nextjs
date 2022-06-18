import { FC, useEffect, useReducer } from "react";
import { useSnackbar } from "notistack";
import { Entry } from "../../interfaces";
import { EntriesContex, entriesReducer } from "./";
import { entriesApi } from "../../api";

export interface EntriesState {
  entries: Entry[];
}

interface Props {
  children: JSX.Element | JSX.Element[];
}

const Entries_INITIAL_STATE: EntriesState = {
  entries: [],
};

export const EntriesProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(entriesReducer, Entries_INITIAL_STATE);
  const { enqueueSnackbar } = useSnackbar();
  const addNewEntry = async (description: string) => {
    const { data } = await entriesApi.post<Entry>("/entries", { description });
    dispatch({ type: "[Entry] add-entry", payload: data });
  };

  const updateEntry = async (entry: Entry, showSnackbar = false) => {
    try {
      const { description, status, _id } = entry;
      const { data } = await entriesApi.put(`/entries/${_id}`, {
        description,
        status,
      });
      dispatch({ type: "[Entry] update-entry", payload: data });
      if (showSnackbar) {
        enqueueSnackbar("Saved", {
          variant: "success",
          autoHideDuration: 1500,
          anchorOrigin: {
            vertical: "top",
            horizontal: "right",
          },
        });
      }
    } catch (error) {
      console.log({ error });
      enqueueSnackbar("Error", {
        variant: "error",
        autoHideDuration: 1500,
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      });
    }
  };
  const refreshEntries = async () => {
    const { data } = await entriesApi.get<Entry[]>("/entries");
    dispatch({ type: "[Entry] refresh-data", payload: data });
  };
  useEffect(() => {
    refreshEntries();
  }, []);

  return (
    <EntriesContex.Provider
      value={{
        ...state,
        // Methods
        addNewEntry,
        updateEntry,
      }}
    >
      {children}
    </EntriesContex.Provider>
  );
};
