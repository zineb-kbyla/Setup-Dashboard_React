import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoginForm from "../components/Forms/LoginForm";
import Logo from "../components/Logo";
import LoginTitle from "../components/LoingTitle";
import RightPanel from "../components/RightPanel";
import { formSectionVariants } from "../constants/animations";
import { DEFAULT_USER, STORAGE_KEYS } from "../constants/auth";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const existingUser = localStorage.getItem(STORAGE_KEYS.USER);
    if (!existingUser) {
      localStorage.setItem(DEFAULT_USER.email, JSON.stringify(DEFAULT_USER));
    }
    if (isLoggedIn) {
      navigate("/dashboard");
    }
  }, [isLoggedIn, navigate]);

  const handleLogin = async (data) => {
    setLoading(true);
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
      toast.error("An error occurred during login");
    } finally {
      setLoading(false);
    }
  };

  const togglePassword = () => setShowPassword(!showPassword);

  return (
    <>
      <ToastContainer position="top-center" theme="colored" autoClose={3000} />
      <div className="flex flex-col md:flex-row justify-center items-center h-screen bg-[#0f1c3e] overflow-hidden">
        <AnimatePresence>
          {!isExiting && !isLoggedIn && (
            <>
              {/* Login Form Section */}
              <motion.div
                key="form-section"
                exit="exit"
                variants={formSectionVariants}
                initial="hidden"
                animate="visible"
                className="w-full md:w-2/5 flex flex-col px-6 md:p-12"
              >
                <div className="flex flex-col items-center justify-center gap-6 w-full h-full">
                  <Logo />
                  <LoginTitle />
                  <LoginForm
                    onSubmit={handleLogin}
                    loading={loading}
                    showPassword={showPassword}
                    togglePassword={togglePassword}
                  />
                </div>
              </motion.div>

              <RightPanel />
            </>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default Login;
