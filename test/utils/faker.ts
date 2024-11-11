import { faker } from "@faker-js/faker";

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  state: string;
  country: string;
}

export interface UserInput {
  firstName?: string;
  lastName?: string;
}

export interface Option {
  id: string;
  label: string;
  data: User;
}

const makeId = () => faker.string.alpha(1) + faker.string.alphanumeric(10);

const makeUser = (): User => {
  const [firstName, lastName] = [
    faker.person.firstName(),
    faker.person.lastName(),
  ];

  return {
    id: makeId(),
    name: `${firstName} ${lastName}`,
    email: faker.internet.email({ firstName, lastName }),
    phone: faker.phone.number({ style: "human" }),
    city: faker.location.city(),
    state: faker.location.state(),
    country: faker.location.country(),
  };
};

const makeUsers = <R = User>(
  count: number,
  wrap: (user: User) => R = (user) => user as unknown as R
): R[] => Array.from({ length: count }, () => wrap(makeUser()));

const makeOptions = (count: number = 50) =>
  makeUsers(
    count,
    (data): Option => ({
      id: data.id,
      data,
      label: data.name,
    })
  );

export { makeId, makeUser, makeUsers, makeOptions };
