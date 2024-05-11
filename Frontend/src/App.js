import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Home from "./Pages/Home";
import Post from "./Pages/Post";
import { Toaster } from "react-hot-toast";
import Profile from "./Pages/Profile";
import MealPlan from "./Pages/MealPlan";
import FormWorkoutStatusPage from "./Pages/FormWorkoutStatusPage";
import FormWorkoutPlanPage from "./Pages/FormWorkoutPlanPage";
import FormMealPlanePage from "./Pages/FormMealPlanePage";
import WorkoutStatus from "./Pages/WorkoutStatus";

function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-center" />
      <Routes>
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/" element={<Home />} />
        <Route path="/post" element={<Post />} />
        <Route path="/post/:postId" element={<Post />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile/:userId" element={<Profile />} />
        <Route path="/MealPlan" element={<MealPlan />} />
        <Route path="/FormMealPlanePage" element={<FormMealPlanePage />} />
        
        <Route path="/WorkoutStatus" 
        element={<WorkoutStatus />} />
        <Route
          path="/FormMealPlanePage/:mealPlanId"
          element={<FormMealPlanePage />}
        />
        <Route path="/FormWorkoutStatusPage" 
        element={<FormWorkoutStatusPage />} />
        <Route
          path="/FormWorkoutStatusPage/:statusId"
          element={<FormWorkoutStatusPage />}
        />
        <Route path="/FormWorkoutPlanPage" 
        element={<FormWorkoutPlanPage />} />
        <Route
          path="/FormWorkoutPlanPage/:workoutPlanId"
          element={<FormWorkoutPlanPage />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
