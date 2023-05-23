import { makeStyles } from "@material-ui/core";

export const useAddTweetImageStyles = makeStyles((theme) => ({
    image: {
        position: "relative",
        "& img": {
            objectFit: "cover",
            marginTop: 10,
            width: 504,
            height: 280,
            borderRadius: 20,
            borderColor: theme.palette.info.light
        }
    },
    imageSmall: {
        position: "relative",
        "& img": {
            objectFit: "cover",
            marginTop: 10,
            width: 260,
            height: 152,
            borderRadius: 20,
            borderColor: theme.palette.info.light
        }
    },
    imageRemove: {
        "& .MuiIconButton-root": {
            padding: 6,
            top: 15,
            left: 5,
            position: "absolute",
            backgroundColor: theme.palette.common.black,
            opacity: 0.75,
            "& svg": {
                verticalAlign: "top",
                fill: theme.palette.common.white,
                width: 18,
                height: 18
            },
            "&:hover": {
                backgroundColor: "rgba(39, 44, 48, 0.75) !important"
            }
        }
    }
}));
