import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import Loading from "../Shared/Loading";
import auth from "../../firebaseinit";
import {
  useCreateUserWithEmailAndPassword,
  useUpdateProfile,
} from "react-firebase-hooks/auth";
const SignUp = () => {
  const navigate = useNavigate();
  const [updateProfile] = useUpdateProfile(auth);
  const [createUserWithEmailAndPassword, user, loading] =
    useCreateUserWithEmailAndPassword(auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    const { email, name, password } = data;
    await createUserWithEmailAndPassword(email, password);
    await updateProfile({ displayName: name });
  };
  if (user) {
    navigate("/");
  }
  if (loading) {
    return <Loading />;
  }
  return (
    <div className="mx-auto w-2/4 ">
      <div className=" h-screen flex flex-col justify-center items-center">
        <h2 className="text-4xl text-center">Sign Up</h2>
        <div className=" w-full">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div class="form-control w-full">
              <label class="label">
                <span class="label-text">Name</span>
              </label>
              <input
                type="text"
                placeholder="Enter your name"
                class="input input-bordered w-full"
                {...register("name", {
                  required: true,
                })}
              />
              <label class="label">
                {errors.name && (
                  <span className="text-red-500">please enter your name</span>
                )}
              </label>
            </div>
            <div class="form-control w-full">
              <label class="label">
                <span class="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                class="input input-bordered w-full"
                {...register("email", {
                  required: true,
                  pattern: {
                    value:
                      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                    message: "error message",
                  },
                })}
              />
              <label class="label">
                {errors.email && (
                  <span className="text-red-500">please enter valid mail</span>
                )}
              </label>
            </div>
            <div class="form-control w-full">
              <label class="label">
                <span class="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                class="input input-bordered w-full"
                {...register("password", {
                  required: true,
                })}
              />
              <label class="label">
                {errors.password && (
                  <span className="text-red-500">
                    Please enter your password
                  </span>
                )}
              </label>
            </div>
            <div className="my-4">
              <span>
                Already a user ?
                <Link className="text-primary" to="/login">
                  Login
                </Link>
              </span>
            </div>
            <input className="btn btn-primary" type="submit" />
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
