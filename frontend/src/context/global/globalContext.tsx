// ─── External Dependencies ─────────────────────────────────────────────────
import React, {
  createContext,
  useReducer,
  useContext,
  Dispatch,
  ReactNode,
} from "react";

// ─── Internal Dependencies ────────────────────────────────────────────────
import { globalReducer, initialState } from "./globalReducer";
import { GlobalState, GlobalAction } from "./globalTypes";

// ─── Context Creation ─────────────────────────────────────────────────────
const GlobalStateContext = createContext<GlobalState | undefined>(undefined);
const GlobalDispatchContext = createContext<Dispatch<GlobalAction> | undefined>(undefined);

// ─── Provider Component ───────────────────────────────────────────────────
export const GlobalProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(globalReducer, initialState);

  return (
    <GlobalStateContext.Provider value={state}>
      <GlobalDispatchContext.Provider value={dispatch}>
        {children}
      </GlobalDispatchContext.Provider>
    </GlobalStateContext.Provider>
  );
};

// ─── Custom Hooks ─────────────────────────────────────────────────────────
export const useGlobalState = (): GlobalState => {
  const context = useContext(GlobalStateContext);
  if (!context) {
    throw new Error("useGlobalState must be used within a GlobalProvider");
  }
  return context;
};

export const useGlobalDispatch = (): Dispatch<GlobalAction> => {
  const context = useContext(GlobalDispatchContext);
  if (!context) {
    throw new Error("useGlobalDispatch must be used within a GlobalProvider");
  }
  return context;
};
