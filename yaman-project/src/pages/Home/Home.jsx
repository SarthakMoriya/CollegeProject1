import Footer from "../../components/Footer";
import SearchBar from "../../components/SearchBar";
import Todo from "./Todo";
import TrendingDest from "./TrendingDest";

const Home = () => {
  return (
    <div className=" w-full mx-auto absolute bg-slate-100">
      <br />
      <br />
      <br />
      <br />
      <SearchBar />
      <br />
      <div className=" flex flex-col items-center justify-start mx-6 my-6">
        <h3 className="font-bold text-2xl text-blue-600 border-b-4 border-slate-600">Destinations in India</h3>
      </div>
      <Todo />
      <br /><br />
      <div className=" flex flex-col items-center justify-start mx-6 my-6">
        <h3 className="font-bold text-2xl text-blue-600 border-b-4 border-slate-600">Popular Destinations</h3>
      </div>
      <TrendingDest />
      <br />
      <Footer/>
    </div>
  );
};

export default Home;
