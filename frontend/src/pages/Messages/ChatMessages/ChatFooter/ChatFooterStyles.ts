import { makeStyles } from "@material-ui/core";

export const useChatFooterStyles = makeStyles(() => ({
    chatFooter: {
        display: "flex",
        alignItems: "center",
        position: "fixed",
        bottom: 3,
        width: 598,
        padding: 4,
        borderRight: 0,
        borderLeft: 0,
        borderBottom: 0
    },
    chatIcon: {
        "& .MuiIconButton-root": {
            width: 30,
            height: 30,
            paddingTop: 2,
            "& svg": {
                height: "0.82em"
            }
        }
    },
    emojiIcon: {
        right: 50,
        paddingTop: 5,
        "& .MuiIconButton-root": {
            width: 30,
            height: 30,
            "& svg": {
                height: "0.82em"
            }
        }
    }
}));
