export const users: SampleUser[] = [
  {
    name: "Linus Torvalds",
    email: "linus@torvalds.com",
    handle: "linustorvalds",
    joined: "28 days ago",
    id: "13",
    avatar: "/img/linus.png",
    organizations: [
      { name: "Linux Foundation", image: "/img/linux.png" },
      { name: "Git", image: "/img/git.png" },
    ],
  },
  {
    name: "Steve Jobs",
    email: "steve@apple.com",
    handle: "stevejobs",
    joined: "22 days ago",
    id: "12",
    avatar: "/img/steve.png",
    organizations: [
      { name: "Apple", image: "/img/apple.png" },
      { name: "Next", image: "/img/next.png" },
      { name: "Pixar", image: "/img/pixar.png" },
    ],
  },

  {
    name: "Bill Gates",
    email: "bill@microsoft.com",
    handle: "billgates",
    joined: "10 days ago",
    id: "11",
    avatar: "/img/bill.png",
    organizations: [
      { name: "Microsoft", image: "/img/microsoft.png" },
      { name: "Xbox", image: "/img/xbox.png" },
    ],
  },

  {
    name: "Chris Smith",
    email: "chris@sample.com",
    avatar: "/img/chrissmith.png",
    id: "14",
    joined: "2 days ago",
    handle: "chrissmith",
  },
  {
    name: "Jane Smith",
    email: "jane@sample.com",
    avatar: "/img/janesmith.png",
    id: "15",
    joined: "22 days ago",
    handle: "janesmith",
  },
  {
    name: "Alice Williams",
    email: "alice@sample.com",
    avatar: "/img/alicewilliams.png",
    id: "16",
    joined: "17 days ago",
    handle: "alicewilliams",
  },
  {
    name: "Robin Doe",
    email: "robin@sample.com",
    avatar: "/img/robindoe.png",
    id: "17",
    joined: "29 days ago",
    handle: "robindoe",
  },
  {
    name: "John Doe",
    email: "john@sample.com",
    avatar: "/img/johndoe.png",
    id: "18",
    joined: "4 days ago",
    handle: "johndoe",
  },
];

type SampleUser = {
  name: string;
  avatar: string;
  organizations?: { name: string; image: string }[];
  email: string;
  joined: string;
  id: string;
  handle: string;
  permissions?: "base" | "super" | "extended";
};
