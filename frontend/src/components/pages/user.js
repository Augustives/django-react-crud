import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../../hooks/user_hook";
import Button from "../elements/button";

const User = () => {
  const navigate = useNavigate();
  const { user, getUser, token, logout } = useAuth();

  useEffect(() => {
    if (!user && !token) {
      navigate("/");
    }
  }, [user, getUser, token, navigate]);

  return (
    <section className="h-full w-full flex flex-row items-center justify-center">
      {user ? (
        <div className="bg-gray-100 w-2/6 rounded-md p-6 flex flex-col items-center justify-center">
          <h1 className="text-2xl font-bold leading-tight">
            Welcome {user.customer.name}!
          </h1>
          <div className="flex justify-between w-full">
            <div>
              <Button text="Edit" onClick={() => {}} />
            </div>
            <div>
              <Button
                text="Logout"
                onClick={() => {
                  logout();
                }}
              />
            </div>
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </section>
  );
};

export default User;
