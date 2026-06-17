import { useState } from "react";

function useModal(initial: boolean = false) {
    const [isOpen, setIsOpen] = useState(initial);

    const open = () => setIsOpen(true);
    const close = () => setIsOpen(false);
    const toggle = () => setIsOpen(prev => !prev);

    return { isOpen, open, close, toggle };
}

export default useModal