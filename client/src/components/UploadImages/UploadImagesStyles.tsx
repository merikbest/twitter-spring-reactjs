import {makeStyles, Theme} from "@material-ui/core";

export const useUploadImagesStyles = makeStyles((theme: Theme) => ({
    icon: {
        "& .MuiIconButton-root": {
            marginBottom: 6,
            width: 40,
            height: 40,
            "& span": {
                paddingBottom: 3,
                "& svg" : {
                    verticalAlign: "bottom",
                    height: "0.9em",
                }
            },
        },
    },
}));
