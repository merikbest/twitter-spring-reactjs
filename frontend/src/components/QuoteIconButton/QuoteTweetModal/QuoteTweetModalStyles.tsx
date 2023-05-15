import { makeStyles } from "@material-ui/core";

export const useQuoteTweetModalStyles = makeStyles(() => ({
    content: {
        top: "-20%"
    },
    header: {
        padding: "5px 15px",
        margin: 0
    },
    dialogContent: {
        width: 598,
        minHeight: 230,
        padding: "10px 20px 15px 20px"
    }
}));
