import Image from "next/image";

interface AdProps {
  size: "sm" | "md" | "lg";
}

const Ad = ({ size }: AdProps) => {
  const imageHeight =
    size === "sm" ? "h-24" : size === "md" ? "h-36" : "h-48";

  const textSize = size === "sm" ? "text-xs" : "text-sm";

  const description =
    size === "sm"
      ? "Lorem ipsum dolor sit amet consectetur adipisicing elit."
      : size === "md"
      ? "Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit."
      : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit.";

  return (
    <div className="p-4 bg-white rounded-lg shadow-md text-sm">
      {/* TOP */}
      <div className="flex items-center justify-between text-gray-500 font-medium">
        <span>Sponsored Ads</span>
        <Image src="/more.png" alt="more options" width={16} height={16} />
      </div>

      {/* BOTTOM */}
      <div className={`flex flex-col mt-4 ${size === "sm" ? "gap-2" : "gap-4"}`}>
        {/* IMAGE */}
        <div className={`relative w-full ${imageHeight}`}>
          <Image
            src="https://images.pexels.com/photos/23193135/pexels-photo-23193135.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load"
            alt="Advertisement banner"
            fill
            className="rounded-lg object-cover"
          />
        </div>

        {/* AD INFO */}
        <div className="flex items-center gap-4">
          <Image
            src="https://images.pexels.com/photos/23193135/pexels-photo-23193135.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load"
            alt="BigChef Lounge logo"
            width={24}
            height={24}
            className="rounded-full w-6 h-6 object-cover"
          />
          <span className="text-blue-500 font-medium">BigChef Lounge</span>
        </div>

        {/* DESCRIPTION */}
        <p className={textSize}>{description}</p>

        {/* BUTTON */}
        <button className="bg-gray-200 text-gray-500 p-2 text-xs rounded-lg">
          Learn more
        </button>
      </div>
    </div>
  );
};

export default Ad;
