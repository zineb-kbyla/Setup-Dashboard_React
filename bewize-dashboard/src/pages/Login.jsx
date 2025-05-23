import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import adminAnimation from "../components/animations/admin-dashboard.json";
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import { useForm } from "react-hook-form";
import Lottie from "lottie-react";
import "react-toastify/dist/ReactToastify.css";
import {
  faEnvelope,
  faEye,
  faEyeSlash,
  faLock,
} from "@fortawesome/free-solid-svg-icons";

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();


  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const existingUser = localStorage.getItem("admin@bewize.com");
    if (!existingUser) {
      const defaultUser = {
        name: "admin@bewize.com",
        email: "admin@bewize.com",
        password: "admin",
      };
      localStorage.setItem(defaultUser.email, JSON.stringify(defaultUser));
    }
    if (isLoggedIn) {
      navigate("/dashboard");
    }
  }, [isLoggedIn, navigate]);

  const onSubmit = (data) => {
    setLoading(true);
    setTimeout(() => {
      try {
        const userData = JSON.parse(localStorage.getItem(data.email));
        if (userData && userData.password === data.password) {
          toast.success("You are successfully logged in");
          setIsExiting(true); 
          setTimeout(() => {
            setIsLoggedIn(true); 
          }, 600);
        } else {
          toast.error("Incorrect email or password");
        }
      } catch (error) {
        alert(error);
      } finally {
        setLoading(false);
      }
    }, 3000);
  };

  const togglePassword = () => setShowPassword(!showPassword);

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i = 1) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.6,
        ease: "easeOut",
      },
    }),
    exit: { opacity: 0, y: -20, transition: { duration: 0.5 } },
  };

  return (
    <>
      <ToastContainer position="top-center" theme="colored" autoClose={3000} />
      <div className="flex flex-col md:flex-row justify-center items-center h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 overflow-hidden">
        <AnimatePresence>
          {!isExiting && !isLoggedIn && (
            <>
              {/* Login Form Section */}
              <motion.div
                key="form-section"
                exit="exit"
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                className="w-full md:w-2/5 flex flex-col px-6 md:p-12"
              >
                <div className="flex flex-col items-center justify-center gap-6 w-full h-full">
                  {/* Logo */}
                  <motion.div
                    custom={1}
                    variants={fadeUp}
                    initial="hidden"
                    animate="visible"
                    className="flex items-center justify-center gap-2"
                  >
                    <img
                      className="w-6 md:w-8"
                      src="https://cdn.prod.website-files.com/61241693df6a919162546d4e/612d214b1c0a550f86c31148_Frame%20223.png"
                      alt="Logo"
                      loading="lazy"
                    />
                    <h1 className="text-lg md:text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text">
                      Bewize
                    </h1>
                  </motion.div>

                  {/* Title */}
                  <motion.div
                    custom={2}
                    variants={fadeUp}
                    initial="hidden"
                    animate="visible"
                    className="text-center"
                  >
                    <h2 className="text-white text-2xl font-bold">Sign In</h2>
                    <p className="text-sm text-gray-400">
                      Enter your email and password to access the admin
                      dashboard.
                    </p>
                  </motion.div>

                  {/* Form */}
                  <motion.form
                    onSubmit={handleSubmit(onSubmit)}
                    className="w-full max-w-sm"
                    custom={3}
                    variants={fadeUp}
                    initial="hidden"
                    animate="visible"
                  >
                    <div className="mb-5">
                      <label
                        htmlFor="email"
                        className="block mb-2 text-sm font-medium text-gray-300"
                      >
                        Email
                      </label>
                      <div className="relative">
                        <input
                          {...register("email", { required: true })}
                          type="email"
                          id="email"
                          className="bg-gray-700 border border-gray-600 text-white text-sm rounded-lg block w-full pl-10 pr-4 py-2.5 placeholder-gray-400 outline-none"
                          placeholder="name@example.com"
                          disabled={loading}
                        />
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                          <FontAwesomeIcon icon={faEnvelope} />
                        </span>
                      </div>
                      {errors.email && (
                        <p className="text-sm text-red-500 mt-1">
                          Email is required
                        </p>
                      )}
                    </div>

                    <div className="mb-5">
                      <label
                        htmlFor="password"
                        className="block mb-2 text-sm font-medium text-gray-300"
                      >
                        Password
                      </label>
                      <div className="relative">
                        <input
                          {...register("password", { required: true })}
                          type={showPassword ? "text" : "password"}
                          id="password"
                          className="bg-gray-700 border border-gray-600 text-white text-sm rounded-lg block w-full pl-10 pr-4 py-2.5 placeholder-gray-400 outline-none"
                          placeholder="••••••••"
                          disabled={loading}
                        />
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                          <FontAwesomeIcon icon={faLock} />
                        </span>
                        <span
                          onClick={togglePassword}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer"
                        >
                          <FontAwesomeIcon
                            icon={showPassword ? faEyeSlash : faEye}
                          />
                        </span>
                      </div>
                      {errors.password && (
                        <p className="text-sm text-red-500 mt-1">
                          Password is required
                        </p>
                      )}
                    </div>

                    <div className="flex justify-end mb-5">
                      <a
                        href="#"
                        className="text-sm text-gray-400 hover:text-gray-300 hover:underline"
                      >
                        Forgot password?
                      </a>
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg transition duration-200 font-medium"
                    >
                      {loading ? (
                        <CircularProgress size={24} color="inherit" />
                      ) : (
                        "Login"
                      )}
                    </button>
                  </motion.form>
                </div>
              </motion.div>

              {/* Right Panel */}
              <motion.div
                key="right-panel"
                custom={4}
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="w-full md:w-3/5 text-white flex items-center justify-center p-6 md:p-0"
              >
                <div className="max-w-md p-4 md:p-8 flex flex-col items-center text-center">
                  <Lottie
                    animationData={adminAnimation}
                    loop={true}
                    className="w-full max-w-md mb-3"
                  />
                  <p className="text-sm text-gray-400 mb-6">
                    Manage, track, and support learning with confidence.
                  </p>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
