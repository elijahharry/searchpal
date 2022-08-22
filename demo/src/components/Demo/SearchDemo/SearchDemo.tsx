import { PropsWithChildren, ReactNode } from "react";
import { Search as SearchPal, SearchProps, Detail } from "searchpal";
import { useDemos, DemoId } from "../../../context";
import { users, SampleUser } from "../../../../constants/users";
import { ReactElement } from "react";

export type SearchDemoProps = Omit<SearchProps, "open" | "onClose" | "id"> & {
  id: DemoId;
  getOption: ({
    user,
    props,
    children,
  }: {
    user: SampleUser;
    props: {
      key: string;
      label: string;
      keywords: string[];
      img: { src: string; alt?: string };
    };
    children: ReactNode;
  }) => ReactElement<any>;
};

export const SearchDemo = ({
  children,
  id,
  getOption,
  ...props
}: PropsWithChildren<SearchDemoProps>) => {
  const { demo, closeDemo } = useDemos();

  return (
    <SearchPal open={demo === id} onClose={closeDemo} {...props}>
      {users.map((user) =>
        getOption({
          user,
          props: {
            keywords: [user.email],
            label: user.name,
            key: user.id,
            img: { src: user.avatar },
          },
          children: (
            <>
              <Detail label="Joined" value={user.joined} />
            </>
          ),
        })
      )}
      {children}
    </SearchPal>
  );
};
