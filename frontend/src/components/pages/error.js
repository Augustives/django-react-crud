import { useRouteError } from "react-router-dom";

const Error = () => {
  const error = useRouteError();

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-6xl m-9">Oops!</h1>
      <p className="text-2xl">Sorry, an unexpected error has occurred.</p>
      <p>
        <i className="text-xl">{error.statusText || error.message}</i>
      </p>
    </div>
  );
};

export default Error;
