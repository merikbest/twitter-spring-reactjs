import {makeStyles, Theme} from "@material-ui/core";

export const useCreateListsModalInputStyles = makeStyles((theme: Theme) => ({
    container: {
        padding: "12px 16px",
        position: "relative",
    },
    content: {
        position: "absolute",
        right: 25,
        display: "flex",
        zIndex: 3,
        marginTop: 8,
    },
}));
