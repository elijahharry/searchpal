import { classes } from "hoolock";
import { SVGProps as ReactSVGProps } from "react";

type SVGProps = ReactSVGProps<SVGSVGElement>;

type IconDefinetion = ReactSVGProps<SVGPathElement>[];

const accent = "#059669";

const sizeProps = (size: string) => ({
  width: size,
  height: size,
});

const loadingIcon: IconDefinetion = [
  {
    opacity: "0.2",
    fillRule: "evenodd",
    clipRule: "evenodd",
    fill: "currentColor",
    d: "M12 19C15.866 19 19 15.866 19 12C19 8.13401 15.866 5 12 5C8.13401 5 5 8.13401 5 12C5 15.866 8.13401 19 12 19ZM12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z",
  },
  {
    fill: accent,
    d: "M2 12C2 6.47715 6.47715 2 12 2V5C8.13401 5 5 8.13401 5 12H2Z",
  },
];

const searchIcon: IconDefinetion = [
  {
    d: "M19.023 16.977a35.13 35.13 0 0 1-1.367-1.384c-.372-.378-.596-.653-.596-.653l-2.8-1.337A6.962 6.962 0 0 0 16 9c0-3.859-3.14-7-7-7S2 5.141 2 9s3.14 7 7 7c1.763 0 3.37-.66 4.603-1.739l1.337 2.8s.275.224.653.596c.387.363.896.854 1.384 1.367l1.358 1.392.604.646 2.121-2.121-.646-.604c-.379-.372-.885-.866-1.391-1.36zM9 14c-2.757 0-5-2.243-5-5s2.243-5 5-5 5 2.243 5 5-2.243 5-5 5z",
  },
];

const staticProps: SVGProps = {
  fill: "currentColor",
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  ...sizeProps("1.3em"),
  "aria-hidden": true,
};

const SearchIcon = ({ isLoading }: { isLoading?: boolean }) => {
  const paths = isLoading ? loadingIcon : searchIcon;

  const props: SVGProps = {
    ...staticProps,
    className: classes("text-gray-400", {
      "animate-spin": isLoading,
    }),
  };

  return (
    <svg {...props} aria-hidden>
      {paths.map((pathProps, i) => (
        <path key={i.toString()} {...pathProps} />
      ))}
    </svg>
  );
};

const ArrowIcon = () => {
  return (
    <svg {...staticProps} className="text-gray-400">
      <path d="M13.1717 12.0007L8.22192 7.05093L9.63614 5.63672L16.0001 12.0007L9.63614 18.3646L8.22192 16.9504L13.1717 12.0007Z" />
    </svg>
  );
};

export { SearchIcon, ArrowIcon };
