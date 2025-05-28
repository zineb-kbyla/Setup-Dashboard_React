import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CircularProgress from "@mui/material/CircularProgress";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { fadeUp } from "../../constants/animations";
import {
  faEnvelope,
  faEye,
  faEyeSlash,
  faLock,
} from "@fortawesome/free-solid-svg-icons";

const LoginForm = ({ onSubmit, loading, showPassword, togglePassword }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
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
          <p className="text-sm text-red-500 mt-1">Email is required</p>
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
            <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
          </span>
        </div>
        {errors.password && (
          <p className="text-sm text-red-500 mt-1">Password is required</p>
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
        {loading ? <CircularProgress size={24} color="inherit" /> : "Login"}
      </button>
    </motion.form>
  );
};

export default LoginForm; 