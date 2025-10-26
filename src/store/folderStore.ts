/**
 * Folder Store - Manages folder organization
 */

import {create} from 'zustand';
import {immer} from 'zustand/middleware/immer';
import {Folder} from '@/types';
import {v4 as uuid} from 'uuid';

interface FolderState {
  folders: Folder[];
  selectedFolder: Folder | null;
}

interface FolderActions {
  addFolder: (folder: Omit<Folder, 'id' | 'createdAt' | 'itemCount'>) => void;
  updateFolder: (id: string, updates: Partial<Folder>) => void;
  deleteFolder: (id: string) => void;
  selectFolder: (folder: Folder | null) => void;
  incrementItemCount: (id: string) => void;
  decrementItemCount: (id: string) => void;
}

type FolderStore = FolderState & FolderActions;

export const useFolderStore = create<FolderStore>()(
  immer((set, get) => ({
    // State
    folders: [],
    selectedFolder: null,

    // Actions
    addFolder: folder => {
      const newFolder: Folder = {
        ...folder,
        id: uuid(),
        createdAt: Date.now(),
        itemCount: 0,
      };
      set(state => {
        state.folders.push(newFolder);
      });
    },

    updateFolder: (id, updates) => {
      set(state => {
        const index = state.folders.findIndex(f => f.id === id);
        if (index !== -1) {
          state.folders[index] = {...state.folders[index], ...updates};
        }
      });
    },

    deleteFolder: id => {
      set(state => {
        state.folders = state.folders.filter(f => f.id !== id);
        if (state.selectedFolder?.id === id) {
          state.selectedFolder = null;
        }
      });
    },

    selectFolder: folder => {
      set(state => {
        state.selectedFolder = folder;
      });
    },

    incrementItemCount: id => {
      set(state => {
        const folder = state.folders.find(f => f.id === id);
        if (folder) {
          folder.itemCount += 1;
        }
      });
    },

    decrementItemCount: id => {
      set(state => {
        const folder = state.folders.find(f => f.id === id);
        if (folder && folder.itemCount > 0) {
          folder.itemCount -= 1;
        }
      });
    },
  })),
);
