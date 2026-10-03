"use client";

import { create } from "zustand";

type UiState = {
  /** id of the portfolio item shown in the lightbox, or null when closed */
  lightboxItemId: string | null;
  mobileMenuOpen: boolean;
  openLightbox: (itemId: string) => void;
  closeLightbox: () => void;
  setMobileMenuOpen: (open: boolean) => void;
};

export const useUiStore = create<UiState>()((set) => ({
  lightboxItemId: null,
  mobileMenuOpen: false,
  openLightbox: (itemId) => set({ lightboxItemId: itemId }),
  closeLightbox: () => set({ lightboxItemId: null }),
  setMobileMenuOpen: (open) => set({ mobileMenuOpen: open }),
}));
