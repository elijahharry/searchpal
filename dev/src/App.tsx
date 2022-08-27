// import React from "react";

import { Search, Option, Detail } from "@searchpal/build";
import { useState } from "react";
import { users } from "./constants/users";

function App() {
  const [open, setOpen] = useState(true);

  return (
    <div>
      <Search
        open={open}
        onClose={() => setOpen(false)}
        startExpanded
        theme={(theme) => {
          // theme.accent("red", "whitesmoke");
          // theme.option("blue");
          // theme.light.option.selected("red");
          theme.set({
            accent: "red",
            borderColor: "gray",
            light: { borderColor: "#fff" },
            optionSelectedBackground: "red",
            optionSelectedText: "white",
          });
          return theme;
        }}
      >
        {users.map((user) => (
          <Option
            label={user.name}
            sublabel={user.email}
            key={user.id}
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

// const test = {
//   default: function (red: any) {
//     console.log(red);
//   },
// };

// console.log(test("balls"));
