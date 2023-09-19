const Button = ({ text, ...extra }) => {
  return (
    <button
      className="w-32 block bg-indigo-500 hover:bg-indigo-400 focus:bg-indigo-400 text-white 
      font-semibold rounded-lg px-4 py-3 mt-6"
      {...extra}
    >
      {text}
    </button>
  );
};

export default Button;
