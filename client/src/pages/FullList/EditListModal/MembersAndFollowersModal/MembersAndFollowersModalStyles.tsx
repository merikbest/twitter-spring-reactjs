import {makeStyles, Theme} from "@material-ui/core";

export const useMembersAndFollowersModalStyles = makeStyles((theme: Theme) => ({
    dialog: {
        "& .MuiDialogTitle-root": {
            padding: "5px 15px",
            marginBottom: 0,
            borderBottom: `1px solid ${theme.palette.divider}`,
        },
    },
    content: {
        height: 577,
        width: 598,
        padding: "0px 0px",
        overflowX: "hidden",
    },
    infoWrapper: {
        width: 350,
        margin: "0 auto",
        marginTop: 32,
        textAlign: "center",
    },
    title: {
        fontSize: 31,
        fontWeight: 800,
        marginBottom: 8,
    },
    text: {
        fontSize: 15,
        color: theme.palette.text.secondary,
    },
}));
