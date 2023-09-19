const Button = ({ text, ...extra }) => {
  return (
    <button
      className="w-28 md:w-42 lg:w-52 block bg-indigo-500 hover:bg-indigo-400 focus:bg-indigo-400 text-white 
      font-semibold rounded-lg px-4 py-3 mt-6"
      {...extra}
    >
      {text}
    </button>
  );
};

export default Button;
