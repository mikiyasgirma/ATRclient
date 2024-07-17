import { create } from "zustand";

export interface AppState {
  showToast: boolean;
  toggleToast: (message: string, type: "SUCCESS" | "FAIL") => void;
  toastMessage: string;
  toastType: "SUCCESS" | "FAIL";
}

export const useStore = create<AppState>()((set) => ({
  showToast: false,
  toastMessage: "Test message",
  toastType: "SUCCESS",
  toggleToast: (message, type) =>
    set((state) => ({
      showToast: !state.showToast,
      toastMessage: message,
      toastType: type,
    })),
}));
