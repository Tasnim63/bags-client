import { Route, Routes } from "react-router-dom";
import "./App.css";
import AddInventory from "./Pages/AddInventory/AddInventory";
import Home from "./Pages/Home/Home/Home";
import Login from "./Pages/Login/Login/Login";
import Register from "./Pages/Login/Register/Register";
import RequireAuth from "./Pages/Login/RequireAuth/RequireAuth";
import ManageInventories from "./Pages/ManageInventories/ManageInventories";
import ProductInventory from "./Pages/ProductInventory/ProductInventory";
import Footer from "./Pages/Shared/Footer/Footer";
import Navbar from "./Pages/Shared/Navbar/Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MyItem from "./Pages/MyItem/MyItem";
import NotFound from "./Pages/Shared/NotFound/NotFound";
import DetailedReview from "./Pages/DetailedReview/DetailedReview";
import Blogs from "./Pages/Blogs/Blogs";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route
          path="/inventory/:id"
          element={
            <RequireAuth>
              <ProductInventory />
            </RequireAuth>
          }
        />
        <Route
          path="/manageInventories"
          element={
            <RequireAuth>
              <ManageInventories />
            </RequireAuth>
          }
        />
        <Route
          path="/addinventory"
          element={
            <RequireAuth>
              <AddInventory />
            </RequireAuth>
          }
        />
        <Route path="/register" element={<Register />} />
        <Route
          path="/myitem"
          element={
            <RequireAuth>
              <MyItem />
            </RequireAuth>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/review/:id" element={<DetailedReview />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
      <ToastContainer />
    </div>
  );
}

export default App;
