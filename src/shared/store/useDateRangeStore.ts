import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { DateRange } from "react-day-picker";

type DateRangeStoreState = {
  storedRanges: Record<string, DateRange>;
  setStoredRange: (storedRanges: DateRangeStoreState["storedRanges"]) => void;
};

const useDateRangeStore = create<DateRangeStoreState>()(
  persist(
    (set) => ({
      setStoredRange: (storedRanges) => {
        set({ storedRanges });
      },
      storedRanges: {},
    }),
    {
      name: "dateRangesStore",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export default useDateRangeStore;
