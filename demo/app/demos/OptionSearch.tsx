"use client";
import { getPrimates, Primate } from "@data/actions";
import {
  Backdrop,
  Consumer,
  Container,
  Input,
  Option,
  Panel,
  Portal,
  Results,
  Root,
  Trigger,
  useQuery,
  useSearch,
} from "searchpal";
import { SearchIcon, ArrowIcon } from "./icons";
import { useState } from "react";
import { Avatar } from "./Image";
import { StaticImageData } from "next/image";
import { Details } from "./Details";
import { useScreenWidth } from "./useScreenWidth";

export function OptionSearch({
  initial,
  children,
}: {
  initial?: Primate<StaticImageData>[];
  children?: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  const { items, inputProps, isLoading, isNotFound, reset } = useQuery(
    (query) => getPrimates(query, 8),
    {
      debounce: 200,
      format: (query) => query.trim(),
      initialItems: initial,
    }
  );

  const width = useScreenWidth();

  return (
    <Root<Primate>
      open={open}
      setOpen={setOpen}
      onSubmit={(option, search) => {
        const primate = option.data!;
        window.alert(`You selected ${primate.name}.`);
        search.close();
      }}
      onClose={() => reset()}
    >
      <Trigger>{children}</Trigger>
      <Portal>
        <Backdrop />
        <Container>
          <Panel className="w-full max-w-2xl">
            <div className="flex items-center pl-3">
              <SearchIcon isLoading={isLoading} />
              <Input
                placeholder="Search for primates..."
                className="px-3 py-3.5 focus:outline-none"
                {...inputProps}
              />
            </div>
            <div className="flex">
              <Results className="p-3 border-t dark:border-zinc-700 basis-1/2 flex-grow">
                {items.map((primate) => (
                  <Option
                    key={primate.id}
                    id={primate.id}
                    data={primate}
                    className="flex items-center gap-2 rounded-md"
                  >
                    <Avatar src={primate.image} />
                    <span className="flex-grow">{primate.name}</span>
                    <ArrowIcon />
                  </Option>
                ))}
              </Results>
              {isNotFound && (
                <div className="px-3 py-6 border-t dark:border-zinc-700 flex flex-col items-center gap-1 w-full">
                  <span className="font-medium">No primates found</span>
                  <span className="text-sm text-gray-500">
                    Try searching for an ape or monkey
                  </span>
                </div>
              )}
              <Consumer<Primate>>
                {({ selected, submit }) => {
                  if (!(selected && width > 768)) return;
                  const primate = selected.data!;
                  return (
                    <Details {...primate} onSubmit={() => submit(primate.id)} />
                  );
                }}
              </Consumer>
            </div>
          </Panel>
        </Container>
      </Portal>
    </Root>
  );
}
