import { FC, useReducer } from "react";
import { UIContext, uiReducer } from "./";

export interface UIState {
  sideMenuOpen: boolean;
  isAddingEntry: boolean;
  isDragging: boolean;
}

interface Props {
  children: JSX.Element | JSX.Element[];
}

const UI_INITIAL_STATE: UIState = {
  sideMenuOpen: false,
  isAddingEntry: false,
  isDragging: false,
};

export const UIProvider: FC<Props> = ({ children }) => {
  const openSideMenu = () => {
    dispatch({ type: "[UI] - Open Sidebar" });
  };
  const closeSideMenu = () => {
    dispatch({ type: "[UI] - Close Sidebar" });
  };

  const setIsAddingEntry = (isAdding: boolean) => {
    dispatch({ type: "[UI] - Set isAddingEntry", payload: isAdding });
  };

  const startDragging = () => {
    dispatch({ type: "[UI] - Start dragging" });
  };

  const endDragging = () => {
    dispatch({ type: "[UI] - End dragging" });
  };

  const [state, dispatch] = useReducer(uiReducer, UI_INITIAL_STATE);

  return (
    <UIContext.Provider
      value={{
        ...state,
        openSideMenu,
        closeSideMenu,
        setIsAddingEntry,
        startDragging,
        endDragging,
      }}
    >
      {children}
    </UIContext.Provider>
  );
};
