/* eslint-disable no-unused-vars */
import { useState } from "react";
import { motion } from "framer-motion";
import { BASE_URL, formatDate, toastify } from "../../../utils";
import { useSelector } from "react-redux";
import Footer from "../../components/Footer";
import { app } from "../../firebase";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";

const CreateTour = () => {
  const today = new Date().toISOString().split("T")[0];
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const [destination, setDestination] = useState({
    destimg: "",
    desctdate: new Date(),
    desctdesc: "",
    descttitle: "",
  });
  const [image, setImage] = useState(null);
  const [showUploadedImage, setShowUploadedImage] = useState("");
  const [duration, setDuration] = useState(0);
  const [addDest, setAddDest] = useState(false);
  const [isImageUploaded, setIsImageUploaded] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    desc: "",
    price: "",
    duration: "",
    startDate: "",
    endDate: "",
    location: "",
    maxGroupSize: "",
    difficulty: "",
    ratingAverage: "12",
    ratingsQuantity: "12",
    guides: user._id,
    age: "",
    imageUrl: "",
    destinations: [],
  });
  const handleChange = (event) => {
    const { name, value } = event.target;
    console.log(name, value);
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    if (name === "endDate") {
      setDuration(calculateDuration(formData.startDate, formData.endDate));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await fetch(BASE_URL + "/createtour", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    }).then((res) => {
      if (res.ok) {
        toastify("Tour created successfully ✨✨");
        setTimeout(() => {
          navigate("/mytours");
        }, 4000);
      }
      console.log(res);
    });
    console.log(formData);
  };

  const handleDestinationImage = async () => {
    console.log("HII");
    const storage = getStorage(app);
    const fileName = new Date().getTime() + destination.destimg.name; // So no two users have same file
    const storageRef = ref(storage, fileName); //location+filename
    const uploadTask = uploadBytesResumable(storageRef, destination.destimg); //finalStep
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      },
      (err) => {
        console.log(true);
        toastify("Error uploading image", true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
          setDestination({ ...destination, destimg: downloadUrl });
          console.log(downloadUrl);
          toastify("Image uploaded successfully ");
        });
      }
    );
  };
  const handleFileUpload = async () => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + image.name; // So no two users have same file
    const storageRef = ref(storage, fileName); //location+filename
    const uploadTask = uploadBytesResumable(storageRef, image); //finalStep
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      },
      (err) => {
        console.log(true);
        setIsImageUploaded(false);
        toastify("Error uploading image", true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
          setIsImageUploaded(true);
          console.log(downloadUrl);
          setFormData({ ...formData, imageUrl: downloadUrl });
          setShowUploadedImage(downloadUrl);
          toastify("Image uploaded successfully ");
        });
      }
    );
  };

  const handleDestinationForm = (e) => {
    console.log(e.target.name, e.target.value, e.target.type);
    if (e.target.type === "file") {
      setDestination((prev) => ({
        ...prev,
        [e.target.name]: e.target.files[0],
      }));
    } else {
      setDestination((prev) => ({
        ...prev,
        [e.target.name]: e.target.value,
      }));
    }
  };

  const handleDestination = () => {
    console.log(destination);
    setFormData((prevState) => ({
      ...prevState,
      destinations: [
        {
          ...destination,
        },
        ...prevState.destinations,
      ],
    }));
    setDestination({
      destimg: "",
      desctdate: new Date(),
      desctdesc: "",
      descttitle: "",
    });
    console.log(formData);
  };

  const calculateDuration = (start, end) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const timeDiff = endDate - startDate;
    const daysDiff = timeDiff / (1000 * 60 * 60 * 24);
    console.log(daysDiff);
    return daysDiff;
  };
  return (
    <>
      <ToastContainer />
      <section className="bg-white dark:bg-gray-900 border-b-2 border-blue-700">
        <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
          <h2 className="my-4 text-xl font-bold text-gray-900 dark:text-white">
            Add a new tour
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
              <div className="">
                {isImageUploaded && <img src={showUploadedImage} />}
                <input
                  type="file"
                  className="p-3 rounded-lg border-none bg-transparent text-white text-lg my-4"
                  onChange={(e) => {
                    setImage(e.target.files[0]);
                  }}
                />

                {isImageUploaded ? (
                  <div className="cursor-not-allowed w-full border-4 border-dotted border-blue-400 p-3 text-white font-semibold text-xl">
                    Image Uploaded
                  </div>
                ) : (
                  <button
                    type="button"
                    className=" w-full border-4 border-dotted border-blue-400 p-3 text-white font-semibold text-xl"
                    onClick={handleFileUpload}
                  >
                    Upload
                  </button>
                )}
              </div>
              <motion.div
                whileInView={{ opacity: [0, 1] }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="sm:col-span-2"
              >
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Tour Name
                </label>
                <input
                  type="text"
                  name="title"
                  id="name"
                  value={formData.title}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Type tour name"
                  required="true"
                />
              </motion.div>
              <motion.div
                whileInView={{ opacity: [0, 1] }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="w-full"
              >
                <label
                  htmlFor="location"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Location
                </label>

                <input
                  type="text"
                  name="location"
                  id="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="location"
                  required="true"
                />
              </motion.div>
              <motion.div
                whileInView={{ opacity: [0, 1] }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="w-full"
              >
                <label
                  htmlFor="price"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Price
                </label>
                <input
                  type="number"
                  name="price"
                  id="price"
                  value={formData.price}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="$2999"
                  required="true"
                />
              </motion.div>
              <motion.div
                whileInView={{ opacity: [0, 1] }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              >
                <label
                  htmlFor="category"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Age
                </label>
                <select
                  id="age"
                  name="age"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  value={formData.age}
                  onChange={handleChange}
                >
                  <option selected="">Select Age</option>
                  <option value="<18">{`<18`}</option>
                  <option value="18-25">18-25</option>
                  <option value="25-30">25-30</option>
                  <option value="all">All</option>
                </select>
              </motion.div>
              <motion.div
                whileInView={{ opacity: [0, 1] }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              >
                <label
                  htmlFor="difficulty"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Difficulty
                </label>
                <select
                  id="difficulty"
                  name="difficulty"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  value={formData.difficulty}
                  onChange={handleChange}
                >
                  <option selected="">Select difficulty</option>
                  <option value="beginner">Beginner</option>
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                </select>
              </motion.div>
              <motion.div
                whileInView={{ opacity: [0, 1] }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              >
                <label
                  htmlFor="duration"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Duration
                </label>
                <input
                  type="number"
                  name="duration"
                  id="duration"
                  max={duration ? duration : 2}
                  disabled={
                    formData.startDate === "" || formData.endDate === ""
                  }
                  value={formData.duration}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Select start and end dates"
                  required
                />
              </motion.div>
              <motion.div
                whileInView={{ opacity: [0, 1] }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              >
                <label
                  htmlFor="groupsize"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Group Size
                </label>
                <input
                  type="number"
                  name="maxGroupSize"
                  id="groupsize"
                  value={formData.maxGroupSize}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="12"
                  required="true"
                />
              </motion.div>
              <motion.div
                whileInView={{ opacity: [0, 1] }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              >
                <label
                  htmlFor="startDate"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Start date
                </label>
                <input
                  type="date"
                  name="startDate"
                  id="item-weight"
                  value={formData.startDate}
                  min={today}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="12"
                  required=""
                />
              </motion.div>
              <motion.div
                whileInView={{ opacity: [0, 1] }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              >
                <label
                  htmlFor="endDate"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  End date
                </label>
                <input
                  type="date"
                  name="endDate"
                  id="endDate"
                  min={formData.startDate}
                  value={formData.endDate}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="12"
                  required=""
                />
              </motion.div>
              <motion.div
                whileInView={{ opacity: [0, 1] }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="sm:col-span-2"
              >
                <label
                  htmlFor="description"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  rows="8"
                  name="desc"
                  value={formData.desc}
                  onChange={handleChange}
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Your description here"
                ></textarea>
              </motion.div>

              {/* DESTINATION FORM */}
              {addDest && (
                <div className="">
                  <motion.div
                    whileInView={{ opacity: [0, 1] }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                  >
                    <label
                      htmlFor="destimg"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Destination Image
                    </label>
                    <input
                      type="file"
                      name="destimg"
                      id="destimg"
                      onChange={(e) => {
                        handleDestinationForm(e);
                      }}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="12"
                      required=""
                    />
                    <div
                      className="inline-flex items-center px-5 py-2.5 my-2 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 border hover:bg-primary-800 cursor-pointer hover:bg-blue-400 hover:text-white hover:rounded-none hover:border-black duration-500 delay-100 ease-in-out"
                      onClick={() => {
                        handleDestinationImage();
                      }}
                    >
                      Add Image
                    </div>
                  </motion.div>
                  <motion.div
                    whileInView={{ opacity: [0, 1] }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                  >
                    <label
                      htmlFor="descttitle"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Destination Title
                    </label>
                    <input
                      type="text"
                      name="descttitle"
                      id="descttitle"
                      value={destination.descttitle}
                      onChange={(e) => {
                        handleDestinationForm(e);
                      }}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Desctination Title"
                      required
                    />
                  </motion.div>
                  <motion.div
                    whileInView={{ opacity: [0, 1] }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                  >
                    <label
                      htmlFor="descdate"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Destination Date
                    </label>
                    <input
                      type="date"
                      name="desctdate"
                      id="desctdate"
                      min={formData.startDate}
                      max={formData.endDate}
                      value={destination.desctdate}
                      onChange={(e) => {
                        handleDestinationForm(e);
                      }}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      required
                    />
                  </motion.div>
                  <motion.div
                    whileInView={{ opacity: [0, 1] }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                  >
                    <label
                      htmlFor="desctdesc"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Destination Description
                    </label>
                    <input
                      type="test"
                      name="desctdesc"
                      id="desctdesc"
                      value={destination.desctdesc}
                      onChange={(e) => {
                        handleDestinationForm(e);
                      }}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Destination Description...."
                      required=""
                    />
                  </motion.div>
                  <motion.div
                    whileInView={{ opacity: [0, 1] }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="inline-flex items-center px-5 py-2.5 my-2 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 border hover:bg-primary-800 cursor-pointer hover:bg-blue-400 hover:text-white hover:rounded-none hover:border-black duration-500 delay-100 ease-in-out"
                    onClick={handleDestination}
                  >
                    Save
                  </motion.div>
                </div>
              )}
            </div>
            <motion.button
              whileInView={{ opacity: [0, 1] }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              type="button"
              onClick={() => setAddDest(!addDest)}
              className="inline-flex items-center px-5 py-2.5 my-2 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 border hover:bg-primary-800 cursor-pointer hover:bg-blue-400 hover:text-white hover:rounded-none hover:border-black duration-500 delay-100 ease-in-out"
            >
              {addDest ? "Save Destinations" : "Add Destinations"}
            </motion.button>
            <br />
            <motion.div
              className=""
              whileInView={{ opacity: [0, 1] }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              <button
                type="submit"
                className=" items-center px-5 py-2.5 my-2 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 border hover:bg-primary-800 cursor-pointer hover:bg-blue-400 hover:text-white hover:rounded-none hover:border-black duration-500 delay-100 ease-in-out w-full"
              >
                Add Tour
              </button>
            </motion.div>
          </form>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default CreateTour;
