import Link from "next/link";
import Image from "next/image";
import ProfileCard from "./ProfileCard";
import Ad from "../Ad";

type LeftMenuProps = {
  type: "home" | "profile";
};

export default function LeftMenu({ type }: LeftMenuProps) {
  return (
    <div className="flex flex-col gap-6">
      {/* Profile summary hanya muncul di beranda */}
      {type === "home" && <ProfileCard />}

      {/* Main Navigation */}
      <nav className="p-4 bg-white rounded-lg shadow-md text-sm text-gray-600 flex flex-col gap-1">
        <MenuItem href="/profile" icon="/myposts.png" label="My Posts" />
        <Divider />

        <MenuItem href="/profile" icon="/market.png" label="Activity" />
        <Divider />

        <MenuItem href="/events" icon="/events.png" label="Events" />
        <Divider />

        <MenuItem href="/albums" icon="/albums.png" label="Albums" />
        <Divider />

        <MenuItem href="/videos" icon="/videos.png" label="Explore Videos" />
        <Divider />

        <MenuItem href="/lists" icon="/lists.png" label="Lists" />
        <Divider />

        <MenuItem href="/settings" icon="/settings.png" label="Settings" />
      </nav>

      {/* Ads Section */}
      <Ad size="sm" />
    </div>
  );
}

/* --------- Sub Components --------- */

function MenuItem({
  href,
  icon,
  label,
}: {
  href: string;
  icon: string;
  label: string;
}) {
  return (
    <Link
      href={href}
      className="flex items-center gap-4 p-2 rounded-lg hover:bg-slate-100 transition-colors"
    >
      <Image src={icon} alt="" width={20} height={20} />
      <span className="truncate">{label}</span>
    </Link>
  );
}

function Divider() {
  return <hr className="border-t border-gray-100 w-36 self-center" />;
}
