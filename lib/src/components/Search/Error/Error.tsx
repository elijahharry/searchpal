import React from "react";

import { useSearch } from "../../../context";
import { useAnimatedRender } from "../../../hooks";
import { Container, Title, Alert, Subtitle } from "./Error.styled";

export const Error = () => {
  const { error, query } = useSearch();
  const [render, show] = useAnimatedRender(
    (error ? true : false) && process.env.NODE_ENV !== "production",
    0
  );

  if (!render) {
    return null;
  }

  return (
    <Container show={show} border={query ? true : false}>
      <Alert>
        <div>
          <Title>{error}</Title>
          <Subtitle>
            This alert <b>will not</b> be displayed in a production build of
            your application.
          </Subtitle>
        </div>
        <svg
          stroke="currentColor"
          fill="currentColor"
          strokeWidth={0}
          viewBox="0 0 24 24"
          height={24}
          width={24}
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M11 15h2v2h-2v-2zm0-8h2v6h-2V7zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"
            stroke="none"
          />
        </svg>
      </Alert>
    </Container>
  );
};
