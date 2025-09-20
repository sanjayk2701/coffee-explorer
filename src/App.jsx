import Navbar from "./navbar/Navbar";
import CoffeeGallery from "./pages/coffeeGallery";
import "./styles/global.scss";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="App">
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
          closeButton={false}       // <-- disables the close icon

        toastStyle={{
          fontSize: "14px",
          width: "350px",
          marginRight:"45px"
        }}
      />
      <Navbar />
      <CoffeeGallery />
    </div>
  );
}

export default App;
