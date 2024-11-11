import { useState } from "react";
import {
  Root,
  Option,
  Portal,
  Panel,
  Trigger,
  Backdrop,
  Input,
  Results,
  TriggerChildCallback,
  Container,
  OptionInput,
  useQuery,
  Consumer,
} from "searchpal-lib";

import {
  forEntries,
  isArray,
  isFunction,
  isObject,
  isString,
  memoize,
  regex,
} from "amenities";

export type SearchSpecProps<P = {}> = {
  initialOpen?: boolean;
  children?: React.ReactNode;
  siblings?: React.ReactNode;
  trigger?: string | TriggerChildCallback;
  id?: string;
  backdropId?: string;
} & P;

export type SearchOption = OptionInput & {
  label: string;
};

export const Search = ({
  initialOpen,
  children,
  trigger,
  id,
  siblings,
  backdropId,
}: SearchSpecProps) => {
  const [open, setOpen] = useState(!!initialOpen);

  return (
    <>
      <Root
        open={open}
        setOpen={setOpen}
        onChange={(option) => {
          console.log(option ? `Selected: ${option.id}` : "Unselected");
        }}
        onSubmit={(option, search) => {
          console.log(`Submitted: ${option.id}`);
          search.close();
        }}
      >
        <Trigger>
          {isFunction(trigger) ? (
            trigger
          ) : (
            <button id={trigger}>Open search</button>
          )}
        </Trigger>
        <Backdrop id={backdropId} />
        <Portal id={id}>
          <Container>
            <Panel>{children}</Panel>
          </Container>
        </Portal>
      </Root>
      {siblings}
    </>
  );
};

const getKeywords = memoize((option: SearchOption) => {
  const keywords = new Set<string>();
  const visit = (node: any) => {
    if (isObject(node)) {
      if (isArray(node)) return node.forEach(visit);
      return forEntries(node, ([, value]) => visit(value));
    }
    if (isString(node)) {
      keywords.add(node);
      node.split(/\s+/).forEach((word) => keywords.add(word));
    }
  };
  visit(option.data);
  return { ...option, keywords: Array.from(keywords) };
});

const getQueryScorer = memoize((query: string) => {
  const match = regex(["\\b", regex.escape(query), "\\b"]);
  return ({ id, data, label, keywords }: ReturnType<typeof getKeywords>) => {
    const score = keywords.filter((word) => match.test(word)).length;
    return { id, data, label, score };
  };
});

export const searchOptions = (options: SearchOption[], query: string) => {
  if (!query) return [];
  const score = getQueryScorer(query);
  return options
    .map(getKeywords)
    .map(score)
    .sort((a, b) => b.score - a.score)
    .slice(0, 6);
};

export type FilterSearchProps<P = {}> = SearchSpecProps<
  {
    options: SearchOption[];
    inputId?: string;
    initialQuery?: string;
    children?: React.ReactNode;
    defaultOptions?: SearchOption[];
  } & P
>;

export const FilterSearch = ({
  options = [],
  inputId,
  initialQuery,
  children,
  defaultOptions = [],
  ...props
}: FilterSearchProps) => {
  const [query, setQuery] = useState(initialQuery || "");

  let results = query.length ? searchOptions(options, query) : defaultOptions;

  return (
    <Search {...props}>
      <Input
        id={inputId}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <Results>
        {results.map((option) => (
          <Option id={option.id} key={option.id} data={option}>
            {option.label}
          </Option>
        ))}
      </Results>
      {children}
    </Search>
  );
};

export const QueryHookSearch = ({
  children,
  options,
  inputId,
  initialQuery,
  debounce,
  defaultOptions,
  ...props
}: SearchSpecProps<{
  debounce?: number;
  options: SearchOption[];
  inputId?: string;
  initialQuery?: string;
  children?: React.ReactNode;
  defaultOptions?: SearchOption[];
}>) => {
  const { results, inputProps } = useQuery(
    (query) => searchOptions(options, query),
    {
      initialQuery,
      debounce: debounce || 300,
      initialResults: defaultOptions,
    }
  );

  return (
    <Search {...props}>
      <Input id={inputId} {...inputProps} />
      <Results>
        {results.map((option) => (
          <Option id={option.id} key={option.id} data={option}>
            {option.label}
          </Option>
        ))}
      </Results>
      {children}
    </Search>
  );
};

export const ConsumerSearch = ({
  children,
  consumerId,
  ...props
}: FilterSearchProps<{
  consumerId?: string;
}>) => {
  return (
    <FilterSearch {...props}>
      {children}
      <Consumer>
        {({ selected }) => (
          <div id={consumerId} data-consumer="true">
            {selected ? selected.id : ""}
          </div>
        )}
      </Consumer>
    </FilterSearch>
  );
};
