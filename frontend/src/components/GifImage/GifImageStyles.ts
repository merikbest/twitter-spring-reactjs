import { makeStyles, Theme } from "@material-ui/core";

interface GifImageStylesProps {
    width: number;
    height: number;
}

export const useGifImageStyles = makeStyles<Theme, GifImageStylesProps>((theme) => ({
    gif: {
        marginTop: 12,
        position: "relative",
        display: "flex",
        justifyContent: "center",
        backgroundColor: ({ width, height }) => (width === height || width > height) ? "auto" : "rgb(0 ,0 ,0)",
        borderRadius: 16,
        "& img": {
            borderRadius: ({ width, height }) => (width === height || width > height) ? "inherit" : "auto",
            height: ({ width, height }) => (width === height || width < height) ? 504 : "auto",
            width: ({ width, height }) => (width === height || width > height) ? 504 : "auto"
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
