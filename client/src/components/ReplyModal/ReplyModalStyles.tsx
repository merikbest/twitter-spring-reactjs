import {makeStyles, Theme} from "@material-ui/core";

export const useReplyModalStyles = makeStyles((theme: Theme) => ({
    dialogWrapper: {
        "& .MuiDialogTitle-root": {
            padding: "5px 15px",
            marginBottom: 0,
            borderBottom: `1px solid ${theme.palette.divider}`,
        },
    },
    container: {
        width: 598,
        height: "100%",
        padding: 0,
        "& #link": {
            color: theme.palette.primary.main
        },
    },
    modalWrapper: {
        fontSize: 15,
        display: 'flex',
        alignItems: 'flex-start',
        position: "relative",
        paddingTop: 15,
        paddingLeft: 20,
        flex: 1,
        borderTop: '0',
        borderLeft: '0',
        borderRight: '0',
        borderRadius: 0,
    },
    verticalLine: {
        marginLeft: 21,
        position: "absolute",
        borderLeft: `2px solid ${theme.palette.info.light}`,
        height: "100%",
    },
    avatar: {
        zIndex: 1,
        width: "46px !important",
        height: "46px !important",
        border: "1px solid white",
        marginRight: 15,
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        "span": {
            color: theme.palette.info.light,
        },
    },
    text: {
        color: 'inherit',
        textDecoration: 'none',
        '& #hashtag': {
            color: theme.palette.primary.main,
        },
    },
    image: {
        position: "relative",
        "& img": {
            objectFit: "cover",
            marginTop: 10,
            width: 495,
            height: 280,
            borderRadius: 20,
            borderColor: theme.palette.info.light,
        },
        "& .small": {
            width: 260,
            height: 152,
        },
    },
    replyWrapper: {
        marginTop: 12,
        zIndex: 2,
        fontSize: 15,
        color: theme.palette.info.light,
    },
    replyLink: {
        textDecoration: "none",
        color: theme.palette.primary.main,
    },
    addForm: {
        padding: "20px 20px 15px 20px",
    },
}));
