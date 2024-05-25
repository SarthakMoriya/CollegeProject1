import { toast } from "react-toastify";

export const BASE_URL = "http://localhost:8000";

export const formatDate = (dateString) => {
  // Create a new Date object from the string
  const dateObj = new Date(dateString);

  // Define month names for easy access
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
  let suffix = "th";
  if (day % 10 === 1 && day !== 11) {
    suffix = "st";
  } else if (day % 10 === 2 && day !== 12) {
    suffix = "nd";
  } else if (day % 10 === 3 && day !== 13) {
    suffix = "rd";
  }

  // Format the date in the desired format
  return `${day}${suffix} ${monthNames[monthIndex]} ${year}`;
};

export const toastify = (message, error = false) => {
  console.log("Toast created");
  if (error) toast.error(message);
  else toast.success(message);
};
