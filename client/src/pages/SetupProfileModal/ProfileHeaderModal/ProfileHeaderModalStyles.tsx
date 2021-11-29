import {makeStyles} from "@material-ui/core";

export const useProfileHeaderModalStyles = makeStyles((theme) => ({
    container: {
        width: 598,
        height: 600,
        marginTop: 5,
        position: "relative",
    },
    logoIcon: {
        margin: "0 auto",
        width: 30,
        "& svg": {
            fontSize: 34,
            color: theme.palette.primary.main,
        },
    },
    title: {
        margin: "16px 0",
        fontWeight: 700,
        fontSize: 23,
    },
    text: {
        color: theme.palette.text.secondary,
        fontSize: 15,
    },
    wallpaperWrapper: {
        height: 136,
        marginTop: 71,
        backgroundColor: "#B2B2B2",
        position: "relative",
        zIndex: 1,
    },
    wallpaperImg: {
        objectFit:"cover",
        position: "absolute",
        zIndex: 1,
        width: 534,
        height: 136,
    },
    wallpaperEditImg: {
        zIndex: 5,
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
    },
    avatarWrapper: {
        position: "relative",
        marginTop: -80,
        padding: 20,
        paddingTop: 0,
        fontSize: 16,
        "& .MuiAvatar-root": {
            zIndex: 4,
            width: "125px !important",
            height: "125px !important",
            border: "4px solid white",
        },
    },
    fullName :{
        fontSize: 23,
        fontWeight: 700,
    },
    username :{
        fontSize: 15,
        color: theme.palette.text.secondary,
    },
    button: {
        position: "absolute",
        bottom: 0,
        width: 530,
        marginBottom: 30,
        fontSize: 15,
    },
}));
