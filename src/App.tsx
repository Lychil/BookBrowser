import RoutesProvider from "@/router/RoutesProvider";
import BooksProvider from "@/store/context/BooksContext";

function App() {
  return (
    <BooksProvider>
      <RoutesProvider />
    </BooksProvider>
  )
}

export default App;
