import {useState} from "react";

interface UseSnackbar {
    snackBarMessage: string;
    openSnackBar: boolean;
    setSnackBarMessage: (value: string | ((prevVar: string) => string)) => void;
    setOpenSnackBar: (value: boolean | ((prevVar: boolean) => boolean)) => void;
    onCloseSnackBar: () => void;
}

export const useSnackbar = (): UseSnackbar => {
    const [snackBarMessage, setSnackBarMessage] = useState<string>("");
    const [openSnackBar, setOpenSnackBar] = useState<boolean>(false);

    const onCloseSnackBar = (): void => {
        setOpenSnackBar(false);
    };

    return {snackBarMessage, openSnackBar, setSnackBarMessage, setOpenSnackBar, onCloseSnackBar};
}
