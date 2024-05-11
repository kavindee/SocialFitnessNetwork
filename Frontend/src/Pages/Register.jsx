import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { TEInput, TERipple } from "tw-elements-react";
import * as yup from "yup";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { app } from "../db/firebase";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import backgroundImg from "../images/bck5.jpg";

const formSchema = yup.object().shape({
  username: yup.string().required().min(3),
  email: yup.string().email().required(),
  password: yup.string().required().min(6),
  phone: yup.string().required().min(10),

});

const storage = getStorage(app);

const Register = () => {
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm({
    resolver: yupResolver(formSchema),
  });

  function onImageChange(e) {
    const selectedFiles = e.target.files;

    if (!selectedFiles || selectedFiles.length === 0) {
      setError("image", {
        type: "manual",
        message: "Please select at least one image",
      });
    }

    const currentFile = selectedFiles[0];
    setImage(currentFile);
  }

  const onSubmit = async (data) => {

    if (!image) {
      setError("image", {
        type: "manual",
        message: "Please select at least one image",
      });
      return;
    }

    const imageRef = ref(storage, `images/${image.name}`);
    await uploadBytes(imageRef, image);
    const imageUrl = await getDownloadURL(imageRef);

    const newUser = {
      name: data.username,
      email: data.email,
      password: data.password,
      mobileNumber: data.phone,
      profileImage: imageUrl,
    };
    console.log(newUser);
    try {
      const response = await axios.post(
        `http://localhost:8080/users/register`,
        newUser
      );
      if (response.data) {
        toast.success("User created successfully");
        navigate("/login");
      }
    } catch (error) {
       if (error?.response) {
         toast.error(error.response.data);
       } else {
         console.log(error);
         toast.error("Something went wrong");
       }
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-indigo-50" style={{
      backgroundImage: `url(${backgroundImg})`,
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      backgroundAttachment: "fixed",
    }}>
  
            <div className="w-full max-w-md p-4 bg-white rounded-lg shadow-md backdrop-blur-md" style={{ backgroundColor: "rgba(64, 64, 64, 0.7)" }}>
              <form className = " ml-6 mr-6 mt-6 mb-6" onSubmit={handleSubmit(onSubmit)}>

              {/* Title and Subtitle */}
              <h1 className="text-3xl font-bold text-yellow-600 mb-4">Register</h1>
              <h2 className="text-lg text-white mb-6">Become a Member Today!</h2>
                <TEInput
                  type="text"
                  label="User's Name"
                  size="lg"
                  className="mb-1 text-white"
                  {...register("username")}
                  isInvalid={errors.username}
                ></TEInput>
                <p className="mb-6 text-sm text-red-600">
                  {errors.username?.message}
                </p>

                <TEInput
                  type="email"
                  label="Email address"
                  size="lg"
                  className="mb-1 text-white"
                  {...register("email")}
                  isInvalid={errors.email}
                ></TEInput>
                <p className="mb-6 text-sm text-red-500">
                  {errors.email?.message}
                </p>

              
                <TEInput
                  type="password"
                  label="Password"
                  className="mb-1 text-white"
                  size="lg"
                  {...register("password")}
                  isInvalid={errors.password}
                ></TEInput>
                <p className="mb-6 text-sm text-red-500">
                  {errors.password?.message}
                </p>

                <TEInput
                  type="number"
                  label="Phone Number"
                  size="lg"
                  className="mb-1 text-white"
                  {...register("phone")}
                  isInvalid={errors.phone}
                ></TEInput>
                <p className="mb-6 text-sm text-red-500">
                  {errors.phone?.message}
                </p>

                <div className="mb-3 w-96">
                  <label
                    htmlFor="formFile"
                    className="mb-2 inline-block text-white text-neutral-700 dark:text-neutral-200"
                  >
                    Select the Profile Picture
                  </label>
                  <input
                    className="relative m-0 block w-full min-w-0 text-white flex-auto rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-neutral-700 dark:file:text-neutral-100 dark:focus:border-primary"
                    type="file"
                    id="formFile"
                    onChange={onImageChange}
                  />
                  <p className="mb-6 text-sm text-red-500">
                    {errors.image?.message}
                  </p>
                </div>

                <TERipple rippleColor="light" className="w-full">
                  <button
                    type="submit"
                    className="mb-3 inline-block w-full rounded bg-black px-7 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-orange-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-orange-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-orange-600 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                  >
                    {isSubmitting ? "Loading..." : "Register"}
                  </button>
                </TERipple>

                <TERipple rippleColor="light" className="w-full">
                  <button
                    onClick={() => navigate("/login")}
                    className="inline-block w-full rounded bg-yellow-800 px-7 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-yellow-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-yellow-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-yellow-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                  >
                    Sign in
                  </button>
                </TERipple>
              </form>
            </div>
          </div>
      
  );
};

export default Register;
