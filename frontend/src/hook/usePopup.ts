import React, { useState } from "react";

interface UsePopup {
    anchorEl: HTMLElement | null,
    handleOpenPopup: (event: React.MouseEvent<HTMLDivElement| HTMLButtonElement, MouseEvent>) => void,
    handleClosePopup: () => void,
    popoverId: string | undefined,
    openPopover: boolean
}

export const usePopup = (): UsePopup => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const openPopover = Boolean(anchorEl);
    const popoverId = openPopover ? "simple-popover" : undefined;

    const handleOpenPopup = (event: React.MouseEvent<HTMLDivElement | HTMLButtonElement, MouseEvent>): void => {
        setAnchorEl(event.currentTarget);
    };

    const handleClosePopup = (): void => {
        setAnchorEl(null);
    };

    return { popoverId, anchorEl, openPopover, handleOpenPopup, handleClosePopup };
};
