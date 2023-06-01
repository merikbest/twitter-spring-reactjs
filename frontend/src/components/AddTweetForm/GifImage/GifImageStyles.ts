import { makeStyles } from "@material-ui/core";

export const useGifImageStyles = makeStyles((theme) => ({
    gif: {
        position: "relative",
        "& img": {
            width: "100%",
            borderRadius: 16
        }
    },
    gifRemove: {
        "& .MuiIconButton-root": {
            padding: 6,
            top: 5,
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
