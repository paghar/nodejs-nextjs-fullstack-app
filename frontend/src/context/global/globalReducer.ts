import { GlobalState, Action } from "./globalTypes";

export const initialState: GlobalState = {
  user: null,
  loading: false,
};

export function globalReducer(state: GlobalState, action: Action): GlobalState {
  switch (action.type) {
  case "SET_USER":
    return { ...state, user: action.payload, loading: false };
  case "LOGOUT_USER":
    return { ...state, user: null, loading: false };
  case "SET_LOADING":
    return { ...state, loading: action.payload };
  default:
    return state;
  }
}