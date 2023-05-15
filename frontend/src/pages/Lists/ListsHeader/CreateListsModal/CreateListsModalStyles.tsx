import { makeStyles } from "@material-ui/core";

export const useCreateListsModalStyles = makeStyles(() => ({
    wallpaperWrapper: {
        width: 598,
        height: 200,
        backgroundColor: "#B2B2B2",
        position: "relative",
        zIndex: 1
    },
    wallpaperImg: {
        objectFit: "cover",
        position: "absolute",
        zIndex: 1,
        width: 598,
        height: 200
    },
    wallpaperEditImg: {
        zIndex: 5,
        position: "absolute",
        top: "45%",
        left: "48%"
    },
    footerWrapper: {
        display: "flex",
        justifyContent: "space-between"
    }
}));
