import {makeStyles, Theme} from "@material-ui/core";

export const useReplyModalStyles = makeStyles((theme: Theme) => ({
    container: {
        width: 598,
        height: "100%",
        padding: 0,
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
        marginLeft: 18,
        position: "absolute",
        borderLeft: "2px solid rgb(207, 217, 222)",
        height: "100%",
    },
    avatar: {
        zIndex: 1,
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
    image: {
        position: "relative",
        "& img": {
            objectFit: "cover",
            marginTop: 10,
            width: 495,
            height: 280,
            borderRadius: 20,
            borderColor: "#5b7083",
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
        color: "#5b7083",
    },
    replyLink: {
        textDecoration: "none",
        color: "rgb(27, 149, 224)",
    },
    addForm: {
        padding: "20px 20px 0px 20px",
    },
}));
