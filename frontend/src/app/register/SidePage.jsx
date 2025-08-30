import { HomeIcon } from "@/assets/Svgs";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Suspense, useCallback } from "react";

const SidePage = ({ page, setPage }) => {

    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();

    const changeQueryString = useCallback(
        (name, value) => {
            const params = new URLSearchParams(searchParams)
            params.set(name, value)

            return params.toString()
        },
        [searchParams]
    );

    const handleSignup = () => {
        setPage("signup");
        router.push(pathname + '?' + changeQueryString('page', 'signup'))
    }

    const handleLogin = () => {
        setPage("login");
        router.push(pathname + '?' + changeQueryString('page', 'login'))
    }

    return (
        <div
            className={`w-[50%] h-full absolute transition-transform duration-700 bg-[url('/images/header-banner.jpg')] bg-cover bg-center overflow-hidden
         ${page == "login" ? "transform-none" : "translate-x-full"}`}
        >
            <div className="w-full h-full bg-c-black-06/65 px-14 py-8">

                <div className="flex items-center justify-between">
                    <img src="/images/logo-white.png" alt="stream vibe logo" className="3xl:w-full lg:w-[165px] w-[150px]" />
                    <Link href="/">
                        <span className="text-white flex gap-2">Back to Home <HomeIcon /></span>
                    </Link>
                </div>

                <Suspense fallback={<div>Loading...</div>}>
                    <div className="relative">
                        {/*//! Login Text Info */}
                        <div className={`mt-20 w-full absolute top-0 transition-all duration-700 ${page == "login" ? "left-0" : "left-[-200%]"}`}>
                            <h1
                                className={`text-white text-3xl font-semibold`}
                            >Log In Page</h1>

                            <p className="text-white/80 mt-10 text-base leading-7 mb-10">
                                To access your account and take advantage of all the special features and services on our site,
                                please log in with your personal information. If you do not have an account yet, you can sign up
                                and enjoy our exclusive benefits.
                            </p>


                            <button
                                className={`bg-c-red-45 text-white text-super-base font-medium rounded-full px-14 py-3.5
                                   `}
                                onClick={handleSignup}
                            >
                                Sign Up Page
                            </button>
                        </div>

                        {/*//! Sign Up Text Info */}
                        <div className={`mt-20 w-full absolute top-0 transition-all duration-700 ${page == "signup" ? "left-0" : "left-[-200%]"}`}>
                            <h1
                                className={`text-white text-3xl font-semibold`}
                            >Sign Up Page</h1>

                            <p className="text-white/80 mt-10 text-base leading-7 mb-10">
                                To access your account and take advantage of all the special features and services on our site,
                                please log in with your personal information. If you do not have an account yet, you can sign up
                                and enjoy our exclusive benefits.
                            </p>

                            <button
                                className={`bg-c-red-45 text-white text-super-base font-medium rounded-full px-14 py-3.5
                                   `}
                                onClick={handleLogin}
                            >
                                Log In Page
                            </button>
                        </div>
                    </div>
                </Suspense>


            </div>
        </div>
    );
}

export default SidePage;