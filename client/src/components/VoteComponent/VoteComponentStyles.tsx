import {makeStyles, Theme} from "@material-ui/core";

export const useVoteComponentStyles = makeStyles((theme: Theme) => ({
    container: {
        position: "relative",
    },
    voteOption: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        height: 30,
        marginTop: 4,

    },
    voteChoice: {
        zIndex: 1,
        fontSize: 14,
        fontWeight: 700,
        padding: "0px 11px",
    },
    voteScale: {
        top: 0,
        left: 0,
        borderRadius: 4,
        position: "absolute",
        height: 30,
        // backgroundColor: "rgba(29, 155, 240, 0.58)",
        backgroundColor: "rgb(207, 217, 222)",
    },
    voteInfo: {
        fontSize: 14,
        marginTop: 11,
        color: "rgb(83, 100, 113)",
    },
    voteButton: {
        marginTop: 4,
        padding: "3px 8px",
        border: '1px solid',
    },
}));
