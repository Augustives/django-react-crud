import { useNavigate } from "react-router";
import { useAuth } from "../../hooks/auth_hook";
import { useEffect } from "react";

import UserForm from "../modules/user_form";

const Edit = () => {
  const navigate = useNavigate();
  const { user, getUser, token } = useAuth();

  useEffect(() => {
    if (token && !user) {
      getUser();
    }
  }, [token, user, getUser]);

  return user ? (
    <section className="h-full w-full flex flex-row items-center justify-center m-4">
      <div className="relative bg-gray-100 w-3/5 rounded-md p-6 flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold leading-tight">Edit</h1>
        <div className="w-full">
          <UserForm initialData={user} />
          <button
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            onClick={() => {
              navigate("/user");
            }}
          >
            X
          </button>
        </div>
      </div>
    </section>
  ) : (
    <div>Loading...</div>
  );
};

export default Edit;
