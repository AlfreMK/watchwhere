import { useState, useRef, useEffect, useMemo, useCallback } from "react";
import styled, { keyframes } from "styled-components";
import { ChevronDown, Search, Check } from "lucide-react";

export default function Select<TItem extends { value: string; label: string }>({
  items,
  selectedValue,
  onChange,
  placeholder = "Select an option",
  searchPlaceholder = "Search...",
  showSearch = true,
  prependItem,
  prependSelect,
}: {
  items: TItem[];
  selectedValue?: TItem["value"];
  onChange: (item: TItem) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  showSearch?: boolean;
  prependItem?: (item: TItem) => React.ReactNode;
  prependSelect?: () => React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const itemsByValue = useMemo(() => {
    return items.reduce((acc, item) => {
      acc[item.value] = item;
      return acc;
    }, {} as { [itemValue: string]: TItem });
  }, [items]);

  const selectedItem = useMemo(() => {
    return selectedValue ? itemsByValue[selectedValue] : undefined;
  }, [itemsByValue, selectedValue]);

  const filteredItems = useMemo(() => {
    if (!searchQuery.trim()) return items;
    const query = searchQuery.toLowerCase();
    return items.filter((item) => item.label.toLowerCase().includes(query));
  }, [items, searchQuery]);

  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setSearchQuery("");
      }
    },
    [containerRef],
  );
  // Close dropdown when clicking outside
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [handleClickOutside]);

  // Focus search input when dropdown opens
  useEffect(() => {
    if (isOpen && showSearch && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen, showSearch]);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (!isOpen) return;

      if (event.key === "Escape") {
        setIsOpen(false);
        setSearchQuery("");
      }
    },
    [isOpen],
  );

  // Handle keyboard navigation
  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  const handleSelect = (item: TItem) => {
    onChange(item);
    setIsOpen(false);
    setSearchQuery("");
  };

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
    if (isOpen) {
      setSearchQuery("");
    }
  };

  return (
    <Container ref={containerRef}>
      <TriggerButton
        type="button"
        onClick={toggleDropdown}
        $isOpen={isOpen}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <ButtonContent>
          {prependSelect?.() || null}
          <span>{selectedItem?.label || placeholder}</span>
          <ChevronIcon $isOpen={isOpen}>
            <ChevronDown size={14} />
          </ChevronIcon>
        </ButtonContent>
      </TriggerButton>

      {isOpen && (
        <Dropdown>
          {showSearch && (
            <SearchContainer>
              <SearchIcon>
                <Search size={14} />
              </SearchIcon>
              <SearchInput
                ref={searchInputRef}
                type="text"
                placeholder={searchPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </SearchContainer>
          )}

          <OptionsList role="listbox">
            {filteredItems.length === 0 ? (
              <NoResults>No results found</NoResults>
            ) : (
              filteredItems.map((item) => (
                <OptionItem
                  key={item.value}
                  role="option"
                  aria-selected={item.value === selectedItem?.value}
                  $isSelected={item.value === selectedItem?.value}
                  onClick={() => handleSelect(item)}
                >
                  <div className="flex flex-row items-center gap-2">
                    {prependItem?.(item) || null}
                    <span>{item.label}</span>
                  </div>
                  {item.value === selectedItem?.value && (
                    <CheckIcon>
                      <Check size={14} />
                    </CheckIcon>
                  )}
                </OptionItem>
              ))
            )}
          </OptionsList>
        </Dropdown>
      )}
    </Container>
  );
}

const slideDown = keyframes`
  from {
    opacity: 0;
    transform: translateY(-8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Container = styled.div`
  position: relative;
  display: inline-block;
`;

const TriggerButton = styled.button<{ $isOpen: boolean }>`
  background-color: #3730a3;
  font-size: 1.2em;
  height: 40px;
  padding: 0 14px;
  cursor: pointer;
  border-radius: 5px;
  border: 2px solid ${(props) => (props.$isOpen ? "#6366f1" : "#3730a3")};
  color: inherit;
  transition: all 0.15s ease;

  &:hover {
    background-color: #4338ca;
  }

  &:focus {
    outline: none;
    border-color: #6366f1;
  }

  @media (max-width: 768px) {
    font-size: 1em;
  }
`;

const ButtonContent = styled.span`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const ChevronIcon = styled.span<{ $isOpen: boolean }>`
  display: flex;
  align-items: center;
  transition: transform 0.2s ease;
  transform: rotate(${(props) => (props.$isOpen ? "180deg" : "0deg")});
`;

const Dropdown = styled.div`
  position: absolute;
  top: calc(100% + 6px);
  right: 0;
  min-width: 100%;
  width: max-content;
  background-color: #1e1b4b;
  border: 1px solid #3730a3;
  border-radius: 8px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
  z-index: 1000;
  overflow: hidden;
  animation: ${slideDown} 0.15s ease-out;
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 12px;
  border-bottom: 1px solid #312e81;
  gap: 8px;
`;

const SearchIcon = styled.span`
  display: flex;
  align-items: center;
  color: #a5b4fc;
  flex-shrink: 0;
`;

const SearchInput = styled.input`
  flex: 1;
  background: transparent;
  border: none;
  color: inherit;
  font-size: 0.95em;
  outline: none;

  &::placeholder {
    color: #6366f1;
  }
`;

const OptionsList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 6px 0;
  max-height: 240px;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: #3730a3;
    border-radius: 3px;
  }
`;

const OptionItem = styled.li<{ $isSelected: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 14px;
  cursor: pointer;
  background-color: ${(props) =>
    props.$isSelected ? "#312e81" : "transparent"};
  transition: background-color 0.1s ease;

  &:hover {
    background-color: ${(props) => (props.$isSelected ? "#312e81" : "#2e2a5e")};
  }
`;

const CheckIcon = styled.span`
  display: flex;
  align-items: center;
  color: #a5b4fc;
`;

const NoResults = styled.div`
  padding: 16px 14px;
  color: #6366f1;
  text-align: center;
  font-size: 0.9em;
`;
