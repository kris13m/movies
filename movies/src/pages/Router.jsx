import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "../features/authentication/components/ProtectedRoute";

// --- Import your Page Components ---
import HomePage from "./HomePage";
import MoviesPage from "./MoviesPage";
import LoginPage from "./LoginPage/LoginPage";
// --- THIS IS THE KEY ---
// We need to import MoviePage, not MovieDetailView, here.
import MoviePage from "./MoviePage/MoviePage"; 
import RegisterPage from "./RegisterPage";
import ListsPage from "./ListsPage/ListsPage";

function Router() { 
  return (
    <Routes>
      <Route path="/movies" element={<MoviesPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/Register" element={<RegisterPage />} />
      <Route path="*" element={<HomePage />} />
      
      {/* --- Protected Routes --- */}
      <Route
        path="/my-lists"
        element={
          <ProtectedRoute>
            <ListsPage />
          </ProtectedRoute>
        }
      />
      
      {/* --- THIS IS THE FIX --- */}
      {/* We render the MoviePage, which will then render MovieDetailView */}
      <Route
        path="/movies/:id"
        element={
          <ProtectedRoute>
            <MoviePage />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default Router;