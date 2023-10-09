import { Link } from "react-router-dom";
import AuthLayout from "../../Components/AuthLayout";
import Button from "../../Components/Button";
import TextInput from "../../Components/TextInput";

export default function SignUp() {
  return (
    <AuthLayout>
      <div className="my-auto">
        <h1 className="text-2xl">ConferenceApp</h1>
        <p className="text-md mb-10">Create a New Account</p>
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
        <Button>Create Account</Button>

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
