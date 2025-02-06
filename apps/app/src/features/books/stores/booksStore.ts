import { create } from 'zustand';

interface BookStoreState {
  authorId: string | undefined;
  genresIds: string[] | undefined;
  setAuthorId: (authorId: string | undefined) => void;
  setGenresIds: (genresIds: string[]) => void;
}

export const useBookStore = create<BookStoreState>((set, get) => ({
  authorId: undefined,
  genresIds: undefined,
  setAuthorId: (authorId: string) => set({ authorId }),
  setGenresIds: (genresIds: string[]) => set({ genresIds }),
}));
