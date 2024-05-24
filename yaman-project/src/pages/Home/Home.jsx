import Footer from "../../components/Footer";
import SearchBar from "../../components/SearchBar";
import Todo from "./Todo";
import TrendingDest from "./TrendingDest";
import HeadingWrapper from "../../components/HeadingWrapper";
import Newsletter from "../../components/Newsletter";
import HeroBanner from "./HeroBanner";

const Home = () => {
  return (
    <div className=" w-full mx-auto absolute ">
      <br />
      <br />
      <HeroBanner/>
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
      <Newsletter/>
      <Footer />
    </div>
  );
};

export default Home;
