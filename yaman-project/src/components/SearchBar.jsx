import { useState } from "react";
import { useNavigate } from "react-router-dom";
const SearchBar = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    location: "amritsar",
    price: 1000,
    groupsize: 2,
  });
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/tours?location=${formData.location}&groupsize=${formData.groupsize}&price=${formData.price}`)
    console.log(formData);
  };
  return (
    <div className="flex items-center justify-center w-screen ">
      <form
        className="w-3/4  flex items-center justify-center p-3 gap-4"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          name="location"
          placeholder="location"
          onChange={handleChange}
          value={formData.location}
          className="p-3 rounded-lg border border-black"
        />
        <input
          type="number"
          name="price"
          value={formData.price}
          placeholder="price"
          onChange={handleChange}
          className="p-3 rounded-lg border border-black"
        />
        <input
          type="text"
          name="groupsize"
          value={formData.groupsize}
          placeholder="group size"
          onChange={handleChange}
          className="p-3 rounded-lg border border-black"
        />
        <button 
        className="p-2 border border-slate-700 rounded-lg hover:rounded-none hover:bg-slate-500 text-white ease-in duration-500  bg-blue-500">
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
