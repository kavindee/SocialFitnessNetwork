import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { useNavigate, useParams } from "react-router-dom";
import { useActiveTab } from "../context/ActiveTabContext";
import chestImg from "../images/chest.jpeg";
import backImg from "../images/back1.jpeg";
import armsImg from "../images/arm.jpg";
import legsImg from "../images/leg.jpeg";
import cardioImg from "../images/cardio.jpg"
import backgroundImg from '../images/workbg.jpg';

import toast from "react-hot-toast";
import axios from "axios";

const workoutTypes = [
  { name: "Cardio", image: cardioImg },
  { name: "Chest", image: chestImg },
  { name: "Back", image: backImg },
  { name: "Arms", image: armsImg },
  { name: "Legs", image: legsImg },
  
];

function FormWorkoutPlanPage() {
  const [selectedWorkout, setSelectedWorkout] = useState("Cardio");
  const [exercises, setExercises] = useState("");
  const [sets, setSets] = useState("");
  const [routine, setRoutine] = useState("");
  const [repetitions, setRepetitions] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [user, setUser] = useState({});
  const [editWorkoutPlans, setEditWorkoutPlans] = useState(false);
  const { setActiveTab } = useActiveTab();
  console.log(selectedWorkout);
  const { workoutPlanId } = useParams();

  useEffect(() => {
    const fetchSingleWorkoutPlan = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:8080/workoutPlans/${workoutPlanId}`
        );
        setSelectedWorkout(data.workoutPlanName);
        setExercises(data.exercises);
        setSets(data.sets);
        setRoutine(data.routine);
        setRepetitions(data.repetitions);
        setDescription(data.description);
        setDate(data.date);
        console.log(data);
        setEditWorkoutPlans(true);
      } catch (error) {
        console.log(error);
      }
    };
    fetchSingleWorkoutPlan();
  }, [workoutPlanId]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setUser(user);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      return;
    }

    if (!selectedWorkout ||
      !exercises ||
      !sets ||
      !routine ||
      !repetitions ||
      !description) {
      return toast.error("Please fill all the fields");
    }

    const workoutData = {
      userId: user.id,
      sets,
      routine,
      date,
      exercises,
      repetitions,
      description,
      workoutPlanName: selectedWorkout,
    };

    const updateWorkoutData = {
      userId: user.id,
      sets,
      routine,
      date,
      exercises,
      repetitions,
      description,
      workoutPlanName: selectedWorkout,
    };

    if (editWorkoutPlans) {
      try {
        const res = await axios.put(
          `http://localhost:8080/workoutPlans/${workoutPlanId}`,
          updateWorkoutData
        );
        if (res.status === 200) {
          toast.success("Workout Plans Updated Successfully");
          setSets("");
          setRoutine("");
          setDate("");
          setExercises("");
          setRepetitions("");
          setDescription("");
          setSelectedWorkout("");
          navigate("/");
          setActiveTab("tab3");
        }
      } catch (error) {
        toast.error("Faild to update workout plans");
      }
    } else {
      try {
        const res = await axios.post(
          `http://localhost:8080/workoutPlans`,
          workoutData
        );
        if (res.status === 201) {
          toast.success("Workout Plans added Successfully");
          setSets("");
          setRoutine("");
          setDate("");
          setExercises("");
          setRepetitions("");
          setDescription("");
          setSelectedWorkout("");
          navigate("/");
          setActiveTab("tab3");
        }
      } catch (error) {
        toast.error("Failed to add workout plans");
      }
    }
  };

  const navigate = useNavigate();

  const goToWorkoutPlans = () => {
    navigate("/");
  };

  return (
    <Layout>
      <div
        className="container mx-auto p-4 min-h-screen"
        style={{
          backgroundImage: `url(${backgroundImg})`,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundAttachment: "fixed",
        }}

      >
        <h1 className="mb-4 text-3xl font-semibold text-center text-white">
          {editWorkoutPlans ? "Edit Your Workout Plan" : "Create Your Workout Plan"}
        </h1>
        <form
          onSubmit={handleSubmit}
          className="w-2/3 mx-auto my-6 bg-gray-600 p-12 rounded-lg shadow-md" style={{ backgroundColor: "rgba(128, 128, 128, 0.9)" }}
        >


          <div className="space-y-8">
            <div className="mb-2">
              <div className="flex flex-wrap justify-center items-center">
                {workoutTypes.map((workout, index) => (
                  <div key={index} className="p-4">

                    <div
                      className={`cursor-pointer rounded-lg overflow-hidden transition-transform transform ${selectedWorkout === workout.name
                          ? "ring-4 ring-red-500"
                          : ""}`}
                      onClick={() => setSelectedWorkout(workout.name)}
                    >

                      <div
                        className={` text-center ${selectedWorkout === workout.name
                            ? "bg-red-600 text-white"
                            : "bg-white text-gray-800"}`}
                      >
                        {workout.name}
                        <img
                          src={workout.image}
                          alt={workout.name}
                          className="w-24 h-16 object-cover" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mb-2 flex justify-center items-center">

                <input
                  type="text"
                  id="routine"
                  value={routine}
                  onChange={(e) => setRoutine(e.target.value)}
                  className="mt-1 text-xs block w-[500px] items-center px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                  placeholder="Enter routine name" />
              </div>
              <div className="mb-2 flex justify-center items-center">

                <input
                  type="text"
                  id="exercises"
                  value={exercises}
                  onChange={(e) => setExercises(e.target.value)}
                  className="mt-1 text-xs block w-[500px] px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Enter exercises name" />
              </div>

              <div className="flex flex-col items-center justify-center w-full">
              <input
                type="number"
                id="sets"
                value={sets}
                onChange={(e) => setSets(e.target.value)}
                className="block text-xs w-[500px] px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter sets count"
              />
              <input
                type="number"
                id="repetitions"
                value={repetitions}
                onChange={(e) => setRepetitions(e.target.value)}
                className="mt-2 block text-xs w-[500px] px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter repetitions count"
              />
              <input
                type="date"
                onChange={(e) => setDate(e.target.value)}
                className="mt-2 bg-gray-50 border border-gray-300 text-gray-900 sm:text-xs rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-[500px] pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-orange-500 dark:focus:border-orange-500"
                placeholder="Select date"
              />
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows="4"
                className="mt-2 text-xs block w-[500px] h-[120px] px-3 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Describe your workout..."
              ></textarea>
            </div>

            </div>
          </div>
          <div className="flex flex-col items-center justify-center w-full">
          <button
            type="submit"
            className="w-[500px] mt-3 px-4 py-2 text-sm font-medium text-white bg-black rounded-md shadow hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
          >
            Submit
          </button>
          <button
            onClick={goToWorkoutPlans}
            className="w-[500px] px-4 mt-2 py-2 text-sm font-medium text-black bg-gray-400 rounded-md shadow hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2"
          >
            Cancel
          </button>
        </div>

        </form>
      </div>
    </Layout>
  );
}

export default FormWorkoutPlanPage;
