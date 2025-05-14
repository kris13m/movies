import { Route, Routes } from "react-router-dom";
import CreateAccountPage from "./CreateAccountPage";
import HomePage from "./HomePage";
import MoviesPage from "./MoviesPage";
import LoginPage from "./LoginPage/LoginPage";
import MoviePage from "./MoviePage/MoviePage";

function Router(){
    return(
        <Routes>
            <Route path = "/create" element = {<CreateAccountPage/>}></Route>
            <Route path = "/movies" element = {<MoviesPage/>}></Route>
            <Route path = "/login" element = {<LoginPage/>}></Route>
            <Route path="/movies/:id" element={<MoviePage />} />
            <Route path = "*" element = {<HomePage/>}></Route>
        </Routes>
    )
}

export default Router;