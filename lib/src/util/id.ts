import { memoize } from "hoolock";

const randomId = /* @__PURE__ */ (() => {
  const chars = (value: string) => value.split("");

  let basic = "abcdefghijklmnopqrstuvwxyz";
  basic += basic.toUpperCase();

  const initialChars = chars(basic);
  const secondaryChars = chars(basic + "0123456789" + "_-");

  const random = (chars: string[]) =>
    chars[Math.floor(Math.random() * chars.length)];

  const generate = (length: number) => {
    let str = random(initialChars);
    for (let i = 1; i < length; i++) str += random(secondaryChars);
    return str;
  };

  return () => generate(12);
})();

const idRules = /^[a-zA-Z_][a-zA-Z0-9_-]*$/;

const validateId = (id: string) => idRules.test(id);

const safeId = memoize((id: string) => (validateId(id) ? id : randomId()));

export { randomId, safeId };
