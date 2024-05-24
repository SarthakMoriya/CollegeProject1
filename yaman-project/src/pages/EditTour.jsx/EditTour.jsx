import { useEffect, useState } from "react";
import { BASE_URL, toastify } from "../../../utils";
import { useSelector } from "react-redux";
import Footer from "../../components/Footer";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { app } from "../../firebase";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";

const EditTour = () => {
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const params = useParams();
  const [tour, setTour] = useState(null);
  const [image, setImage] = useState(null);
  const [destinations, setDestinations] = useState([]);
  const [isImageUploaded, setIsImageUploaded] = useState(false);
  const [showUploadedImage, setShowUploadedImage] = useState("");
  const [formData, setFormData] = useState({
    _id: "",
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
    destinations: "",
    imageUrl: "",
  });
  const fetchTour = async () => {
    await fetch(`${BASE_URL}/gettour/${params.id}`)
      .then(async (res) => {
        if (res.ok) {
          let data = await res.json();
          if (res.ok) {
            setTour(data.tour);
            setFormData(data.tour);
            setDestinations(data?.tour?.destinations);
            setShowUploadedImage(data?.tour?.imageUrl);
            setIsImageUploaded(true);
            console.log(data.tour);
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDestinationForm = (e, i) => {
    console.log(e.target.id, e.target.value);
    let oldDestinations = destinations;
    oldDestinations[i] = {
      ...oldDestinations[i],
      [e.target.id]: e.target.value,
    };
    setDestinations(oldDestinations);
    console.log(destinations);
  };

  const handleDestinationsFinal = () => {
    setFormData((prev) => ({ ...prev, destinations: destinations }));
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await fetch(BASE_URL + "/updatetour", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((res) => {
        if (res.ok) {
          toastify("Tour updated successfully 🎊");
          setTimeout(() => {
            navigate("/");
          }, 2000);
        }
      })
      .catch((err) => {
        console.log(err);
        toastify("Error updating tour 💣", true);
      });
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
  useEffect(() => {
    fetchTour();
  }, []);
  return (
    <>
      <ToastContainer />
      <section className="bg-white dark:bg-gray-900 border-b-2 border-blue-700">
        <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
          <h2 className="my-4 text-xl font-bold text-white ">Update Tour</h2>
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

                <button
                  type="button"
                  className=" w-full border-4 border-dotted border-blue-400 p-3 text-white font-semibold text-xl"
                  onClick={handleFileUpload}
                >
                  Upload
                </button>
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-white "
                >
                  Tour Name
                </label>
                <input
                  type="text"
                  name="title"
                  id="name"
                  defaultValue={tour?.title}
                  value={formData.title}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-white text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Type tour name"
                  required="true"
                />
              </div>
              <div className="w-full">
                <label
                  htmlFor="location"
                  className="block mb-2 text-sm font-medium text-white "
                >
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  id="location"
                  value={formData.location}
                  defaultValue={tour?.location}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-white text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="location"
                  required="true"
                />
              </div>
              <div className="w-full">
                <label
                  htmlFor="price"
                  className="block mb-2 text-sm font-medium text-white "
                >
                  Price
                </label>
                <input
                  type="number"
                  name="price"
                  id="price"
                  defaultValue={tour?.price}
                  value={formData.price}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-white text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="$2999"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="category"
                  className="block mb-2 text-sm font-medium text-white "
                >
                  Age
                </label>
                <select
                  id="age"
                  name="age"
                  className="bg-gray-50 border border-gray-300 text-white text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  value={formData.age}
                  onChange={handleChange}
                >
                  <option selected="">Select Age</option>
                  <option value="<18">{`<18`}</option>
                  <option value="18-25">18-25</option>
                  <option value="25-30">25-30</option>
                  <option value="all">All</option>
                </select>
              </div>
              <div>
                <label
                  htmlFor="difficulty"
                  className="block mb-2 text-sm font-medium text-white "
                >
                  Difficulty
                </label>
                <select
                  id="difficulty"
                  name="difficulty"
                  className="bg-gray-50 border border-gray-300 text-white text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  value={formData.difficulty}
                  onChange={handleChange}
                >
                  <option selected="">Select difficulty</option>
                  <option value="beginner">Beginner</option>
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                </select>
              </div>
              <div>
                <label
                  htmlFor="duration"
                  className="block mb-2 text-sm font-medium text-white "
                >
                  Duration
                </label>
                <input
                  type="number"
                  name="duration"
                  id="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-white text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="12"
                  required=""
                />
              </div>
              <div>
                <label
                  htmlFor="groupsize"
                  className="block mb-2 text-sm font-medium text-white "
                >
                  Group Size
                </label>
                <input
                  type="number"
                  name="maxGroupSize"
                  id="groupsize"
                  value={formData.maxGroupSize}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-white text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="12"
                  required="true"
                />
              </div>
              <div>
                <label
                  htmlFor="startDate"
                  className="block mb-2 text-sm font-medium text-white "
                >
                  Start date
                </label>
                <input
                  type="date"
                  name="startDate"
                  id="item-weight"
                  defaultValue={formData.startDate.slice(0, 10)}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-white text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="12"
                  required=""
                />
              </div>
              <div>
                <label
                  htmlFor="endDate"
                  className="block mb-2 text-sm font-medium text-white "
                >
                  End date
                </label>
                <input
                  type="date"
                  name="endDate"
                  id="endDate"
                  defaultValue={formData.endDate.slice(0, 10)}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-white text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="12"
                  required=""
                />
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="description"
                  className="block mb-2 text-sm font-medium text-white "
                >
                  Description
                </label>
                <textarea
                  id="description"
                  rows="8"
                  name="desc"
                  value={formData.desc}
                  onChange={handleChange}
                  className="block p-2.5 w-full text-sm text-white bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Your description here"
                ></textarea>
              </div>
            </div>
            <br />
            {destinations?.length &&
              destinations?.map((dest, i) => (
                <div key={i}>
                  <br />
                  <div className="">
                    <div>
                      <label
                        htmlFor="descttitle"
                        className="block mb-2 text-sm font-medium text-white "
                      >
                        Destination Title {i + 1}
                      </label>
                      <input
                        type="text"
                        name="descttitle"
                        id="descttitle"
                        defaultValue={dest.descttitle}
                        onChange={(e) => {
                          handleDestinationForm(e, i);
                        }}
                        className="bg-gray-50 border border-gray-300 text-white text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="12"
                        required=""
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="descdate"
                        className="block mb-2 text-sm font-medium text-white "
                      >
                        Destination Date
                      </label>
                      <input
                        type="date"
                        name="desctdate"
                        id="desctdate"
                        defaultValue={dest.desctdate}
                        onChange={(e) => {
                          handleDestinationForm(e, i);
                        }}
                        className="bg-gray-50 border border-gray-300 text-white text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="12"
                        required=""
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="desctdesc"
                        className="block mb-2 text-sm font-medium text-white "
                      >
                        Destination Description
                      </label>
                      <input
                        type="test"
                        name="desctdesc"
                        id="desctdesc"
                        defaultValue={dest.desctdesc}
                        onChange={(e) => {
                          handleDestinationForm(e, i);
                        }}
                        className="bg-gray-50 border border-gray-300 text-white text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="12"
                        required=""
                      />
                    </div>
                  </div>
                </div>
              ))}
            <button
              type="button"
              className=" items-center px-5 py-2.5 my-2 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 border hover:bg-primary-800 cursor-pointer hover:bg-blue-400 hover:text-black hover:rounded-none hover:border-black duration-500 delay-100 ease-in-out w-full"
              onClick={handleDestinationsFinal}
            >
              Save Destinations Data
            </button>
            <br />
            <button
              type="submit"
              className=" items-center px-5 py-2.5 my-2 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 border hover:bg-primary-800 cursor-pointer hover:bg-blue-400 hover:text-black hover:rounded-none hover:border-black duration-500 delay-100 ease-in-out w-full"
            >
              Update Tour
            </button>
          </form>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default EditTour;
