import Image from "next/image";

const HomeBanner = () => {
    return (
        <div className="w-full h-screen relative">
            <Image src="/images/Group 1.jpg" width={1920} height={857} alt="PlayCast banner" className="w-full h-full object-cover" />
            <div className="w-full h-[10vh] bg-gradient-to-t from-c-black to-c-black/0 absolute bottom-0"></div>
        </div>
    );
}

export default HomeBanner;