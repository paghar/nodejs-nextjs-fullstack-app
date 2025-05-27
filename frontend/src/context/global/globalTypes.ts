export interface User {
  id: string;
  name: string;
  email: string;
}

export interface GlobalState {
  user: User | null;
  loading: boolean;
}

export type Action =
  | { type: "SET_USER"; payload: User }
  | { type: "LOGOUT_USER" }
  | { type: "SET_LOADING"; payload: boolean };