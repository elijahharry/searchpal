"use client";

import { useState } from "react";
import * as Search from "searchpal";
import { getPrimates, Primate } from "@data/actions";
import Image from "next/image";

export function Client() {
  const { items, inputProps } = Search.useQuery((query) => getPrimates(query), {
    debounce: 200,
  });

  const [open, setOpen] = useState(false);

  return (
    <Search.Root open={open} setOpen={setOpen}>
      <Search.Trigger>
        <button>Open Search</button>
      </Search.Trigger>
      <Search.Portal className="no-preflight">
        <Search.Backdrop />
        <Search.Container>
          <Search.Panel className="w-full max-w-lg">
            <Search.Input
              placeholder="Search for primates..."
              className="px-5 py-4"
              {...inputProps}
            />
            <div className="flex">
              <Search.Results className="p-2 border border-solid border-gray-200 border-x-0 border-b-0 flex-1 basis-1/2">
                {items.map((primate) => (
                  <Search.Option
                    key={primate.id}
                    id={primate.id}
                    data={primate}
                    className="flex items-center gap-2"
                  >
                    <Image
                      src={primate.image}
                      alt=""
                      width={25}
                      height={25}
                      className="block bg-gray-500/10 rounded-full"
                    />
                    <span className="text-lg">{primate.name}</span>
                  </Search.Option>
                ))}
              </Search.Results>
              <Search.Consumer<Primate>>
                {({ selected }) => {
                  if (!(selected && window.innerWidth > 768)) return null;

                  const primate = selected.data!;

                  return (
                    <div className="basis-1/2 border border-solid border-gray-200 border-r-0 border-b-0 min-h-[300px] flex flex-col">
                      <div className="flex-grow p-5">
                        <div className="aspect-square w-full relative border-b">
                          <Image src={primate.image} alt="" fill />
                        </div>
                      </div>
                    </div>
                  );
                }}
              </Search.Consumer>
            </div>
          </Search.Panel>
        </Search.Container>
      </Search.Portal>
    </Search.Root>
  );
}
