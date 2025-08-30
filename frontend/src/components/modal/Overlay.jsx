const Overlay = ({ show, setIsOpen, children }) => {
    return (
        <div
            className={`fixed top-0 right-0 w-full h-screen bg-c-black-06/55 flex items-center justify-center 
    transition-opacity duration-500 ${show ? "opacity-100" : "opacity-0"} 
    ${show ? "z-50" : "-z-50"} ${show ? "pointer-events-auto" : "pointer-events-none"}`}
            onClick={() => setIsOpen(false)}
        >
            {children}
        </div>
    );
}

export default Overlay;