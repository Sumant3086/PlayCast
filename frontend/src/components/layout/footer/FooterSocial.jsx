import { FacebookSvg, LinkedinSvg, TwitterSvg } from "@/assets/Svgs";

const FooterSocial = () => {
    return (
        <div>
            <p className="text-white font-semibold 3xl:text-[1.45rem] mb-3.5">Connect With Us</p>

            <div className="flex items-center start gap-3.5">
                <button className="3xl:w-14 3xl:h-14 w-9 h-9 flex items-center justify-center btn-black-10 border border-c-black-15 rounded">
                    <FacebookSvg className="3xl:w-[26px] 3xl:h-[26px]" />
                </button>
                <button className="3xl:w-14 3xl:h-14 w-9 h-9 flex items-center justify-center btn-black-10 border border-c-black-15 rounded">
                    <TwitterSvg className="3xl:w-[26px] 3xl:h-[26px]" />

                </button>
                <button className="3xl:w-14 3xl:h-14 w-9 h-9 flex items-center justify-center btn-black-10 border border-c-black-15 rounded">
                    <LinkedinSvg className="3xl:w-[26px] 3xl:h-[26px]" />
                </button>
            </div>
        </div>
    );
}

export default FooterSocial;