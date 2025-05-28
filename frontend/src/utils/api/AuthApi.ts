import { API_BASE_URL } from "@data/constants/public";
import axios from "axios";

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Get CSRF token from backend
export const getCsrfToken = async (): Promise<string | null> => {
  try {
    const res = await axios.get(`${API_BASE_URL}api/auth/csrf-token`, {
      withCredentials: true,
    });
    return res?.data?.csrfToken || null;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Failed to fetch CSRF token:", error);
    return null;
  }
};

// Register new user
export const registerUser = async (
  formData: { name: string; email: string; password: string },
  csrfToken: string
): Promise<{ success: boolean; message: string; user?: any }> => {
  try {
    const res = await api.post("api/auth/register", formData, {
      headers: {
        "X-CSRF-Token": csrfToken,
      },
    });
    return { 
      success: true, 
      message: `Registered: ${res.data.email}` ,
      user: res.data.user
    };
  } catch (err: any) {
    const errorMsg = err?.response?.data?.message || "Registration failed";
    return { success: false, message: errorMsg };
  }
};

// Log in user
export const loginUser = async (
  formData: { email: string; password: string },
  csrfToken: string
): Promise<{ success: boolean; message: string; user?: any }> => {
  try {
    const res = await api.post("api/auth/login", formData, {
      headers: {
        "X-CSRF-Token": csrfToken,
      },
    });
    return { 
      success: true, 
      message: `Logged in as ${res.data.email}`,
      user: res.data.user, 
    };
  } catch (err: any) {
    const errorMsg = err?.response?.data?.message || "Login failed";
    return { success: false, message: errorMsg };
  }
};

// Log out user
export const logoutUser = async (): Promise<{ success: boolean; message: string }> => {
  try {
    await api.post("api/auth/logout");
    return { success: true, message: "Logged out successfully" };
  } catch (err: any) {
    const errorMsg = err?.response?.data?.message || "Logout failed";
    return { success: false, message: errorMsg };
  }
};

// Get current user session info (if logged in)
export const getCurrentUser = async (): Promise<any | null> => {
  try {
    const res = await api.get("api/auth/me");
    return res.data;
  } catch (err) {
    return err || null;
  }
};
