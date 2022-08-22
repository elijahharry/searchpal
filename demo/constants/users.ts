export const users: SampleUser[] = [
  {
    name: "Linus Torvalds",
    email: "linus@torvalds.com",
    handle: "linustorvalds",
    joined: "28 days ago",
    id: "13",
    avatar: "linus.png",
    organizations: [
      { name: "Linux Foundation", image: "linux.png" },
      { name: "Git", image: "git.png" },
    ],
  },
  {
    name: "Steve Jobs",
    email: "steve@apple.com",
    handle: "stevejobs",
    joined: "22 days ago",
    id: "12",
    avatar: "steve.png",
    organizations: [
      { name: "Apple", image: "apple.png" },
      { name: "Next", image: "next.png" },
      { name: "Pixar", image: "pixar.png" },
    ],
  },

  {
    name: "Bill Gates",
    email: "bill@microsoft.com",
    handle: "billgates",
    joined: "10 days ago",
    id: "11",
    avatar: "bill.png",
    organizations: [
      { name: "Microsoft", image: "microsoft.png" },
      { name: "Xbox", image: "xbox.png" },
    ],
  },

  {
    name: "Chris Smith",
    email: "chris@sample.com",
    avatar: "chrissmith.png",
    id: "14",
    joined: "2 days ago",
    handle: "chrissmith",
  },
  {
    name: "Jane Smith",
    email: "jane@sample.com",
    avatar: "janesmith.png",
    id: "15",
    joined: "22 days ago",
    handle: "janesmith",
  },
  {
    name: "Alice Williams",
    email: "alice@sample.com",
    avatar: "alicewilliams.png",
    id: "16",
    joined: "17 days ago",
    handle: "alicewilliams",
  },
  {
    name: "Robin Doe",
    email: "robin@sample.com",
    avatar: "robindoe.png",
    id: "17",
    joined: "29 days ago",
    handle: "robindoe",
  },
  {
    name: "John Doe",
    email: "john@sample.com",
    avatar: "johndoe.png",
    id: "18",
    joined: "4 days ago",
    handle: "johndoe",
  },
].map((user) => ({
  ...user,
  avatar:
    user.avatar &&
    `https://searchpal.s3.us-east-2.amazonaws.com/samples/${user.avatar}`,
}));

export type SampleUser = {
  name: string;
  avatar: string;
  organizations?: { name: string; image: string }[];
  email: string;
  joined: string;
  id: string;
  handle: string;
  permissions?: "base" | "super" | "extended";
};
