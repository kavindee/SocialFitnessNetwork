import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import backgroundImg from '../images/statusbg.jpg';

const WorkoutStatus = ({ user }) => {
  const [workoutStatuses, setWorkoutStatuses] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchWorkoutStatuses = async () => {
      try {
        const res = await axios.get("http://localhost:8080/workoutStatus");
        if (res.status === 200) {
          setWorkoutStatuses(res.data);
        }
      } catch (error) {
        toast.error("Failed to fetch workout statuses");
      }
    };
    fetchWorkoutStatuses();
  }, []);

  const deleteWorkOut = async (status) => {
    try {
      await axios.delete(
        `http://localhost:8080/workoutStatus/${status.statusId}`
      );

      setWorkoutStatuses((prevStatuses) =>
        prevStatuses.filter((s) => s.statusId !== status.statusId)
      );

      toast.success("Workout status deleted successfully");
    } catch (error) {
      toast.error("Failed to delete workout status");
    }
  };

  const navigateEditPage = (status) => {
    navigate(`/FormWorkoutStatusPage/${status.statusId}`);
  };

  return (
    <div
      className="container mx-auto p-4 min-h-screen" 
      style={{
        backgroundImage: `url(${backgroundImg})`,
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundAttachment: 'fixed'
      }}>
      <div className="flex justify-between items-center" >
      </div>

      <div className="space-y-4 flex justify-center flex-col items-center " >
        {workoutStatuses.map((status, index) => (
          <div
            key={index}
            className="bg-white shadow-lg rounded-lg p-4 w-[500px] " style={{ backgroundColor: "rgba(255, 255, 255, 0.9)" }}
          >
            <div className="flex justify-between ">
              <div className="flex gap-3">
                <div>
                  <img
                    src={status?.userProfile}
                    alt="user"
                    className="w-8 h-8 rounded-full"
                  />
                </div>
                <div>
                  <h2 className="text-md font-semibold">{status?.username}</h2>
                  <p className="text-xs font-bold">
                    Workout on {status.date}
                  </p>
                </div>
              </div>
              <div className="gap-3 flex">
                {user?.id === status?.userId && (
                  <>
                    <AiFillDelete
                      size={20}
                      color="orange"
                      className="cursor-pointer"
                      onClick={() => deleteWorkOut(status)}
                    />
                    <AiFillEdit
                      size={20}
                      color="green"
                      className="cursor-pointer"
                      onClick={() => navigateEditPage(status)}
                    />
                  </>
                )}
              </div>
            </div>
            <p className="mt-2 text-xs text-base text-neutral-600 dark:text-neutral-200">
            {status.description}
                </p>
            <ul className="list-disc pl-5 space-y-1 mt-2 text-xs">
              <li>Distance run: {status.distance}<span className="text-black text-xs">Km </span></li>
              <li>Number of push-ups: {status.pushUps}</li>
              <li>Weight lifted: {status.weight}<span className="text-black text-xs">Kg </span> </li>
            </ul>
            
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorkoutStatus;
