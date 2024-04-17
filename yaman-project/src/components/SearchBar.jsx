import { useState } from "react";

const SearchBar = () => {
  const [formData, setFormData] = useState({
    location: "amritsar",
    checkin: "",
    groupsize: 2,
  });
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };
  return (
    <div className="flex items-center justify-center w-screen ">
      <form className="w-3/4  flex items-center justify-center p-3 gap-4" onSubmit={handleSubmit} >
        <input
          type="text"
          name="location"
          placeholder="location"
          onChange={handleChange}
          value={formData.location}
          className="p-3 rounded-lg "
        />
        <input
          type="date"
          name="checkin"
          value={formData.checkin}
          placeholder="checkin date"
          onChange={handleChange}
          className="p-3 rounded-lg "
        />
        <input
          type="text"
          name="groupsize"
          value={formData.groupsize}
          placeholder="group size"
          onChange={handleChange}
          className="p-3 rounded-lg "
        />
        <button className="p-2 border border-slate-700 rounded-lg hover:rounded-none hover:bg-slate-500 hover:text-white ease-in duration-500 ">Search</button>
      </form>
    </div>
  );
};

export default SearchBar;
