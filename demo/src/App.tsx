// import React from "react";

import { Search, Option, Detail } from "@searchpal/dev";
import { useState } from "react";
import { users } from "./constants/users";

// import { TestComponent } from "./components/TestComponent";
// import { ArrowSpotlight } from "./components/Samples/ArrowSpotlight";
// import { MediaSpotlight } from "./components/Samples/MediaSpotlight";
// import { PreviewcdSpotlight } from "./components/Samples/PreviewSpotlight";
import { ButtonSpotlight } from "./components/Samples/ButtonSpotlight";

function App() {
  const [open, setOpen] = useState(true);

  return (
    <div>
      {/* <ButtonSpotlight /> */}
      <Search open={open} onClose={() => setOpen(false)} startExpanded>
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
