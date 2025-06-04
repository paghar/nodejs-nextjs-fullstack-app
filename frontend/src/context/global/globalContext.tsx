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
import { GlobalState, Action } from "./globalTypes";

// ─── Contexts ──────────────────────────────────────────────────────────────
const StateContext = createContext<GlobalState | undefined>(undefined);
const DispatchContext = createContext<Dispatch<Action> | undefined>(undefined);

// ─── Provider ──────────────────────────────────────────────────────────────
export const GlobalProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(globalReducer, initialState);

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
};

// ─── Custom Hooks ──────────────────────────────────────────────────────────
export const useGlobalState = (): GlobalState => {
  const context = useContext(StateContext);
  if (!context) {
    throw new Error("useGlobalState must be used inside GlobalProvider");
  }
  return context;
};

export const useGlobalDispatch = (): Dispatch<Action> => {
  const context = useContext(DispatchContext);
  if (!context) {
    throw new Error("useGlobalDispatch must be used inside GlobalProvider");
  }
  return context;
};
