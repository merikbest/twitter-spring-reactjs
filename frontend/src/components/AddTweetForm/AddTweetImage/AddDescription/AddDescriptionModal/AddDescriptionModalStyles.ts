import { makeStyles } from "@material-ui/core";

export const useAddDescriptionModalStyles = makeStyles(() => ({
    contentImage: {
        display: "flex",
        justifyContent: "center",
        "& img": {
            height: 500
        }
    },
    inputWrapper: {
        width: 560,
        height: 22,
        display: "flex",
        justifyContent: "space-between"
    }
}));
