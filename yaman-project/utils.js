import { toast } from "react-toastify";

export const BASE_URL = "http://localhost:8000";

export const formatDate = (dateString) => {
  // console.log(dateString);
  
  // Create a new Date object from the string (ignoring time portion for formatting)
  const dateObj = new Date(dateString);

  // Define month names for easy access (adjust if needed)
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // Get the day, month index (0-based), and year
  const day = dateObj.getDate();
  const monthIndex = dateObj.getMonth();
  const year = dateObj.getFullYear();

  // Get the appropriate ordinal suffix for the day (th, st, nd, rd)
  const suffixes = ["st", "nd", "rd", "th"];
  const suffix =
    suffixes[day % 10 > 3 ? (day % 10 === 0 ? 0 : 3) : (day % 10) - 1];

  // Format the date in the desired format
  return `${day}${suffix} ${monthNames[monthIndex]} ${year}`;
};

export const toastify = (message, error = false) => {
  console.log("Toast created");
  if (error) toast.error(message);
  else toast.success(message);
};
