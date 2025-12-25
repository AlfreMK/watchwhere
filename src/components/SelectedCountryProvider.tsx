import { useState, useCallback, type ReactNode } from "react";
import { SelectedCountryContext } from "@/hooks/useSelectedCountry";
import type { Country } from "@/components/select-country/countries";

const STORAGE_KEY = "selectedCountry";
const DEFAULT_COUNTRY: Country = "CL";

function getStoredCountry(): Country {
  const stored = localStorage.getItem(STORAGE_KEY);
  return (stored as Country) || DEFAULT_COUNTRY;
}

interface SelectedCountryProviderProps {
  children: ReactNode;
}

export const SelectedCountryProvider = ({
  children,
}: SelectedCountryProviderProps) => {
  const [selectedCountry, setSelectedCountryState] =
    useState<Country>(getStoredCountry);

  const setSelectedCountry = useCallback((country: Country) => {
    localStorage.setItem(STORAGE_KEY, country);
    setSelectedCountryState(country);
  }, []);

  return (
    <SelectedCountryContext.Provider
      value={{ selectedCountry, setSelectedCountry }}
    >
      {children}
    </SelectedCountryContext.Provider>
  );
};
