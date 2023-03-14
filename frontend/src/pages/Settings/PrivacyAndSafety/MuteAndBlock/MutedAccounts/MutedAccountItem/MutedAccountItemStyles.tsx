import { makeStyles } from "@material-ui/core";

export const useMutedAccountItemStyles = makeStyles((theme) => ({
    container: {
        borderTop: 0,
        borderLeft: 0,
        borderRight: 0,
        borderRadius: 0,
        display: "flex",
        alignItems: "flex-start",
        paddingLeft: 15,
        paddingTop: 8,
        paddingBottom: 8,
        cursor: "pointer",
        "& .MuiPaper-outlined": {
            minHeight: "1vh"
        },
        "&:hover": {
            backgroundColor: theme.palette.secondary.main
        }
    },
    listAvatar: {
        marginRight: 15
    },
    userInfo: {
        position: "relative",
        maxWidth: 350
    },
    userInfoWrapper: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between"
    }
}));
