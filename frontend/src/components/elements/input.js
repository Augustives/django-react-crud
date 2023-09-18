const Input = ({ label, type, placeholder, ...extra }) => {
  return (
    <div className="m-2">
      <label className="text-gray-700">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        {...extra}
        className="w-full h-14 px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500
      focus:bg-white focus:outline-none"
      />
    </div>
  );
};

export default Input;
