import { create } from 'zustand';

export const useStore = create((set) => ({
  hoveredNode: null,
  setHoveredNode: (nodeId) => set({ hoveredNode: nodeId }),

  activeNode: null, // The node currently being viewed in detail
  setActiveNode: (node) => set({ activeNode: node }),

  isDrifting: false,
  toggleDrift: () => set((state) => ({ isDrifting: !state.isDrifting })),
}));