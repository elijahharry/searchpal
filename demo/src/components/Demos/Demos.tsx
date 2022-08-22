import { Option } from "searchpal";
import { Demo, DemoProps } from "../Demo";

export const Demos = () => {
  return (
    <section id="demos">
      {/* <div className="ctn py-10">
        <h2 className="text-4xl font-semibold">
          See <span className="text-blue-500">searchpal</span> in action.
        </h2>
      </div> */}
      <div>
        {demos.map((demo, i) => (
          <Demo {...demo} key={i.toString()} flipped={i % 2 !== 0} />
        ))}
      </div>
    </section>
  );
};

const general: DemoProps = {
  id: "general",
  title: "General Demo",
  description: (
    <>
      Basic, out-of-box demo with minimal customizations. Copy & paste the
      sample code to see just how easy it is to get started with{" "}
      <span className="text-blue-500 font-semibold">searchpal</span>.
    </>
  ),
  documentation: "https://github.com/elijahharry/searchpal#components",
  getOption: ({ user, children, props }) => (
    <Option
      {...props}
      onClick={() =>
        typeof window !== "undefined" &&
        window.alert(["Selected", user.name].join(" "))
      }
    >
      {children}
    </Option>
  ),
  code: `
import { Search, Option, Detail } from "searchpal";

const UsersSearch = ({ users, session }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button onClick={() => setOpen(true)}>Search for a user</button>
      <Search
        label="Search for a user..."
        open={open}
        onClose={() => setOpen(false)}
      >
        {users.map((user) => (
          <Option
            label={user.name}
            sublabel={user.email}
            img={{ src: user.avatar }}
            keywords={(getKeywords) =>
              getKeywords(
                user.email,
                user.organizations && user.organizations.map((org) => org.name)
              )
            }
            onClick={() => window.alert(["Selected", user.name].join(" "))}
            key={user.id}
          >
            <Detail label="Joined" value={user.joined} />
            {user.organizations.length && (
              <Detail
                label="Organizations"
                value={<Organizations items={user.organizations} />}
              />
            )}
          </Option>
        ))}
      </Search>
    </>
  );
};

  `,
};

const link: DemoProps = {
  id: "link",
  title: "Add Anchor Tags",
  description: (
    <>
      Directly add anchors to options & buttons within the search pallete by
      passing through a custom link component.
    </>
  ),
  link: ({ href, children }) => <a href={href}>{children}</a>,
  getOption: ({ props, children, user }) => (
    <Option {...props} href={`mailto:${user.email}`}>
      {children}
    </Option>
  ),
  code: `

import { LinkComponent } from "searchpal";

const Link: LinkComponent = ({ href, children }) => {
  return <a href={href}>{children}</a>;
};

<Search link={Link}>
  {users.map((user) => (
     <Option label={user.name} href={["mailto:", user.email].join("")} />
   ))}
</Search>

  `,
  documentation: "https://github.com/elijahharry/searchpal#link",
};

const demos = [general, link];
