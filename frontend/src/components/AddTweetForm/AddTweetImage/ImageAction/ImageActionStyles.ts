import { makeStyles } from "@material-ui/core";

export const useImageActionStyles = makeStyles(() => ({
    imageAction: {
        marginRight: 48,
        display: "inline-flex",
        alignItems: "center",
        "&:hover": {
            textDecoration: "underline",
            cursor: "pointer"
        },
        "& svg": {
            marginRight: 2,
            width: 16,
            height: 16
        }
    }
}));
