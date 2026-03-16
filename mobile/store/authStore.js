import { create } from "zustand";
import { API_URL } from "../constants/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
export const useAuthStore = create((set) => ({
  user: null,
  token: null,
  isLoading: false,
  isCheckingAuth: true,

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

      await AsyncStorage.setItem("user", JSON.stringify(data.user));
      await AsyncStorage.setItem("token", JSON.stringify(data.token));

      set({ user: data.user, token: data.token });

      return { success: true };
    } catch (error) {
      return { success: false, message: error.message };
    } finally {
      set({ isLoading: false });
    }
  },
  login: async ({ email, password }) => {
    set({ isLoading: true });
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      console.log("DAta from login", data);

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }
      await AsyncStorage.setItem("user", JSON.stringify(data.user));
      await AsyncStorage.setItem("token", JSON.stringify(data.token));

      set({ user: data.user, token: data.token });

      return { success: true };
    } catch (error) {
      return { success: false, message: error.message };
    } finally {
      set({ isLoading: false });
    }
  },
  checkAuth: async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const userJson = await AsyncStorage.getItem("user");

      const user = userJson ? JSON.parse(userJson) : null;
      set({ user, token });
    } catch (error) {
      console.log("Auth check failed", error);
    } finally {
      set({ isCheckingAuth: false });
    }
  },
  logout: async () => {
    await AsyncStorage.removeItem("token");
    await AsyncStorage.removeItem("user");
    set({ user: null, token: null });
  },
}));
