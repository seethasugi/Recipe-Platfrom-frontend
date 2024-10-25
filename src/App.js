// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RecipePage from "./components/RecipePage";
import Home from "./components/Home";
import ProfilePage from "./components/ProfilePage";
import GoogleLogin from "./components/Login";
import AdminDashboard from "./pages/AdminDashboard";
import RecipeList from "./pages/RecipeList";
import AddRecipe from "./pages/AddRecipe";
import CommentList from "./pages/CommentList";
import UserList from "./pages/UserList";

const App = () => {
  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<GoogleLogin />} />
        <Route path="/dashboard" element={<Home />} />
        <Route path="/recipe/:id" element={<RecipePage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/AdminDashboard" element={<AdminDashboard />} />
        <Route path="/admin/comments" element={<CommentList />}/>
        <Route path="/admin/recipesList"  element={<RecipeList />}/>
        <Route path="/admin/recipes/add" element={<AddRecipe />}/>
        <Route path="/admin/users"  element={<UserList />}/>
        
      </Routes>
    </Router>
    </>
  );
};

export default App;
