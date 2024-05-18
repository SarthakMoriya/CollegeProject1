/* eslint-disable react/prop-types */
const TourGuideCard = ({ guide }) => {
  return (
    <div className="max-w-sm mx-auto rounded overflow-hidden shadow-lg bg-white p-6">
      <div className="flex justify-center">
        <img
          className="w-24 h-24 rounded-full object-cover"
          src="https://th.bing.com/th/id/OIP.IGNf7GuQaCqz_RPq5wCkPgAAAA?rs=1&pid=ImgDetMain"
          alt={guide?.email?.split("@")[0]}
        />
      </div>
      <div className="text-center mt-4">
        <div className="font-bold text-xl mb-2">
          {guide?.email?.split("@")[0]}
        </div>
        <p className="text-gray-700 text-base mb-2">
          <span className="font-semibold">Phone:</span> +91 {guide?.phoneno}
        </p>
        <p className="text-gray-700 text-base mb-4 lowercase">
          <span className="font-semibold">Email:</span> {guide?.email}
        </p>
        <a
          href={`tel:${guide.phoneno}`}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Call
        </a>
      </div>
    </div>
  );
};

export default TourGuideCard;
