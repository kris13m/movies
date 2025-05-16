import { Route, Routes } from "react-router-dom";
import HomePage from "./HomePage";
import MoviesPage from "./MoviesPage";
import LoginPage from "./LoginPage/LoginPage";
import MoviePage from "./MoviePage/MoviePage";
import RegisterPage from "./RegisterPage";
import ListsPage from "./ListsPage/ListsPage"
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { setNavigator } from "../services/navigation";

function Router(){
    const navigate = useNavigate();

  useEffect(() => {
    setNavigator(navigate);
  }, [navigate]);

    return(
        <Routes>
            <Route path = "/movies" element = {<MoviesPage/>}></Route>
            <Route path = "/login" element = {<LoginPage/>}></Route>
            <Route path="/movies/:id" element={<MoviePage />} />
            <Route path = "/Register" element = {<RegisterPage />}></Route>
            <Route path = "/my-lists" element = {<ListsPage/>}></Route>
            <Route path = "*" element = {<HomePage/>}></Route>
        </Routes>
    )
}

export default Router;