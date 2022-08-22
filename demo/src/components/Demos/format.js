// import { Search, Option, Detail } from "searchpal";

// const UsersSearch = ({ users, session }) => {
//   const [open, setOpen] = useState(false);

//   return (
//     <>
//       <button onClick={() => setOpen(true)}>Search for a user</button>
//       <Search
//         label="Search for a user..."
//         open={open}
//         onClose={() => setOpen(false)}
//         link={({ href, children }) => <a href={href}>{children}</a>}
//       >
//         {users.map((user) => (
//           <Option
//             label={user.name}
//             sublabel={user.email}
//             img={{ src: user.avatar }}
//             keywords={(getKeywords) =>
//               getKeywords(
//                 user.email,
//                 user.organizations && user.organizations.map((org) => org.name)
//               )
//             }
//             key={user.id}
//           >
//             <Detail label="Joined" value={user.joined} />
//             {user.organizations.length && (
//               <Detail
//                 label="Organizations"
//                 value={<Organizations items={user.organizations} />}
//               />
//             )}
//           </Option>
//         ))}
//       </Search>
//     </>
//   );
// };

// const users = [];

// import { LinkComponent } from "searchpal";

// const Link: LinkComponent = ({ href, children }) => {
//   return <a href={href}>{children}</a>;
// };

// const test = (
//   <Search link={Link}>
//     {users.map((user) => (
//       <Option label={user.name} href={["mailto:", user.email].join("")} />
//     ))}
//   </Search>
// );
