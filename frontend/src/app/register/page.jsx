"use client";

import { Suspense, useEffect, useState } from "react";
import SignupPage from "./Signup";
import LoginPage from "./Login";
import SidePage from "./SidePage";
import { useRouter, useSearchParams } from "next/navigation";
import useUserStore from "@/stores/useUserStore";

const RegisterPage = () => {
    // const router = useRouter();
    // const { user, loading } = useUserStore((state) => state);

    // useEffect(() => {
    //     if (!loading && user || loading && user) return router.push("/");

    // }, [user,router])

    const searchParams = useSearchParams();
    const [page, setPage] = useState(searchParams.get("page") ? searchParams.get("page") : "login");

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <main
                className="w-full h-screen bg-c-black-08 overflow-hidden"
            >

                <div className="w-full h-full flex relative">

                    <SignupPage page={page} setPage={setPage} />

                    <LoginPage page={page} setPage={setPage} />

                    <SidePage page={page} setPage={setPage} />

                </div >

            </main >
        </Suspense>
    );
}

export default RegisterPage;