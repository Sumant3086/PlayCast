const ExperienceItem = ({ icon, title, subtitle }) => {
    return (
        <div className="rounded-lg border border-c-black-15 bg-c-black-06 relative px-5 py-5 z-0">
            <div className="absolute rounded-lg w-full h-full top-0 right-0 bg-gradient-to-bl from-c-red-45/10 to-c-black-08 to-60% -z-10" />

            <div className="flex items-center gap-4">
                <div
                    className="3xl:w-16 3xl:h-16 w-12 h-12 rounded-xl bg-c-black-08 border border-c-black-12 flex justify-center items-center"
                >{icon}</div>
                <h5 className="text-white font-semibold 3xl:text-[1.35rem]">{title}</h5>
            </div>
            <p className="text-c-grey-60 3xl:text-super-base 3xl:leading-[25px] lg:text-sm md:text-super-xs text-xs mt-3">{subtitle}</p>
        </div>
    );
}

export default ExperienceItem;