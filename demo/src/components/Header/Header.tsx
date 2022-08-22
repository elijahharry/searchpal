import Head from "next/head";
import { Image } from "../Image";
import { IoIosArrowForward } from "react-icons/io";

const Header = () => {
  return (
    <>
      <Head>
        <title>searchpal 🔎 elijah harry</title>
        <meta
          name="description"
          content="Search 'palette' component for React, inspired by MacOS Spotlight Search. Good-lookin' & customizable. Autocomplete, search previews & more. Set to find exact and/or fuzzy matches."
        />
      </Head>
      <header className="overflow-hidden relative bg-blue-400/5 bg-gradient-to-br from-blue-300/5 to-blue-300/20 w-full">
        <div className="ctn py-24 flex-col md:flex-row items-center flex justify-between space-y-4 md:space-y-0 md:space-x-6">
          <div className="col-span-4 max-w-2xl text-center md:text-left space-y-5">
            <a
              className="font-semi-bold font-semibold text-blue-500 space-x-4"
              href="https://www.npmjs.com/package/searchpal"
              target="_blank"
            >
              <span className="bg-blue-400/30 dark:bg-blue-900/40 px-2 py-1 rounded-lg">
                npm
              </span>
              <span className="inline-flex items-center">
                Latest version 1.0.7{" "}
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
          <figure className="relative w-72 h-72 border-4 border-white shadow-xl shadow-blue-900/20 rounded-full flex-shrink-0">
            <Image src="logo.gif" alt="searchpal preview" />
          </figure>
        </div>
      </header>
    </>
  );
};

export default Header;
