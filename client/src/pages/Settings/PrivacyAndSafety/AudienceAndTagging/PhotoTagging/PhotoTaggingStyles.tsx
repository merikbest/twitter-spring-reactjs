import {makeStyles, Theme} from "@material-ui/core";

export const usePhotoTaggingStyles = makeStyles((theme: Theme) => ({
    title: {
        paddingBottom: 4,
    },
    switch: {
        float: "right",
    },
    photoTaggingItemWrapper: {
        padding: "4px 0px",
        "& .MuiButtonBase-root": {
            padding: 4,
            float: "right",
            "& .MuiSvgIcon-root": {
                width: 20,
                height: 20
            },
        },
    },
}));
