import Link from "next/link";

const ActorItemInfo = ({ type, id, fullName, birthDate, birthPlace, country, bio, handleClose }) => {
    return (
        <div>
            <Link href={`/${type === "director" ? "directors" : "actors"}/${id}`}>
                <h6
                    className="capitalize text-xl font-medium text-white/95 mb-3.5"
                    onClick={handleClose}
                >
                    {fullName}
                </h6>
            </Link>
            <div className="space-y-3">
                <div>
                    <p className="text-white/80 3xl:text-base xl:text-sm text-sm capitalize">
                        {`${birthDate || "_"}, ${birthPlace || "_"}, ${country || "_"}`}
                    </p>
                </div>
                <div>
                    <p className="text-c-grey-65 3xl:text-super-base xl:text-super-sm text-super-sm mb-0.5">Biography</p>
                    <p className="text-c-grey-95 3xl:text-base xl:text-sm text-sm capitalize line-clamp-3">
                        {bio || "There is no biography available."}
                    </p>
                </div>
            </div>

        </div>
    );
}

export default ActorItemInfo;