const HeadingWrapper = ({ heading }) => {
  return (
    <div className="flex items-center justify-center my-4">
    <div className="border-b-4 border-blue-700 text-2xl m-4 text-white font-bold">
      {heading}
    </div>
  </div>
  );
};

export default HeadingWrapper;
