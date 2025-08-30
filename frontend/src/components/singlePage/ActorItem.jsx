import Link from "next/link";

const ActorItem = ({ id, fullName, profile }) => (
    <Link href={`/actors/${id}`}
        className="relative flex-shrink-0 lg:w-[135px] md:w-[90px] w-[90px] border border-c-black-15 rounded-lg overflow-hidden group"
    >
        <img
            src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${profile}`}
            alt={fullName}
            className="rounded-lg group-hover:scale-105 duration-400" />
        <div
            className="w-full h-full absolute top-0 left-0 bg-gradient-to-t from-c-black-06/90
             via-c-black-06/70 to-c-black-06/40 opacity-0 group-hover:opacity-100 duration-400"
        ></div>
        <div
            className="w-full h-full absolute top-0 left-0 bg-gradient-to-t from-c-black-06/90
             via-c-black-06/60 to-c-black-06/30 lg:px-2 lg:py-2.5 px-1.5 py-1.5 flex flex-col justify-end"
        >
            <h6 className="text-white/80 font-medium lg:text-base text-xs">
                {fullName}
            </h6>
        </div>
    </Link>
);

export default ActorItem;