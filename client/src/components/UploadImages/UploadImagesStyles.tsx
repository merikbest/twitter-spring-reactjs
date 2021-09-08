import {makeStyles, Theme} from "@material-ui/core";

export const useUploadImagesStyles = makeStyles((theme: Theme) => ({
    icon: {
        "& .MuiIconButton-root": {
            padding: 7,
            "& svg": {
                verticalAlign: "bottom",
                height: "0.9em",
            },
        },
    },
}));
