import React, { useEffect, useState } from "react";
import backgroundImg from "../images/mealbg.jpg";
import { TERipple } from "tw-elements-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";

const MealPlan = ({ user }) => {
  const [mealPlans, setMealPlans] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMealPlans = async () => {
      try {
        const res = await axios.get("http://localhost:8080/mealPlans");
        if (res.status === 200) {
          setMealPlans(res.data);
        }
      } catch (error) {
        toast.error("Failed to fetch meal plans");
      }
    };
    fetchMealPlans();
  }, []);

  // Delete Meal Plan by ID
  const deleteMealPlan = async (mealPlan) => {
    try {
      await axios.delete(`http://localhost:8080/mealPlans/${mealPlan.mealPlanId}`);
      setMealPlans(prevMealPlans => prevMealPlans.filter(mp => mp.mealPlanId !== mealPlan.mealPlanId));
      toast.success("Meal Plan deleted successfully");
    } catch (error) {
      toast.error("Failed to delete Meal Plan");
    }
  };

  const navigateEditPage = (mealPlan) => {
    navigate(`/FormMealPlanePage/${mealPlan.mealPlanId}`);
  };

  return (
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
      <div className="space-y-6 max-w-xl w-[500px] mx-auto rounded-lg shadow-md " >
        {mealPlans.map((mealPlan, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-4" style={{ backgroundColor: "rgba(255, 255, 255, 0.8)" }}>
            
            <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <img
                    src={mealPlan?.userProfile}
                    className="w-10 h-10 rounded-full mr-4"
                    alt="ProfileImage"
                  />
                  <p className="text-md font-medium leading-tight text-neutral-800 dark:text-neutral-50">
                    {mealPlan?.username}
                    <p className="text-base text-xs text-neutral-600 dark:text-neutral-200">
                  {mealPlan?.date}
                  
                </p>
                  </p>
                </div>
                
                <div className="flex justify-end">
                {user?.id === mealPlan?.userId && (
                  <>
                    <AiFillDelete
                      size={20}
                      color="orange"
                      className="cursor-pointer mr-2"
                      onClick={() => deleteMealPlan(mealPlan)}
                    />
                    <AiFillEdit
                      size={20}
                      color="green"
                      className="cursor-pointer"
                      onClick={() => navigateEditPage(mealPlan)}
                    />
                  </>
                )}
              </div>
              </div>
            <div className="overflow-hidden bg-cover bg-no-repeat mb-1 w-sm h-sm sm:w-sm sm:h-sm">
              <img className="rounded-t-lg w-[500px] h-full" src={mealPlan?.source} alt="" />
            </div>
            <div>
              
              <h6 className="mb-1 text-xl font-bold leading-tight text-neutral-800 dark:text-neutral-50 underline">
                {mealPlan?.recipes}
              </h6>
              <p className=" text-xs text-base text-neutral-600 dark:text-neutral-200">
              <span className="text-black text-xs">Meal Type: </span>{mealPlan?.mealType} 
              </p>
              <p className=" text-xs text-base text-neutral-600 dark:text-neutral-200">
              <span className="text-black text-xs">Dietary Preferences: </span> {mealPlan?.dietaryPreferences} 
              </p>
              <p className=" text-xs mb-1 text-base text-neutral-600 dark:text-neutral-200">
              <span className="text-black text-xs">Portion Sizes: </span>  {mealPlan?.portionSizes}
              </p>
              
              <div className="mb-2">
                <h6 className="mb-1 text-sm font-bold leading-tight text-neutral-800 dark:text-neutral-50">
                  Ingredients
                </h6>
                <p className="text-base text-xs text-neutral-600 dark:text-neutral-200">
                  {mealPlan?.ingredients}
                </p>
              </div>
              <div className="mb-2">
                <h6 className="mb-1 text-sm font-bold leading-tight text-neutral-800 dark:text-neutral-50">
                  Cooking Instruction
                </h6>
                <p className="text-base text-xs text-neutral-600 dark:text-neutral-200">
                  {mealPlan?.cookingInstruction}
                </p>
              </div>
              <div className="mb-2">
                <h6 className="text-sm font-bold leading-tight text-neutral-800 dark:text-neutral-50">
                  Nutritional Information
                </h6>
                <p className="text-base text-xs text-neutral-600 dark:text-neutral-200">
                  {mealPlan?.nutritionalInformation}
                </p>
              </div>
              
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MealPlan;
