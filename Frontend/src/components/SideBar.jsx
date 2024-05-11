import React from "react";
import { Link, NavLink } from "react-router-dom";

const MainSideBar = ({ user }) => {
  const handleLogout = async () => {
    try {
      window.location.href = "http://localhost:8080/logout";
      localStorage.removeItem("user");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <div className="bg-black">
      {" "}
      <div className=" flex flex-col bg-black">
        <aside className="flex flex-col shrink-0 lg:w-[300px] w-[250px]  m-0 fixed  bg-gray-600 border-r border-r-dashed border-r-neutral-200  min-h-full">

          <div className="flex items-center justify-between px-3 py-3 bg-gray-800 ">
            <Link
              to={`/profile/${user?.id}`}
              className="flex items-center mr-5"
            >
              <div className="mr-5">
                <div className="">
                  <img
                    className="w-[50px] h-[50px] min-w-[50px] rounded-full border-gray-400 border-2 "
                    src={user?.profileImage}
                    alt="profile"
                  />
                </div>
              </div>
              <div className="mr-2 ">
                <p className="text-base text-orange-400 font-bold uppercase ">{user?.name}</p>
                <p className="text-xs text-gray-400">{user?.email}</p>
              </div>
            </Link>
          </div>

          

          <div className="relative  my-2 ">
            <div className="flex flex-col w-full font-medium">
              <div>
                <span className="select-none flex items-center px-4 py-[.375rem] cursor-pointer my-[.4rem] rounded-[.95rem]">
                  <NavLink
                    to="/"
                    className={({ isActive, isPending }) =>
                      isPending
                        ? "pending"
                        : isActive
                        ? "flex items-center rounded-lg w-full px-2 py-1 h-10 bg-yellow-600  text-white"
                        : "flex items-center rounded-lg w-full px-2 py-1 h-10  text-black"
                    }
                  >
                    Home
                  </NavLink>
                </span>
              </div>

              <div>
                <span className="select-none flex items-center px-4 py-[.375rem] cursor-pointer my-[.4rem] rounded-[.95rem]">
                  <NavLink
                    to="/post"
                    className={({ isActive, isPending }) =>
                      isPending
                        ? "pending"
                        : isActive
                        ? "flex items-center rounded-lg w-full px-2 py-1 h-10 bg-yellow-600  text-white"
                        : "flex items-center rounded-lg w-full px-2 py-1 h-10  text-black"
                    }
                  >
                    Post
                  </NavLink>
                </span>
              </div>

              <div>
                <span className="select-none flex items-center px-4 py-[.375rem] cursor-pointer my-[.4rem] rounded-[.95rem]">
                  <NavLink
                    to="/FormWorkoutStatusPage"
                    className={({ isActive, isPending }) =>
                      isPending
                        ? "pending"
                        : isActive
                        ? "flex items-center rounded-lg w-full px-2 py-1 h-10 bg-yellow-600  text-white"
                        : "flex items-center rounded-lg w-full px-2 py-1 h-10  text-black"
                    }
                  >
                    Workout Status
                  </NavLink>
                </span>
              </div>

              <div>
                <span className="select-none flex items-center px-4 py-[.375rem] cursor-pointer my-[.4rem] rounded-[.95rem]">
                  <NavLink
                    to="/FormWorkoutPlanPage"
                    className={({ isActive, isPending }) =>
                      isPending
                        ? "pending"
                        : isActive
                        ? "flex items-center rounded-lg w-full px-2 py-1 h-10 bg-yellow-600  text-white"
                        : "flex items-center rounded-lg w-full px-2 py-1 h-10  text-black"
                    }
                  >
                    Workout Plan
                  </NavLink>
                </span>
              </div>

              <div>
                <span className="select-none flex items-center px-4 py-[.375rem] cursor-pointer my-[.4rem] rounded-[.95rem]">
                  <NavLink
                    to="/FormMealPlanePage"
                    className={({ isActive, isPending }) =>
                      isPending
                        ? "pending"
                        : isActive
                        ? "flex items-center rounded-lg w-full px-2 py-1 h-10 bg-yellow-600  text-white"
                        : "flex items-center rounded-lg w-full px-2 py-1 h-10  text-black"
                    }
                  >
                    Meal Plan
                  </NavLink>
                </span>
              </div>

              <div>
                <span className="select-none flex mb-10 items-center px-4 py-[.375rem] cursor-pointer my-[.4rem] rounded-[.95rem]">
                  <NavLink
                    to={`/profile/${user?.id}`}
                    className={({ isActive, isPending }) =>
                      isPending
                        ? "pending"
                        : isActive
                        ? "flex items-center rounded-lg w-full px-2 py-1 h-10 bg-yellow-600  text-white"
                        : "flex items-center rounded-lg w-full px-2 py-1 h-10  text-black"
                    }
                  >
                    Profile
                  </NavLink>
                </span>
              </div>

              <div className="my-5">
                <span className="select-none flex items-center px-4 py-[.175rem] cursor-pointer my-[.1rem] rounded-[.95rem]   text-white">
                  <button
                    className="flex items-center rounded-lg w-full px-2 h-10 bg-red-800 text-white"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </span>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default MainSideBar;
