import { Search, Option, PreviewComponent, Detail } from "@searchpal/dev";
import { users } from "../../constants/users";

export const PreviewSpotlight = ({}) => {
  return (
    <Search open={true} onClose={() => {}} startExpanded>
      {users.map((user) => (
        <Option
          label={user.name}
          sublabel={user.email}
          img={{ src: user.avatar }}
          key={user.id}
          // preview={Preview}
          // media={Media}
        >
          {user.organizations && (
            <Detail
              label="Projects"
              value={user.organizations.map((org) => org.name).join(", ")}
              // value={
              //   <Avatars
              //     images={user.organizations.map((org) => ({
              //       src: org.image,
              //       alt: org.name,
              //     }))}
              //   />
              // }
            />
          )}
        </Option>
      ))}
    </Search>
  );
};

const Preview: PreviewComponent = ({ img, media, label, sublabel }) => {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        // padding: "10px 0",
      }}
    >
      {img && (
        <img
          src={img.src}
          alt=""
          style={{
            width: "4rem",
            height: "4rem",
            borderRadius: 8,
            boxShadow: "0px 1px 8px rgba(0,0,0,.15)",
            marginRight: ".8rem",
            // border: "2px solid #ffffff",
          }}
        />
      )}
      <div>
        <h3 style={{ margin: 0, marginBottom: 5 }}>{label}</h3>
        <a
          href="email:test.com"
          style={{ margin: 0, color: "#0c61ff", textDecoration: "none" }}
        >
          {sublabel}
        </a>
      </div>
    </div>
  );
};
