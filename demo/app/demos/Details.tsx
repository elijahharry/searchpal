import { cx } from "@/util/cx";
import type { Primate, Status } from "@data/primates";
import { capitalize, memoize } from "amenities";
import { Avatar } from "./Image";

type StatusMap<T> = Record<Status, T>;

const statusClass: StatusMap<string> = {
  ce: cx("bg-red-50 text-red-800 dark:bg-red-900 dark:text-red-50"),
  e: cx("bg-orange-50 text-red-800 dark:bg-red-900 dark:text-orange-50"),
  v: cx("bg-yellow-50 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-50"),
  lc: cx("bg-green-50 text-green-800 dark:bg-green-900 dark:text-green-50"),
};

const statusLabel: StatusMap<string> = {
  ce: "Critically Endangered",
  e: "Endangered",
  v: "Vulnerable",
  lc: "Least Concern",
};

const titleCase = memoize((str: string) => {
  return str.split(/(\s+)/).map(capitalize).join("");
});

const Details = ({
  onSubmit,
  image,
  name,
  genera,
  family,
  description,
  status,
  wiki,
}: Primate & {
  onSubmit?: () => void;
}) => {
  const details: [string, string?][] = [
    [titleCase(genera + " " + family), "text-gray-500 dark:text-gray-200"],
    [statusLabel[status], statusClass[status]],
  ];

  return (
    <div className="border-t border-l dark:border-zinc-700 basis-1/2 flex flex-col">
      <div className="border-b dark:border-zinc-700 p-3 flex-grow flex flex-col items-center justify-center gap-2">
        <Avatar src={image} className="size-24 shadow-sm" />
        <span className="text-lg text-center font-semibold">{name}</span>
        <ul className="flex gap-1">
          {details.map(([detail, className], i) => (
            <span
              key={i}
              className={cx(className, "text-xs", "px-1.5 py-0.5 rounded-full")}
            >
              {detail}
            </span>
          ))}
        </ul>
      </div>
      <div className="p-3 space-y-3">
        <p className="text-sm block text-gray-500 dark:text-gray-200 text-pretty">
          {description}{" "}
          <a
            href={wiki}
            target="_blank"
            rel="noreferrer"
            className="text-emerald-700 whitespace-nowrap dark:text-emerald-600"
          >
            Learn more
          </a>
        </p>
        <button
          onClick={onSubmit}
          className="block w-full bg-emerald-700 hover:bg-emerald-800 font-medium text-white flex-1 text-center rounded-md px-2 py-1.5"
        >
          Select
        </button>
      </div>
    </div>
  );
};

export { Details };
