import type { NextPage, InferGetStaticPropsType } from "next";

import { Demos } from "../src/components/Demos";
import Header from "../src/components/Header/Header";

const Home: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  version,
}) => {
  return (
    <>
      <Header version={version} />
      <Demos />
      {version}
      <div className="mx-auto pb-10 ctn">
        <h6 className="text-center text-lg text-gray-300 font-semibold italic">
          More coming soon...
        </h6>
      </div>
    </>
  );
};

export default Home;

export const getStaticProps = async () => {
  try {
    const res = await fetch("https://registry.npmjs.org/searchpal", {
      method: "GET",
    });
    const pkg = await res.json();
    const version = pkg["dist-tags"]
      ? (pkg["dist-tags"].latest as string)
      : "1";
    return {
      props: {
        version,
        revalidate: 600,
      },
    };
  } catch (e) {
    return {
      props: {
        version: "1",
      },
      revalidate: 120,
    };
  }
};
