import {makeStyles, Theme} from "@material-ui/core";

export const useReplyModalStyles = makeStyles((theme: Theme) => ({
    container: {
        fontSize: 15,
        display: 'flex',
        alignItems: 'flex-start',
        paddingTop: 15,
        paddingLeft: 20,
        flex: 1,
        borderTop: '0',
        borderLeft: '0',
        borderRight: '0',
        borderRadius: 0,
    },
    avatar: {
        width: theme.spacing(6.5),
        height: theme.spacing(6.5),
        marginRight: 15,
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        "span": {
            color: "#5b7083",
        },
    },
    text: {
        color: 'inherit',
        textDecoration: 'none',
        '& #hashtag': {
            color: "rgb(27, 149, 224)",
        },
    },
}));
