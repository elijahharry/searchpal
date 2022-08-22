import { Image } from "../../../Image";

export const Avatars = ({
  avatars,
}: {
  avatars: { alt?: string; src: string }[];
}) => {
  return (
    <div className="flex -space-x-1">
      <span className="sr-only">
        {avatars
          .map((avatar) => avatar.alt)
          .filter(Boolean)
          .join(" and ")}
      </span>
      {avatars.map((avatar, i) => (
        <div
          className="w-9 h-9 rounded-full overflow-hidden relative ring-4 ring-white"
          aria-hidden
        >
          <Image src={avatar.src} alt={avatar.alt || `avatar ${i + 1}`} />
        </div>
      ))}
    </div>
  );
};
