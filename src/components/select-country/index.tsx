import { COUNTRIES, type Country } from "./countries";
import Select from "@/components/Select";
import { findFlagUrlByIso2Code } from "country-flags-svg";
import { useSelectedCountry } from "@/hooks/useSelectedCountry";

const COUNTRIES_OPTIONS = COUNTRIES.map((country) => ({
  value: country,
  label: country,
}));

export default function SelectCountry() {
  const { selectedCountry, setSelectedCountry } = useSelectedCountry();
  return (
    <Select
      items={COUNTRIES_OPTIONS}
      selectedValue={selectedCountry}
      onChange={(item) => setSelectedCountry(item.value)}
      prependSelect={() => (
        <div className="w-8 flex justify-center items-center">
          <PrependItem country={selectedCountry} />
        </div>
      )}
      prependItem={(item) => (
        <div className="w-8 flex justify-center items-center">
        <PrependItem country={item.value} />
        </div>
      )}
    />
  );
}

const PrependItem = ({ country }: { country: Country }) => {
  const flagUrl = findFlagUrlByIso2Code(country);
  if (!flagUrl) return null;
  return (
    <img src={flagUrl} alt={country} className="h-4" />
  );
};
