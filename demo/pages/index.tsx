import type { NextPage } from "next";

import { Demo } from "../src/components/Demo";
import { Demos } from "../src/components/Demos";
import Header from "../src/components/Header/Header";

const Home: NextPage = () => {
  return (
    <>
      <Header />
      <Demos />
      <div className="mx-auto pb-10 ctn">
        <h6 className="text-center text-lg text-gray-300 font-semibold italic">
          More coming soon...
        </h6>
      </div>
    </>
  );
};

export default Home;
