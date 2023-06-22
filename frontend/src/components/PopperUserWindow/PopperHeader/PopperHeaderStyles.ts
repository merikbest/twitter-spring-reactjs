import { makeStyles } from "@material-ui/core";

export const usePopperHeaderStyles = makeStyles(() => ({
    headerWrapper: {
        display: "flex",
        justifyContent: "space-between"
    },
    avatar: {
        width: "60px !important",
        height: "60px !important"
    }
}));
