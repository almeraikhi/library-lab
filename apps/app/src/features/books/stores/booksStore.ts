import { create } from 'zustand';

interface BookStoreState {
  authorId: string | undefined;
  genresIds: string[] | undefined;
  setAuthorId: (authorId: string | undefined) => void;
  setGenresIds: (genresIds: string[]) => void;
  page: number;
  setPage: (page: number) => void;
}

export const useBookStore = create<BookStoreState>((set, get) => ({
  authorId: undefined,
  genresIds: undefined,
  setAuthorId: (authorId) => set({ authorId }),
  setGenresIds: (genresIds) => set({ genresIds }),
  page: 1,
  setPage: (page) => set({ page }),
}));
