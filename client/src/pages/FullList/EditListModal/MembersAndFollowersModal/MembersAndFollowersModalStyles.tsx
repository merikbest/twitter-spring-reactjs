import {makeStyles, Theme} from "@material-ui/core";

export const useMembersAndFollowersModalStyles = makeStyles((theme: Theme) => ({
    dialog: {
        "& .MuiDialogTitle-root": {
            marginBottom: 0,
            borderBottom: "1px solid rgb(239, 243, 244)",
        },
        "& .MuiIconButton-root": {
            marginRight: 15,
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
        color: "rgb(83, 100, 113)",
    },
}));
