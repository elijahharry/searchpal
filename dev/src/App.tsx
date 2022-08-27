// import React from "react";

import { Search, Option, Detail } from "@searchpal/dev";
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
          // theme.set({
          //   accent: "#1c4bd6",
          //   accentText: "#fff",
          //   // accentText: "#18308f",
          //   background: "#1a2654",
          //   borderColor: "#29366d",
          //   light: { borderColor: "#fff" },
          //   optionSelectedBackground: "#3250ab",
          //   optionSelectedText: "#ffffff",
          //   backdrop: "#002477",
          //   backdropOpacity: ".8",
          //   shadow: "0 10px 20px 5px #0d1a6630",
          // });
          theme.border("#393939");
          return theme;
        }}
      >
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
