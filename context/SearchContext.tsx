"use client";

import React, { createContext, useContext, useState } from "react";

interface UIContextType {
  isSearchOpen: boolean;
  setIsSearchOpen: (isOpen: boolean) => void;
  toggleSearch: () => void;
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (isOpen: boolean) => void;
  toggleMobileMenu: () => void;
}

const UIContext = createContext<UIContextType | undefined>(undefined);

export const UIProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleSearch = () => setIsSearchOpen(prev => !prev);
  const toggleMobileMenu = () => setIsMobileMenuOpen(prev => !prev);

  return (
    <UIContext.Provider value={{ 
      isSearchOpen, 
      setIsSearchOpen, 
      toggleSearch,
      isMobileMenuOpen,
      setIsMobileMenuOpen,
      toggleMobileMenu
    }}>
      {children}
    </UIContext.Provider>
  );
};

export const useUI = () => {
  const context = useContext(UIContext);
  if (context === undefined) {
    throw new Error("useUI must be used within a UIProvider");
  }
  return context;
};

export const useSearch = useUI;
