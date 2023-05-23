import { makeStyles } from "@material-ui/core";

export const useTweetListModalStyles = makeStyles(() => ({
    content: {
        top: "-20%"
    },
    dialogContent: {
        width: 598,
        minHeight: "auto",
        overflow: "hidden",
        padding: "10px 20px 15px 20px"
    }
}));
