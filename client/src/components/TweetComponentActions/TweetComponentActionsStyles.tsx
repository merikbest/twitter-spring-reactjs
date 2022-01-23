import {createStyles, makeStyles, Theme} from "@material-ui/core";

export const useTweetComponentMoreStyles = makeStyles((theme: Theme) => createStyles({
    root: {
        position: 'relative',
        "& .MuiIconButton-root": {
            marginRight: (props: { isFullTweet: boolean }) => props.isFullTweet ? 0 : 8,
            color: theme.palette.text.secondary,
        },
    },
    dropdown: {
        padding: 0,
        position: 'absolute',
        width: 352,
        minHeight: 208,
        top: 10,
        right: 10,
        zIndex: 2,
        borderRadius: 4,
        backgroundColor: theme.palette.background.paper,
        boxShadow: "rgb(101 119 134 / 20%) 0px 0px 15px, rgb(101 119 134 / 15%) 0px 0px 3px 1px",
        "& .MuiList-root": {
            padding: 0,
        },
        "& #delete": {
            color: theme.palette.error.main,
            "& svg": {
                fill: theme.palette.error.main,
            },
        },
        '& .MuiListItem-root': {
            height: 52,
            '&:hover': {
                cursor: 'pointer',
                backgroundColor: theme.palette.secondary.main,
            },
            "& svg": {
                verticalAlign: "bottom",
                marginRight: 15,
                width: 20,
                height: 20,
                fill: theme.palette.text.secondary,
            },
        },
    },
}));
