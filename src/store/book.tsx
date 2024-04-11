import { removeBook } from "@/app/actions/bookActions";
import { toast } from "sonner";
import { create } from "zustand";

export interface IUseBook {
  removeBook: (bookId: string, redirect?: boolean) => Promise<void>;
}

export const useBook = create<IUseBook>((set) => ({
  removeBook: async (bookId, redirect = false) => {
    const promise = removeBook(bookId);

    toast.promise(promise, {
      loading: "Removing...",
      success: () => {
        if (redirect) {
          window.location.href = "/books";
        }
        return <div>Book successfully removed!</div>;
      },
      error: "Something went wrong",
    });
  },
}));
