import { useState } from "react";

interface UseFocusProps {
    onBlur: () => void;
    focused: boolean;
    onFocus: () => void;
}

export const useFocus = (): UseFocusProps => {
    const [focused, setFocused] = useState<boolean>(false);

    const onFocus = () => setFocused(true);
    const onBlur = () => setFocused(false);

    return { focused, onFocus, onBlur };
};
