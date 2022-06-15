import { Entry } from "../../interfaces";
import { EntriesState } from "./";

type EntriesActionType =
  | {
      type: "[Entry] add-entry";
      payload: Entry;
    }
  | {
      type: "[Entry] update-entry";
      payload: Entry;
    };

export const entriesReducer = (
  state: EntriesState,
  action: EntriesActionType
): EntriesState => {
  switch (action.type) {
    case "[Entry] add-entry":
      return {
        ...state,
        entries: [...state.entries, action.payload],
      };
    case "[Entry] update-entry":
      return {
        ...state,
        entries: state.entries.map((entry) => {
          if (entry._id === action.payload._id) {
            return action.payload;
          }
          return entry;
        }),
      };

    default:
      return state;
  }
};
