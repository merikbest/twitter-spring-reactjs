import React, {useState} from "react";

export interface SnackbarProps {
    snackBarMessage?: string;
    openSnackBar?: boolean;
    setSnackBarMessage?: (value: string | ((prevVar: string) => string)) => void;
    setOpenSnackBar?: (value: boolean | ((prevVar: boolean) => boolean)) => void;
    onCloseSnackBar?: () => void;
}

export const withSnackbar = <T extends object>(Component: React.ComponentType<SnackbarProps>) => (props: SnackbarProps) => {
    const [snackBarMessage, setSnackBarMessage] = useState<string>("");
    const [openSnackBar, setOpenSnackBar] = useState<boolean>(false);

    const onCloseSnackBar = (): void => {
        setOpenSnackBar(false);
    };

    return (
        <Component
            {...props as SnackbarProps}
            snackBarMessage={snackBarMessage}
            openSnackBar={openSnackBar}
            setSnackBarMessage={setSnackBarMessage}
            setOpenSnackBar={setOpenSnackBar}
            onCloseSnackBar={onCloseSnackBar}
        />
    );
};
