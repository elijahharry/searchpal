// import React from "react";

import { Search, Option, Detail } from "@searchpal/dev";
import { useState } from "react";

const CustomSearch = () => {
  const [open, setOpen] = useState(true);

  return (
    <Search open={open} onClose={() => setOpen(false)}>
      {async (query) => {
        try {
          const res = await fetch(
            `/api/users?search=${encodeURIComponent(query)}`,
            { method: "GET" }
          );
          const { users } = await res.json();

          return users.map((user) => (
            <Option label={user.name} sublabel={user.email}>
              {user.organizations && (
                <Detail
                  label="Organizations"
                  value={user.organizations.join(", ")}
                />
              )}
            </Option>
          ));
        } catch (e) {
          console.error(e);
        }
      }}
    </Search>
  );
};

const delay = async () =>
  await new Promise((resolve) => setTimeout(resolve, 200));

export default CustomSearch;
