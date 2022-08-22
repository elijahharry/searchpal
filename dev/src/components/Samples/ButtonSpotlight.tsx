import { Search, Option, ButtonComponent, ButtonProps } from "@searchpal/dev";
import { users } from "../../constants/users";

import styled from "styled-components";

export const ButtonSpotlight = () => {
  return (
    <Search open={true} onClose={() => {}} startExpanded>
      {users.map((user) => (
        <Option
          label={user.name}
          sublabel={user.email}
          img={{ src: user.avatar }}
          // img={user.name === "Steve Jobs" ? { src: user.avatar } : undefined}
          key={user.id}
          cta={[`Message ${user.name.split(" ")[0]}`, <MessageSvg />]}
          button={Button}
        />
      ))}
    </Search>
  );
};

const Button: ButtonComponent = ({ label, cta, onClick }) => {
  const letter = label.charAt(0).toUpperCase();

  return <StyledButton onClick={onClick}>{cta}</StyledButton>;
};

const StyledButton = styled.button`
  align-items: center;
  background-image: linear-gradient(144deg, #af40ff, #5b42f3 50%, #00bceb);
  border: 0;
  border-radius: 8px;
  box-shadow: rgba(151, 65, 252, 0.2) 0 15px 30px -5px;
  box-sizing: border-box;
  color: #ffffff;
  display: flex;
  font-family: Phantomsans, sans-serif;
  font-size: 1rem;
  font-weight: 900;
  /* text-transform: uppercase; */
  /* letter-spacing: 2px; */
  justify-content: center;
  align-items: center;
  line-height: 1em;
  max-width: 100%;
  min-width: 140px;
  padding: 19px 24px;
  text-decoration: none;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  white-space: nowrap;
  cursor: pointer;
  width: 100%;
`;

const MessageSvg = () => (
  <svg
    stroke="currentColor"
    fill="currentColor"
    strokeWidth={0}
    viewBox="0 0 16 16"
    height="1em"
    width="1em"
    xmlns="http://www.w3.org/2000/svg"
    style={{ marginLeft: 10, marginTop: -4 }}
  >
    <path
      d="M16 8c0 3.866-3.582 7-8 7a9.06 9.06 0 0 1-2.347-.306c-.584.296-1.925.864-4.181 1.234-.2.032-.352-.176-.273-.362.354-.836.674-1.95.77-2.966C.744 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7zM5 8a1 1 0 1 0-2 0 1 1 0 0 0 2 0zm4 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0zm3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"
      stroke="none"
    />
  </svg>
);
