import React from "react";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import auth from "../../firebaseinit";
import Loading from "../Shared/Loading";

const Login = () => {
  const navigate = useNavigate();
  const [signInWithEmailAndPassword, user, loading] =
    useSignInWithEmailAndPassword(auth);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    const { email, password } = data;
    signInWithEmailAndPassword(email, password);
  };

  if (loading) {
    return <Loading />;
  }
  if (user) {
    navigate("/");
  }
  return (
    <div className="mx-auto w-2/4 ">
      <div className=" h-screen flex flex-col justify-center items-center">
        <h2 className="text-4xl text-center">Login</h2>
        <div className=" w-full">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div class="form-control w-full">
              <label class="label">
                <span class="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                class="input input-bordered w-full"
                {...register("email", {
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
                New here ? please{" "}
                <Link className="text-primary" to="/signup">
                  Sign in
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

export default Login;
