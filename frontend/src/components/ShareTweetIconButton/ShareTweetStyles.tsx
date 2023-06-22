import { makeStyles } from "@material-ui/core";

export const useShareTweetModalStyles = makeStyles((theme) => ({
    root: {
        position: "relative",
        "& .MuiIconButton-root": {
            "& svg": {
                color: theme.palette.text.secondary,
                width: (props: { isFullTweet?: boolean }) => props.isFullTweet && "1.406rem",
                height: (props: { isFullTweet?: boolean }) => props.isFullTweet && "1.406rem"
            }
        }
    },
    dropdown: {
        padding: 0,
        position: "absolute",
        width: 290,
        height: 208,
        top: 10,
        right: 10,
        zIndex: 2,
        borderRadius: 4,
        backgroundColor: theme.palette.background.paper,
        boxShadow: "rgb(101 119 134 / 20%) 0px 0px 15px, rgb(101 119 134 / 15%) 0px 0px 3px 1px",
        "& .MuiListItem-root": {
            height: 52,
            "& svg": {
                marginRight: 15
            },
            "&:hover": {
                cursor: "pointer",
                backgroundColor: theme.palette.secondary.main
            }
        }
    }
}));
