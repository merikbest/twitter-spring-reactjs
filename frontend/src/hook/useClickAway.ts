import React from "react";

interface UseClickAway {
    onClickOpen: () => void;
    onClickClose: () => void;
    open: boolean;
}

export const useClickAway = (): UseClickAway => {
    const [open, setOpen] = React.useState<boolean>(false);

    const onClickOpen = (): void => {
        setOpen((prev) => !prev);
    };

    const onClickClose = (): void => {
        setOpen(false);
    };

    return { open, onClickOpen, onClickClose };
};
