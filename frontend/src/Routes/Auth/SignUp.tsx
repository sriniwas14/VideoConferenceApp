import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../../Components/AuthLayout";
import Button from "../../Components/Button";
import TextInput from "../../Components/TextInput";
import axiosInstance from "../../utils/axios";
import { toast } from "react-toastify";

export default function SignUp() {
  const navigate = useNavigate();

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const result = await axiosInstance.post("/auth/users", {
        name: e.target[0].value,
        phone: e.target[1].value,
        email: e.target[2].value,
        password: e.target[3].value,
        userType: e.target[4].value,
      });
      if (result.data.success) {
        toast.success("Account Created! Sign In to Continue");
        navigate("/signin");
      }
    } catch (error: any) {
      toast(error.response?.data?.error || error.response?.data?.message);
    }
  };
  return (
    <AuthLayout>
      <div className="my-auto">
        <h1 className="text-2xl">ConferenceApp</h1>
        <p className="text-md mb-10">Create a New Account</p>
        <form onSubmit={handleSubmit}>
          <TextInput
            className={"mb-2"}
            onChange={(value) => {}}
            type="text"
            name="name"
            placeholder="Name"
          />
          <TextInput
            className={"mb-2"}
            onChange={(value) => {}}
            type="text"
            name="phone"
            placeholder="Phone Number"
          />
          <TextInput
            className={"mb-2"}
            onChange={(value) => {}}
            type="text"
            name="email"
            placeholder="Email"
          />
          <TextInput
            className={"mb-2"}
            onChange={(value) => {}}
            type="password"
            name="password"
            placeholder="Password"
          />
          <select
            className="p-4 border-0 bg-slate-100 w-full rounded-xl mb-2"
            required
            name="userType"
          >
            <option value="">-- Account Type -- </option>
            <option value="teacher">Coach</option>
            <option value="student">Attendee</option>
          </select>
          <Button>Create Account</Button>
        </form>
        <p className="text-center mt-10">
          Already have an Account?{" "}
          <Link
            className="text-indigo-600 hover:text-indigo-500 transition-all"
            to="/signin"
          >
            Sign In
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
}
