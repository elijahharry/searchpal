import { Search, Option, ArrowProps } from "@searchpal/dev";
import { users } from "../../constants/users";

export const ArrowSpotlight = ({}) => {
  const selected = ["14"];
  return (
    <Search open={true} onClose={() => {}} startExpanded>
      {users.map((user) => (
        <Option
          label={user.name}
          arrow={(props) => (
            <Arrow checked={!selected.includes(user.id)} {...props} />
          )}
          img={{ src: user.avatar }}
          key={user.id}
        />
      ))}
    </Search>
  );
};

const Arrow = ({
  checked,
  focused,
  active,
}: ArrowProps & { checked: boolean }) => {
  return (
    <div
      //   className={[
      //     "checkbox",
      //     checked ? "checkbox-checked" : "checkbox-empty",
      //     focused ? "checkbox-focus" : "",
      //   ].join(" ")}
      style={{
        border: "1px solid rgb(200,200,200)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 4,
        width: "1rem",
        height: "1rem",
        background: active ? "#dddcdc" : "",
      }}
    >
      {active && <Checkbox />}
    </div>
  );
};

const Checkbox = () => {
  return (
    <svg
      stroke="currentColor"
      fill="currentColor"
      strokeWidth={0}
      viewBox="0 0 16 16"
      height=".6rem"
      width=".6rem"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M13.485 1.431a1.473 1.473 0 0 1 2.104 2.062l-7.84 9.801a1.473 1.473 0 0 1-2.12.04L.431 8.138a1.473 1.473 0 0 1 2.084-2.083l4.111 4.112 6.82-8.69a.486.486 0 0 1 .04-.045z"
        stroke="none"
      />
    </svg>
  );
};
