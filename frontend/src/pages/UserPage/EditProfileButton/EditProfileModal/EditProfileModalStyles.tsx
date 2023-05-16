import { makeStyles } from "@material-ui/core";

export const useEditProfileModalStyles = makeStyles(() => ({
    wallpaperWrapper: {
        height: 200,
        backgroundColor: "#B2B2B2",
        position: "relative",
        zIndex: 1
    },
    wallpaperImg: {
        objectFit: "cover",
        position: "absolute",
        zIndex: 1,
        width: 583,
        height: 200
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
        marginTop: -50,
        padding: 20,
        paddingTop: 0,
        fontSize: 16,
        "& .MuiAvatar-root": {
            zIndex: 4,
            width: "120px !important",
            height: "120px !important",
            border: "4px solid white"
        }
    },
    inputWrapper: {
        width: 560,
        height: 22,
        display: "flex",
        justifyContent: "space-between"
    }
}));
