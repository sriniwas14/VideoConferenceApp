import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../../Components/AuthLayout";
import Button from "../../Components/Button";
import TextInput from "../../Components/TextInput";
import { useState } from "react";
import axiosInstance from "../../utils/axios";
import { toast } from "react-toastify";
import jwtDecode from "jwt-decode";
import { useAuth } from "../../Contexts/AuthContext";

export default function SignIn() {
  const navigate = useNavigate();
  const auth: any = useAuth();

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const result = await axiosInstance.post("/auth/users/signin", {
        email: e.target[0].value,
        password: e.target[1].value,
      });
      if (result.data.success) {
        toast.success("Logged In!");

        let decodedToken: any = jwtDecode(result.data.token);
        auth.setUser(decodedToken);
        localStorage.setItem("token", result.data.token);

        navigate("/");
      }
    } catch (error: any) {
      toast(error.response?.data?.error || error.response?.data?.message);
    }
  };

  return (
    <AuthLayout>
      <div className="my-auto">
        <h1 className="text-2xl">ConferenceApp</h1>
        <p className="text-md mb-10">Sign In to Continue</p>
        <form onSubmit={handleSubmit}>
          <TextInput
            className={"mb-2"}
            onChange={(value) => {}}
            type="text"
            placeholder="Email"
            required={true}
          />
          <TextInput
            className={"mb-2"}
            onChange={(value) => {}}
            type="password"
            placeholder="Password"
            required={true}
          />
          <Button type="submit">Sign In</Button>
        </form>

        <p className="text-center mt-10">
          Don't have an Account?{" "}
          <Link
            className="text-indigo-600 hover:text-indigo-500 transition-all"
            to="/signup"
          >
            Create Account
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
}
