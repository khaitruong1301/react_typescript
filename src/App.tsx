import { createBrowserHistory } from "history"
import { Provider } from "react-redux";
import { BrowserRouter, unstable_HistoryRouter as HistoryRouter, Route, Router, Routes } from "react-router-dom"
import { store } from "./redux/store";
import HomeTemplate from "./templates/HomeTemplate";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Detail from "./pages/Detail";
import Search from "./pages/Search";
import Cart from "./pages/Cart";

export const history: any = createBrowserHistory(); //Dùng để chuyển hướng trang ở những trang không phải component

function App() {


  return (
    <>
      <HistoryRouter history={history}>
        <Provider store={store}>
          <Routes>
            <Route path="" element={<HomeTemplate />}>
                <Route index element={<Home />}></Route>
                <Route path="login" element={<Login />}></Route>
                <Route path="register" element={<Register />}></Route>
                <Route path="detail/:id" element={<Detail />}></Route>
                <Route path="search" element={<Search />}></Route>
                <Route path="cart" element={<Cart />}></Route>
            </Route>
          </Routes>
        </Provider>

      </HistoryRouter>
    </>
  )
}

export default App
