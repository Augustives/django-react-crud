const Select = ({ label, choices, ...extra }) => {
  return (
    <div className="m-2">
      <label className="text-gray-700">{label}</label>
      <select
        className="w-full h-14 px-4 py-1 rounded-lg bg-gray-200 mt-2 border
          focus:border-blue-500 focus:bg-white focus:outline-none"
        {...extra}
      >
        {choices.map((choice, index) => (
          <option className="bg-gray-200" key={index} value={choice.value}>
            {choice.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
