import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../../hooks/auth_hook";

import Button from "../elements/button";

const User = () => {
  const navigate = useNavigate();
  const { user, getUser, deleteUser, token, logout } = useAuth();

  useEffect(() => {
    if (token && !user) {
      getUser();
    }
  }, [token, user, getUser]);

  return user ? (
    <section className="h-full w-full flex flex-row items-center justify-center">
      <div className="bg-gray-100 w-2/6 rounded-md p-6 flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold leading-tight">
          Welcome {user.customer.name}!
        </h1>
        <Button
          text="Edit"
          onClick={() => {
            navigate("/edit");
          }}
        />
        <Button
          text="Delete"
          onClick={() => {
            deleteUser();
          }}
        />
        <Button
          text="Logout"
          onClick={() => {
            logout();
          }}
        />
      </div>
    </section>
  ) : (
    <div>Loading...</div>
  );
};

export default User;
