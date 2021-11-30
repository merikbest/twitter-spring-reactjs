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
        lineHeight: "36px",
        fontSize: 31,
        marginBottom: 8,
        fontWeight: 800,
    },
    suggestedText: {
        lineHeight: "20px",
        fontSize: 15,
        color: theme.palette.text.secondary,
    },
}));
