import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useQuery } from "react-query";
import { toast } from "react-toastify";

const Todo = () => {
  /* const [lists, setLists] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/post")
      .then((res) => res.json())
      .then((data) => setLists(data));
  }, []); */
  const {
    isLoading,
    error,
    data: lists,
    refetch,
  } = useQuery("lists", () =>
    fetch("http://localhost:5000/post").then((res) => res.json())
  );
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    const add = data.list;
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ add }),
    };
    fetch("http://localhost:5000/post", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        if (data.insertedId) {
          toast.success("Congress! new item added");
          refetch();
        }
      });
    reset();
  };
  const handleComplete = (id) => {
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    };
    fetch("http://localhost:5000/update", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          toast.success("Wow! you complete a task");
          refetch();
        }
      });
  };
  const handleDelete = (id) => {
    fetch("http://localhost:5000/delete", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.deletedCount) {
          toast.error("Delete complete");
          refetch();
        }
      });
  };
  return (
    <div className="w-2/4 mx-auto flex flex-col justify-center item h-screen">
      <div className="w-full">
        {" "}
        <form onSubmit={handleSubmit(onSubmit)} class="grid grid-cols-3 gap-3">
          <div className="col-span-2">
            <input
              type="text"
              placeholder="Add to list"
              class="input input-bordered col-span-2 w-full"
              {...register("list", { required: true })}
            />
            {errors.list && <span>This field is required</span>}
          </div>

          <input
            class="btn btn-square w-full"
            value={"Add to list"}
            type="submit"
          />
        </form>
      </div>
      <div className="mt-8">
        <div class="overflow-x-auto">
          <table class="table w-full">
            <thead>
              <tr>
                <th></th>
                <th>List</th>
                <th>Complete</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {lists?.map((list, index) => (
                <tr key={list._id}>
                  <th>{index + 1}</th>
                  <td className={`${list.success && "line-through"}`}>
                    {list.add}{" "}
                  </td>
                  <td>
                    {list.success ? (
                      ""
                    ) : (
                      <button
                        onClick={() => handleComplete(list._id)}
                        className="btn btn-success text-white"
                      >
                        Complete
                      </button>
                    )}
                  </td>
                  <td>
                    <button
                      onClick={() => handleDelete(list._id)}
                      className="btn btn-error text-white"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <ul></ul>
      </div>
    </div>
  );
};

export default Todo;
