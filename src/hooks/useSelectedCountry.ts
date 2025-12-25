import { createContext, useContext } from "react";
import type { Country } from "@/components/select-country/countries";

interface SelectedCountryContextType {
  selectedCountry: Country;
  setSelectedCountry: (country: Country) => void;
}

export const SelectedCountryContext =
  createContext<SelectedCountryContextType | null>(null);

export function useSelectedCountry() {
  const context = useContext(SelectedCountryContext);
  if (!context) {
    throw new Error(
      "useSelectedCountry must be used within a SelectedCountryProvider",
    );
  }
  return context;
}
