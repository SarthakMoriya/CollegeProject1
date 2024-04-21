import Footer from "../../components/Footer";
import SearchBar from "../../components/SearchBar";
import Todo from "./Todo";
import TrendingDest from "./TrendingDest";
import HeadingWrapper from "../../components/HeadingWrapper";

const Home = () => {
  return (
    <div className=" w-full mx-auto absolute bg-gray-900">
      <br />
      <br />
      <br />
      <br />
      <SearchBar />
      <br />
      <HeadingWrapper heading={"Destinations in India"} />
      <Todo />
      <br />
      <br />
      <br />
      <br />
    <HeadingWrapper heading={"Popular Destinations"}/>
      <TrendingDest />
      <br />
      <Footer />
    </div>
  );
};

export default Home;
