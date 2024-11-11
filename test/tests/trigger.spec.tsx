// import { Search, Portal, Trigger } from "searchpal";
import { Search } from "./search.spec";

export const TriggerAttributeSpec = ({
  id,
  triggerId,
}: {
  id?: string;
  triggerId: string;
}) => <Search id={id} trigger={triggerId} />;

export const TriggerCallbackSpec = ({
  id,
  triggerId,
}: {
  id?: string;
  triggerId: string;
}) => (
  <Search id={id} trigger={(props) => <button {...props} id={triggerId} />} />
);
