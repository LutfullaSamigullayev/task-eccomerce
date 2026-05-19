import { create } from 'zustand';

interface FlyItem {
  src: string;  // mahsulot rasmi URL
  x: number;   // boshlang'ich X pozitsiya
  y: number;   // boshlang'ich Y pozitsiya
  size: number; // boshlang'ich o'lcham
}

interface AnimStore {
  flyItem: FlyItem | null;
  shouldShake: boolean;
  triggerFly: (item: FlyItem) => void;
  endFly: () => void;
  triggerShake: () => void;
  endShake: () => void;
}

export const useAnimStore = create<AnimStore>((set) => ({
  flyItem: null,
  shouldShake: false,
  triggerFly: (flyItem) => set({ flyItem }),
  endFly: () => set({ flyItem: null }),
  triggerShake: () => set({ shouldShake: true }),
  endShake: () => set({ shouldShake: false }),
}));
