import {makeStyles, Theme} from "@material-ui/core";

export const useCreateListsModalStyles = makeStyles((theme: Theme) => ({
    dialog: {
        "& .MuiDialogTitle-root": {
            padding: "5px 15px",
            margin: 0,
            borderBottom: `1px solid ${theme.palette.divider}`,
        },
    },
    content: {
        height: 650,
        width: 598,
        padding: "0px 0px",
        overflowX: "hidden",
    },
    button: {
        marginLeft: "auto",
        height: 30,
    },
    wallpaperWrapper: {
        width: 598,
        height: 200,
        backgroundColor: "#B2B2B2",
        position: "relative",
        zIndex: 1,
    },
    wallpaperImg: {
        objectFit:"cover",
        position: "absolute",
        zIndex: 1,
        width: 598,
        height: 200,
    },
    wallpaperEditImg: {
        zIndex: 5,
        position: "absolute",
        top: "45%",
        left: "48%",
    },
    footer: {
        padding: "12px 16px",
    },
    footerWrapper: {
        display: "flex",
        justifyContent: "space-between",
    },
    footerTitle: {
        fontSize: 15,
    },
    footerText: {
        fontSize: 13,
        color: theme.palette.text.secondary,
    },
}));
