import {makeStyles, Theme} from "@material-ui/core";

export const useChatHeaderStyles = makeStyles((theme: Theme) => ({
    chatHeader: {
        width: 598,
    },
    chatAvatar: {
        width: theme.spacing(4),
        height: theme.spacing(4),
        margin: "0px 15px",
    },
    iconGroup: {
        marginLeft: "auto",
        marginRight: 10,
    },
    icon: {
        display: "inline-block",
        "& .MuiIconButton-root": {
            padding: 7,
            "& svg": {
                color: theme.palette.primary.main,
                verticalAlign: "bottom",
                height: "0.90em",
            },
        },
    },
}));
