/**
 * Code Store - Manages QR/Barcode state
 */

import {create} from 'zustand';
import {immer} from 'zustand/middleware/immer';
import {QRCode, CodeType} from '@/types';
import {v4 as uuid} from 'uuid';

interface CodeState {
  codes: QRCode[];
  selectedCode: QRCode | null;
  searchQuery: string;
  filterType: CodeType | 'all';
  sortBy: 'date' | 'name' | 'usage';
}

interface CodeActions {
  addCode: (code: Omit<QRCode, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateCode: (id: string, updates: Partial<QRCode>) => void;
  deleteCode: (id: string) => void;
  selectCode: (code: QRCode | null) => void;
  toggleFavorite: (id: string) => void;
  incrementUsage: (id: string) => void;
  setSearchQuery: (query: string) => void;
  setFilterType: (type: CodeType | 'all') => void;
  setSortBy: (sort: 'date' | 'name' | 'usage') => void;
  getFilteredCodes: () => QRCode[];
}

type CodeStore = CodeState & CodeActions;

export const useCodeStore = create<CodeStore>()(
  immer((set, get) => ({
    // State
    codes: [],
    selectedCode: null,
    searchQuery: '',
    filterType: 'all',
    sortBy: 'date',

    // Actions
    addCode: code => {
      const now = Date.now();
      const newCode: QRCode = {
        ...code,
        id: uuid(),
        createdAt: now,
        updatedAt: now,
        usageCount: 0,
        isFavorite: false,
      };
      set(state => {
        state.codes.push(newCode);
      });
    },

    updateCode: (id, updates) => {
      set(state => {
        const index = state.codes.findIndex(c => c.id === id);
        if (index !== -1) {
          state.codes[index] = {
            ...state.codes[index],
            ...updates,
            updatedAt: Date.now(),
          };
        }
      });
    },

    deleteCode: id => {
      set(state => {
        state.codes = state.codes.filter(c => c.id !== id);
        if (state.selectedCode?.id === id) {
          state.selectedCode = null;
        }
      });
    },

    selectCode: code => {
      set(state => {
        state.selectedCode = code;
      });
    },

    toggleFavorite: id => {
      set(state => {
        const code = state.codes.find(c => c.id === id);
        if (code) {
          code.isFavorite = !code.isFavorite;
        }
      });
    },

    incrementUsage: id => {
      set(state => {
        const code = state.codes.find(c => c.id === id);
        if (code) {
          code.usageCount += 1;
          code.updatedAt = Date.now();
        }
      });
    },

    setSearchQuery: query => {
      set(state => {
        state.searchQuery = query;
      });
    },

    setFilterType: type => {
      set(state => {
        state.filterType = type;
      });
    },

    setSortBy: sort => {
      set(state => {
        state.sortBy = sort;
      });
    },

    getFilteredCodes: () => {
      const {codes, searchQuery, filterType, sortBy} = get();

      let filtered = [...codes];

      // Filter by type
      if (filterType !== 'all') {
        filtered = filtered.filter(c => c.type === filterType);
      }

      // Filter by search
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        filtered = filtered.filter(
          c =>
            c.title?.toLowerCase().includes(query) ||
            c.data.toLowerCase().includes(query) ||
            c.tags?.some(t => t.toLowerCase().includes(query)),
        );
      }

      // Sort
      filtered.sort((a, b) => {
        switch (sortBy) {
          case 'date':
            return b.updatedAt - a.updatedAt;
          case 'name':
            return (a.title || a.data).localeCompare(b.title || b.data);
          case 'usage':
            return b.usageCount - a.usageCount;
          default:
            return 0;
        }
      });

      return filtered;
    },
  })),
);
