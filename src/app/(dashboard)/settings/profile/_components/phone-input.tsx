"use client";

import { useState, useEffect, useRef } from "react";
import { Input } from "@/app/components/ui/input";
import { Button } from "@/app/components/ui/button";
import { ChevronDown, Phone } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../../../components/ui/dropdown-menu";

// Country data with flags and codes
const countries = [
  { code: "PH", name: "Philippines", flag: "🇵🇭", dialCode: "+63" },
  { code: "US", name: "United States", flag: "🇺🇸", dialCode: "+1" },
  { code: "CA", name: "Canada", flag: "🇨🇦", dialCode: "+1" },
  { code: "GB", name: "United Kingdom", flag: "🇬🇧", dialCode: "+44" },
  { code: "AU", name: "Australia", flag: "🇦🇺", dialCode: "+61" },
  { code: "DE", name: "Germany", flag: "🇩🇪", dialCode: "+49" },
  { code: "FR", name: "France", flag: "🇫🇷", dialCode: "+33" },
  { code: "JP", name: "Japan", flag: "🇯🇵", dialCode: "+81" },
  { code: "KR", name: "South Korea", flag: "🇰🇷", dialCode: "+82" },
  { code: "SG", name: "Singapore", flag: "🇸🇬", dialCode: "+65" },
  { code: "MY", name: "Malaysia", flag: "🇲🇾", dialCode: "+60" },
  { code: "TH", name: "Thailand", flag: "🇹🇭", dialCode: "+66" },
  { code: "VN", name: "Vietnam", flag: "🇻🇳", dialCode: "+84" },
  { code: "ID", name: "Indonesia", flag: "🇮🇩", dialCode: "+62" },
  { code: "IN", name: "India", flag: "🇮🇳", dialCode: "+91" },
  { code: "CN", name: "China", flag: "🇨🇳", dialCode: "+86" },
];

interface PhoneInputProps {
  value: string;
  onChange: (value: string) => void;
  onCountryChange?: (countryCode: string) => void;
  placeholder?: string;
  className?: string;
  error?: boolean;
  defaultCountry?: string;
}

export default function PhoneInput({
  value,
  onChange,
  onCountryChange,
  placeholder = "(555) 123-4567",
  className = "",
  error = false,
  defaultCountry = "PH",
}: PhoneInputProps) {
  const [selectedCountry, setSelectedCountry] = useState(() => {
    const country =
      countries.find((c) => c.code === defaultCountry) || countries[0];
    return country;
  });

  const hasProcessedInitialValue = useRef(false);

  // Handle initial value and strip country codes
  useEffect(() => {
    if (value && value.includes("+")) {
      // Try to detect country from the phone number
      const detectedCountry = countries.find((country) => {
        const dialCode = country.dialCode.replace("+", "");
        return value.startsWith(`+${dialCode}`);
      });

      if (detectedCountry) {
        setSelectedCountry(detectedCountry);
        const strippedNumber = stripCountryCode(value, detectedCountry.code);
        const formatted = formatPhoneNumber(
          strippedNumber,
          detectedCountry.code
        );
        // Always update with the stripped and formatted value
        onChange(formatted);
      }
    }
  }, [value, onChange]); // Only depend on value changes

  // Function to strip country code from phone number
  const stripCountryCode = (phoneNumber: string, countryCode: string) => {
    const country = countries.find((c) => c.code === countryCode);
    if (!country) return phoneNumber;

    const dialCode = country.dialCode.replace("+", "");
    if (phoneNumber.startsWith(`+${dialCode}`)) {
      return phoneNumber.substring(dialCode.length + 1); // +1 for the '+' sign
    }
    return phoneNumber;
  };

  const formatPhoneNumber = (input: string, countryCode: string) => {
    // Remove all non-digits
    const cleaned = input.replace(/\D/g, "");

    // Format based on country
    if (countryCode === "US" || countryCode === "CA") {
      if (cleaned.length === 10) {
        return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(
          6
        )}`;
      }
    } else if (countryCode === "PH") {
      if (cleaned.length === 10) {
        return `${cleaned.slice(0, 3)} ${cleaned.slice(3, 6)} ${cleaned.slice(
          6
        )}`;
      }
    } else {
      // For other countries, just group by 3-4 digits
      if (cleaned.length >= 6) {
        return `${cleaned.slice(0, 3)} ${cleaned.slice(3, 6)} ${cleaned.slice(
          6
        )}`;
      }
    }

    return cleaned;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    // Only format if the input has enough digits
    if (inputValue.replace(/\D/g, "").length >= 6) {
      const formatted = formatPhoneNumber(inputValue, selectedCountry.code);
      onChange(formatted);
    } else {
      // For partial input, just pass the raw value
      onChange(inputValue);
    }
  };

  const handleCountryChange = (country: (typeof countries)[0]) => {
    setSelectedCountry(country);
    // Re-format the current phone number with new country format
    const currentDigits = value.replace(/\D/g, "");
    const formatted = formatPhoneNumber(currentDigits, country.code);
    onChange(formatted);
    // Notify parent component about country change
    onCountryChange?.(country.code);
  };

  const getFullPhoneNumber = () => {
    const digits = value.replace(/\D/g, "");
    return `${selectedCountry.dialCode}${digits}`;
  };

  return (
    <div className="flex">
      {/* Country Selector */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className={`flex items-center gap-2 px-3 border-r-0 rounded-r-none ${
              error ? "border-red-300" : ""
            }`}
          >
            <span className="text-lg">{selectedCountry.flag}</span>
            <span className="text-sm font-medium">
              {selectedCountry.dialCode}
            </span>
            <ChevronDown className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-64 max-h-60 overflow-y-auto">
          {countries.map((country) => (
            <DropdownMenuItem
              key={country.code}
              onClick={() => handleCountryChange(country)}
              className="flex items-center gap-3 cursor-pointer"
            >
              <span className="text-lg">{country.flag}</span>
              <div className="flex flex-col">
                <span className="font-medium">{country.name}</span>
                <span className="text-sm text-muted-foreground">
                  {country.dialCode}
                </span>
              </div>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Phone Input */}
      <div className="flex-1 relative">
        <Input
          value={value}
          onChange={handlePhoneChange}
          placeholder={placeholder}
          className={`rounded-l-none border-l-0 ${className} ${
            error ? "border-red-300 focus:border-red-500" : ""
          }`}
        />
      </div>
    </div>
  );
}

// Export the getFullPhoneNumber function for external use
export const getFullPhoneNumber = (
  phoneNumber: string,
  countryCode: string
) => {
  const country = countries.find((c) => c.code === countryCode);
  if (!country) return phoneNumber;

  const digits = phoneNumber.replace(/\D/g, "");
  return `${country.dialCode}${digits}`;
};
