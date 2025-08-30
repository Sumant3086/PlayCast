"use client";

import { useEffect, useState } from "react";
import ModalContent from "./ModalContent";
import Overlay from "./Overlay";

const DialogModal = ({ children, user, isOpen, setIsOpen, title }) => {
    const [show, setShow] = useState(isOpen);

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
    }, [isOpen]);

    return (
        <Overlay show={show} setIsOpen={setIsOpen}>
            <ModalContent user={user} title={title} isOpen={isOpen} setIsOpen={setIsOpen}>
                {children}
            </ModalContent>
        </Overlay>
    );
}

export default DialogModal;
