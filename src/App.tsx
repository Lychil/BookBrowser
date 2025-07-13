import RoutesProvider from "@/router/RoutesProvider";
import BooksProvider from "@/store/context/BooksContext";
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <BooksProvider>
      <ToastContainer position="bottom-right" autoClose={3000} theme="colored" />
      <RoutesProvider />
    </BooksProvider>
  )
}

export default App;
