import {makeStyles, Theme} from "@material-ui/core";

export const useManageMembersSuggestedStyles = makeStyles((theme: Theme) => ({
    container: {
        padding: "0px 12px",
    },
    suggestedInfoWrapper: {
        width: 320,
        margin: "0 auto",
        marginTop: 32,
        textAlign: "center",
    },
    suggestedTitle: {
        fontSize: 31,
        marginBottom: 8,
        fontWeight: 800,
    },
    suggestedText: {
        fontSize: 15,
        color: "rgb(83, 100, 113)",
    },
}));
