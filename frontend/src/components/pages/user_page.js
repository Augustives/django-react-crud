import { useAuth } from "../../hooks/auth_hook";

const User = () => {
  const { user } = useAuth();

  return (
    <section className="h-full w-full flex flex-row items-center justify-center">
      {user ? (
        <div className="bg-gray-100 w-3/5 rounded-md p-6 flex flex-col items-center justify-center">
          <h1 className="text-2xl font-bold leading-tight">
            Welcome {user.customer.name}!
          </h1>
          <div className="w-full">Crud</div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </section>
  );
};

export default User;
