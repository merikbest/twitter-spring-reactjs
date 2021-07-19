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
    image: {
        position: 'relative',
        '& img': {
            marginLeft: "58px",
            objectFit: "cover",
            marginTop: 10,
            width: 504,
            height: 280,
            borderRadius: 20,
            borderColor: "#5b7083",
        },
        "& svg": {
            verticalAlign: "top",
            fill: '#fff',
            height: "0.75em",
        },
    },
    imageRemove: {
        padding: 6,
        top: 15,
        left: 65,
        position: 'absolute',
        backgroundColor: '#322C28 !important',
    },
}));
