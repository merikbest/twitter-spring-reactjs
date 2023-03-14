import { makeStyles, Theme } from "@material-ui/core";

export const useStartConversationStyles = makeStyles((theme: Theme) => ({
    messagesTitle: {
        paddingTop: 83,
        margin: "0px 30px"
    },
    messagesText: {
        margin: "8px 30px 27px 30px"
    },
    messagesButton: {
        marginLeft: 30,
        height: 52
    }
}));
