import { makeStyles } from "@material-ui/core";

export const useVoteComponentStyles = makeStyles((theme) => ({
    container: {
        position: "relative"
    },
    voteOption: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        height: 30,
        marginTop: 4

    },
    voteChoice: {
        zIndex: 1,
        padding: "0px 11px"
    },
    voteScale: {
        top: 0,
        left: 0,
        borderRadius: 4,
        position: "absolute",
        height: 30,
        backgroundColor: theme.palette.grey[100]
    },
    voteInfo: {
        marginTop: 11
    },
    voteButton: {
        marginTop: 4
    }
}));
