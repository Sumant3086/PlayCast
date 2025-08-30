import { BellSvg } from "@/assets/Svgs";

const NotificationButton = () => {
    return (
        <button className="focus:outline-none focus:border-none mx-2.5 md:inline hidden">
            <BellSvg className="3xl:w-[2.4rem] 3xl:h-[2.4rem]" />
        </button>
    );
}

export default NotificationButton;