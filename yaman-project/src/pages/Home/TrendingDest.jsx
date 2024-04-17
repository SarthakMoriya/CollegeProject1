import p1 from "../../assets/trendingDest/amritsar.jpg";
import p5 from "../../assets/trendingDest/bangalore.jpg";
import p4 from "../../assets/trendingDest/chennai.jpg";
import p3 from "../../assets/trendingDest/delhi.jpg";
import p2 from "../../assets/trendingDest/mumbai.jpg";
const TrendingDest = () => {
  const destinations = [
    { img: p1, title: "amritsar", id: 10 },
    { img: p2, title: "mumbai", id: 11 },
    { img: p3, title: "delhi", id: 12 },
    { img: p4, title: "chennai", id: 13 },
    { img: p5, title: "bangalore", id: 14 },
  ];
  return (
    <div className="flex items-center justify-center flex-col">
      <div className="flex items-center justify-center gap-4 w-3/4">
        <div className="flex items-center justify-center w-1/2 h-1/3 rounded-md relative">
          <div className="absolute top-3 left-5 text-2xl font-bold text-white capitalize">
            {destinations[0].title}
          </div>
          <img
            src={destinations[0].img}
            alt=""
            className="w-full h-64 rounded-md"
          />
        </div>
        <div className="flex items-center justify-center w-1/2 h-1/3 relative">
          <div className="absolute top-3 left-5 text-2xl font-bold text-white capitalize">
            {destinations[1].title}
          </div>
          <img
            src={destinations[1].img}
            alt=""
            className="w-full h-64 rounded-md"
          />
        </div>
      </div>
      <br />
      <div className=" flex items-center justify-center gap-4">
        {destinations.slice(2, destinations.length).map((dest) => {
          return (
            <div
              className="flex items-center justify-center w-1/2 h-1/3 relative"
              key={dest.id}
            >
              <div className="absolute top-3 left-5 text-2xl font-bold text-white capitalize">
                {dest.title}
              </div>
              <img src={dest.img} alt="" className="w-full h-64 rounded-md" />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TrendingDest;
