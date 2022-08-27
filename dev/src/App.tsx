// import React from "react";

import { Search, Option, Detail } from "@searchpal/dev";
import { useState } from "react";
import { users } from "./constants/users";

function App() {
  const [open, setOpen] = useState(true);

  return (
    <div>
      {/* <ButtonSpotlight /> */}
      <Search
        open={open}
        onClose={() => setOpen(false)}
        startExpanded
        theme={(
          theme,
          { accent, border, shadow, option, backdrop, background, text }
        ) => [
          theme(
            "dark",
            // accent("yellow", "red"),
            // border("#000", 5),
            // shadow("10px 10px 100px red"),
            // option(true, "blue", "lightblue"),
            backdrop("black", 0.9),
            // background("#fff"),
            text("red", "lightred")
          ),
        ]}
      >
        {users.map((user) => (
          <Option
            label={user.name}
            // label={20000}
            sublabel={user.email}
            key={user.id}
            // @ts-ignore
            img={{ src: user.avatar }}
            cta={"Testing"}
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
      </Search>
    </div>
  );
}

export default App;
