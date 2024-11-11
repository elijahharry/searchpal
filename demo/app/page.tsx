import { getPrimateGroups, getPrimates } from "@data/actions";
import { OptionSearch } from "./demos/OptionSearch";
import { GroupSearch } from "./demos/GroupSearch";
import { ReactNode } from "react";
import { description, name } from "./package";

export default async function Home() {
  const demos: {
    label: string;
    description?: string;
    initial?: any[];
    demo: React.FC<{ initial?: any[]; children: ReactNode }>;
    source: string;
  }[] = [
    {
      label: "Basic Search",
      description: "Displays search results in a list.",
      initial: await getPrimates(""),
      demo: OptionSearch,
      source: "demos/OptionSearch.tsx",
    },
    {
      label: "Group Search",
      description: "Groups search results by category.",
      initial: await getPrimateGroups("ape", 7),
      demo: GroupSearch,
      source: "demos/GroupSearch.tsx",
    },
  ];

  return (
    <main className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold text-center">{name}</h1>
      <p className="max-w-[300px] text-center mt-1 text-gray-500 dark:text-gray-300">
        {description}
      </p>
      <div
        className="flex flex-col items-stretch space-y-3.5 mt-5"
        style={{
          paddingBottom: 100,
        }}
      >
        {demos.map(({ label, description, initial, demo: Demo }) => (
          <Demo initial={initial} key={label}>
            <div
              key={label}
              className="flex gap-5 items-start border rounded-lg p-3 hover:bg-gray-50 dark:border-zinc-700 dark:hover:bg-zinc-900"
              role="button"
              tabIndex={0}
            >
              <div className="flex-grow">
                <span className="text-lg font-bold">{label}</span>
                <p className="text-sm dark:text-gray-300">{description}</p>
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="18"
                height="18"
                fill="currentColor"
                className="text-gray-500 dark:text-gray-400"
              >
                <path d="M16.0037 9.41421L7.39712 18.0208L5.98291 16.6066L14.5895 8H7.00373V6H18.0037V17H16.0037V9.41421Z" />
              </svg>
            </div>
          </Demo>
        ))}
      </div>
    </main>
  );
}
