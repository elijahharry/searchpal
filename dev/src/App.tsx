// import React from "react";

import { Search, Option, Detail } from "@searchpal/build";
import { useState } from "react";
import { users } from "./constants/users";

function App() {
  const [open, setOpen] = useState(true);

  return (
    <div>
      <Search open={open} onClose={() => setOpen(false)} startExpanded>
        {async (query) => {
          await delay();
          if (query.includes("hello")) return;
          return users.map((u) => (
            <Option label={`${query} ${u.name}`}>
              <Detail value="Test" label="Test" />
            </Option>
          ));
        }}
      </Search>
      {/* <Search open={open} onClose={() => setOpen(false)}>
        {users.map((user) => (
          <Option
            label={user.name}
            sublabel={user.email}
            key={user.id}
            img={{ src: user.avatar }}
            // cta={"Testing"}
            keywords={(interpret) =>
              interpret(
                user.email,
                user.organizations && user.organizations.map((org) => org.name)
              )
            }
          >
            <Detail label="Joined" value={user.joined} />
            {user.organizations && (
              <Detail
                label="Projects"
                value={user.organizations.map((org) => org.name).join(", ")}
              />
            )}
          </Option>
        ))}
      </Search> */}
    </div>
  );
}

const delay = async () =>
  await new Promise((resolve) => setTimeout(resolve, 200));

export default App;
