import Head from "next/head";
import { Image } from "../Image";
import { IoIosArrowForward } from "react-icons/io";
import { Analytics } from "./Analytics";
import { useDarkMode } from "../../hooks";

const Header = ({ version }: { version: string }) => {
  const dark = useDarkMode();
  return (
    <>
      <Head>
        <title>searchpal 🔎 elijah harry</title>
        <meta
          name="description"
          content="Search 'palette' component for React, inspired by MacOS Spotlight Search. Good-lookin' & customizable. Autocomplete, search previews & more. Set to find exact and/or fuzzy matches."
        />
      </Head>
      <Analytics />
      <header className="overflow-hidden relative bg-blue-400/5 bg-gradient-to-br from-blue-300/5 to-blue-300/20 w-full">
        <div className="ctn py-24 flex-col md:flex-row items-center flex justify-between space-y-4 md:space-y-0 md:space-x-6">
          <div className="col-span-4 max-w-2xl text-center md:text-left space-y-5 pb-6 md:pb-0">
            <a
              className="font-semi-bold font-semibold text-blue-500 space-x-4"
              href="https://www.npmjs.com/package/searchpal"
              target="_blank"
            >
              <span className="bg-blue-400/30 dark:bg-blue-900/40 px-2 py-1 rounded-lg">
                npm
              </span>
              <span className="inline-flex items-center">
                Latest version {version}{" "}
                <IoIosArrowForward aria-hidden size={13} className="ml-2" />
              </span>
            </a>
            <h1 className="text-5xl font-semibold leading-12">
              Highly-customizable{" "}
              <span className="text-blue-500">search pal</span>
              ette component for React.
            </h1>
            <p>
              Good lookin' & customizable. Autocomplete, search previews & more.
              Set search function to find exact and/or fuzzy matches.
            </p>
          </div>
          <div className="w-full lg:w-2/5 relative lg:translate-y-7">
            <figure
              className="w-[calc(var(--width)*.4)] top-0 -right-20 h-[calc(var(--height)*.4)] xl:w-[calc(var(--width)*.72)] xl:h-[calc(var(--height)*.72)] absolute md:-top-16 xl:-top-[8.4rem] md:-left-5 rounded-lg lg:rounded-2xl overflow-hidden shadow-2xl shadow-blue-400/30 dark:shadow-gray-900/40"
              style={{ "--width": "1200px", "--height": "568px" } as any}
            >
              <div className="w-full h-full absolute top-0 left-0">
                <Image
                  src={dark ? "main-dark.jpg" : "main-light.jpg"}
                  alt="searchpal dark preview"
                />
              </div>
            </figure>
            <figure className="relative z-10 w-72 h-72 border-2 dark:border-1 rounded-full border-white shadow-2xl shadow-blue-400/30 rotate-6 dark:shadow-gray-900/40 flex-shrink-0 overflow-hidden -mb-10 mt-10 ml-10 lg:ml-14">
              <Image src="preview.gif" alt="searchpal mobile preview" />
            </figure>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
