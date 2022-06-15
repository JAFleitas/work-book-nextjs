import { FC, useReducer } from "react";
import { v4 as uuidv4 } from "uuid";

import { Entry } from "../../interfaces";
import { EntriesContex, entriesReducer } from "./";

export interface EntriesState {
  entries: Entry[];
}

interface Props {
  children: JSX.Element | JSX.Element[];
}

const Entries_INITIAL_STATE: EntriesState = {
  entries: [
    {
      _id: uuidv4(),
      createdAt: Date.now(),
      description: "loremasdas daskldjkasdjk",
      status: "pending",
    },
    {
      _id: uuidv4(),
      createdAt: Date.now() - 100000,
      description: "loremasd da das as daskldjkasdjk",
      status: "finished",
    },
    {
      _id: uuidv4(),
      createdAt: Date.now() - 1000000,
      description: "loremasdasd asdw3ee3 3e3 daskldjkasdjk",
      status: "in-progress",
    },
  ],
};

export const EntriesProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(entriesReducer, Entries_INITIAL_STATE);

  const addNewEntry = (description: string) => {
    const newEntry: Entry = {
      _id: uuidv4(),
      description,
      createdAt: Date.now(),
      status: "pending",
    };
    dispatch({ type: "[Entry] add-entry", payload: newEntry });
  };

  const updateEntry = (entry: Entry) => {
    dispatch({ type: "[Entry] update-entry", payload: entry });
  };

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
