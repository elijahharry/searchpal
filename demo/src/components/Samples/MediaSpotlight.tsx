import { Search, Option, MediaComponent, MediaProps } from "@searchpal/dev";
import { users } from "../../constants/users";

export const MediaSpotlight = ({}) => {
  return (
    <Search open={true} onClose={() => {}} startExpanded>
      {users.map((user) => (
        <Option
          label={user.name}
          // img={user.name === "Steve Jobs" ? { src: user.avatar } : undefined}
          key={user.id}
          media={Media}
        />
      ))}
    </Search>
  );
};

const Media: MediaComponent = ({ img, label }) => {
  const letter = label.charAt(0).toUpperCase();

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        ...(letter === "B"
          ? { color: "#4d77ff", background: "#e6f5f8" }
          : { color: "#13935e", background: "#e8fbf0" }),
      }}
    >
      {img ? (
        <img
          src={img.src}
          alt={img.alt}
          style={{ width: "100%", height: "100%" }}
        />
      ) : (
        <span style={{ fontSize: ".8rem", fontWeight: 800 }}>{letter}</span>
      )}
    </div>
  );
};
