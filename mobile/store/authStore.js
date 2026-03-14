import { create } from "zustand";
import { API_URL } from "../constants/api";
export const useAuthStore = create((set) => ({
  user: null,
  token: null,
  isLoading: false,

  register: async ({ email, username, password }) => {
    set({ isLoading: true });

    try {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, username, password }),
      });

      const data = await response.json();

      console.log(data);
      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      return { success: true };
    } catch (error) {
      set({ isLoading: false });
      return { success: false, message: error.message };
    }
  },
}));
