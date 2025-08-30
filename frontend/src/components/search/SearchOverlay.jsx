import { useEffect } from "react";

const SearchOverlay = ({ show, setShow, isOpen, children }) => {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            document.body.style.paddingRight = '11px';
            setShow(true);
        } else {
            document.body.style.overflow = 'auto';
            document.body.style.paddingRight = '0';
            setTimeout(() => setShow(false), 300);
        }

        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isOpen,setShow]);
    return (
        <div
            className={`fixed top-0 right-0 w-full h-screen overflow-hidden bg-c-black-06/85 flex justify-center 
    transition-opacity duration-500 ${show ? "opacity-100" : "opacity-0"} 
    ${show ? "z-50" : "-z-50"} ${show ? "pointer-events-auto" : "pointer-events-none"}
    `}
        >
            <div
                className={`lg:w-[800px] h-full pt-20 pb-8 overflow-hidden md:w-500 w-[90%] mx-auto flex flex-col
                     transition-transform duration-500 transform ${show ? "scale-100" : "scale-95"}`}
            >
                {children}
            </div>
        </div>
    );
}

export default SearchOverlay;