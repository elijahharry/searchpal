import { useSearch } from "../../../../context";
import React, { useMemo } from "react";
import { Content, Text } from "./Suggestion.styled";

export const Suggestion = () => {
  const { suggestion, query } = useSearch();

  const suggest = useMemo(() => {
    if (suggestion) {
      const label = suggestion.label,
        query_ = query.toLowerCase(),
        label_ = label.toLowerCase();

      if (label_.includes(query_) && label_.indexOf(query_) === 0) {
        if (query.length === label.length) {
          return null;
        }
        return [query, label.slice(query.length)];
      }
    }
    return null;
  }, [suggestion, query]);

  if (suggest) {
    return (
      <Content aria-hidden>
        {suggest.map((str, i) => (
          <Text visible={i > 0} key={`${i}-${str}`}>
            {str}
          </Text>
        ))}
      </Content>
    );
  }

  return null;
};
