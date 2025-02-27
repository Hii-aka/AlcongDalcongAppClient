import { RegionInfo } from "@/hooks/useSearchLocation";
import { create } from "zustand";

interface SearchLocationState {
    location: RegionInfo | null;
    setLocation: (location: RegionInfo) => void;
};

const useSearchLocationStore = create<SearchLocationState>((set) => ({
    location: null,
    setLocation: (location: RegionInfo) => set({ location }),
}));

export default useSearchLocationStore;
