import {makeStyles, Theme} from "@material-ui/core";

export const useEmptyChatMessagesStyles = makeStyles((theme: Theme) => ({
    chatInfoWrapper: {
        width: 320,
        margin: "0px auto",
        paddingTop: 300,
    },
    chatInfoButton: {
        marginTop: 27,
        height: 52,
    },
}));
