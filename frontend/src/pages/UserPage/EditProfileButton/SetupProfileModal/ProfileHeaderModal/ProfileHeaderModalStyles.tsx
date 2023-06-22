import { makeStyles } from "@material-ui/core";

export const useProfileHeaderModalStyles = makeStyles(() => ({
    wallpaperWrapper: {
        height: 136,
        marginTop: 71,
        backgroundColor: "#B2B2B2",
        position: "relative",
        zIndex: 1
    },
    wallpaperImg: {
        objectFit: "cover",
        position: "absolute",
        zIndex: 1,
        width: 534,
        height: 136
    },
    wallpaperEditImg: {
        zIndex: 5,
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)"
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
            border: "4px solid white"
        }
    }
}));
