import { createContext, useContext } from "react";
import useBooksReducer from "@/store/hooks/useBooks";

type BooksContextType = ReturnType<typeof useBooksReducer>;

const BooksContext = createContext<BooksContextType | undefined>(undefined);

export default function BooksProvider({ children }: {children: React.ReactNode}) {
    const booksReducer = useBooksReducer();

    return (
        <BooksContext.Provider value={booksReducer}>
            {children}
        </BooksContext.Provider>
    );
};

export const useBooks = () => {
    const context = useContext(BooksContext);
    if (!context) {
        throw new Error("useBooks должен использоваться внутри BooksProvider");
    }
    return context;
};