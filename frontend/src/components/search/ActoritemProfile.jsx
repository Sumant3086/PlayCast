const ActorItemProfile = ({ fullName, profile }) => {
    return (
        <img
            src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${profile}`}
            alt={fullName}
            className="h-52 object-cover object-center rounded-xl border-2 border-c-black-15 aspect-square"
        />
    );
}

export default ActorItemProfile;