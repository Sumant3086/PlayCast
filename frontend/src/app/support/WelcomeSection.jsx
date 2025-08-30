const WelcomeSection = () => (
    <div className="md:col-span-2 col-span-full">
        <h3 className="text-white 3xl:text-3.5xl 2xl:text-3xl xl:text-2.5xl lg:text-2xl md:text-xl text-2.5xl font-semibold mb-2 max-md:leading-tight">
            Welcome to our support page!
        </h3>
        <p className="text-c-grey-60 3xl:text-lg 2xl:text-super-sm lg:text-sm text-super-xs">
            We are here to help you with any problems you may be having with our product.
        </p>
        <div className="w-full">
            <img src="/images/subscription-box-image-mobile.jpg" className="border-2 border-c-black-15 rounded-lg w-full mt-5" alt="PlayCast" />
        </div>
    </div>
);

export default WelcomeSection;