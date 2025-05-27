import { Dispatch } from "react";
import { Action } from "./globalTypes";
import {
  getCurrentUser,
  logoutUser,
} from "@utils/api/AuthApi"; 

// Load current user session
export const loadUser = async (dispatch: Dispatch<Action>) => {
  dispatch({ type: "SET_LOADING", payload: true });

  try {
    const user = await getCurrentUser();

    if (user && user.email) {
      dispatch({ type: "SET_USER", payload: user });
    } else {
      dispatch({ type: "LOGOUT_USER" });
    }
  } catch {
    dispatch({ type: "LOGOUT_USER" });
  }
};

// Log out current user
export const logout = async (dispatch: Dispatch<Action>) => {
  try {
    await logoutUser();
  } finally {
    dispatch({ type: "LOGOUT_USER" });
  }
};
