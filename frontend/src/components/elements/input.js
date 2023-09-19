const Input = ({ label, type, placeholder, errorMessage, ...extra }) => {
  return (
    <div className="py-3">
      <label className="text-gray-700">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        {...extra}
        className="w-full h-14 px-4 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500
      focus:bg-white focus:outline-none"
      />
      <div className="h-2 min-h-full">
        <span className="text-sm text-red-700">{errorMessage}</span>
      </div>
    </div>
  );
};

export default Input;
