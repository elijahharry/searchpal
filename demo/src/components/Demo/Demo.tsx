// import { SearchProps } from "searchpal";
import { Prism } from "@mantine/prism";
import { ReactNode } from "react";

import { useDemos } from "../../context";
import { SearchDemo, SearchDemoProps } from "./SearchDemo";

import { FaSearch } from "react-icons/fa";

import { FaArrowRight } from "react-icons/fa";

export type DemoProps = SearchDemoProps & {
  title: string;
  description: ReactNode;
  code: string;
  documentation?: string;
  flipped?: boolean;
};

export const Demo = ({
  id,
  title,
  code,
  description,
  documentation,
  flipped,
  ...props
}: DemoProps) => {
  const { openDemo } = useDemos();

  return (
    <>
      <section
        id={`demo-${id}`}
        className="py-12 ctn border-t first:border-t-0 dark:border-gray-700"
      >
        <div
          className={[
            "flex flex-col lg:-mx-4",
            flipped ? "lg:flex-row-reverse" : "lg:flex-row ",
          ].join(" ")}
        >
          <div className="basis-6/12 relative pb-10 lg:py-3">
            <div className="space-y-5 lg:px-4 sticky left-0 top-6">
              <h4 className="font-semibold text-3xl">{title}</h4>
              <p>{description}</p>
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => openDemo(id)}
                  className="text-lg px-4 py-3 bg-blue-400/20 hover:bg-blue-400/30 focus:bg-blue-400 transition-all focus:text-blue-200 hover:text-blue-600 rounded-xl text-blue-500 font-bold inline-flex items-center"
                >
                  Open Demo
                  {/* <FaSearch className="ml-2 -scale-x-100" size={16} /> */}
                </button>
                {documentation && (
                  <a
                    href={documentation}
                    target="_blank"
                    className="text-blue-500 font-bold inline-flex items-center"
                  >
                    Learn more <FaArrowRight size={13} className="ml-1.5" />
                  </a>
                )}
              </div>
            </div>
          </div>
          <div className="basis-6/12 lg:px-4">
            <Prism language="tsx" withLineNumbers>
              {code}
            </Prism>
          </div>
        </div>
      </section>
      <SearchDemo id={id} {...props} />
    </>
  );
};
