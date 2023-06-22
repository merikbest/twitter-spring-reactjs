import { makeStyles } from "@material-ui/core";

export const useReplyModalStyles = makeStyles((theme) => ({
    dialogWrapper: {
        top: "-10%"
    },
    container: {
        width: 598,
        height: "100%",
        padding: 0,
        "& #link": {
            color: theme.palette.primary.main
        }
    },
    modalWrapper: {
        display: "flex",
        alignItems: "flex-start",
        position: "relative",
        paddingTop: 15,
        paddingLeft: 20,
        flex: 1,
        borderTop: 0,
        borderLeft: 0,
        borderRight: 0,
        borderRadius: 0
    },
    verticalLine: {
        marginLeft: 21,
        position: "absolute",
        borderLeft: `2px solid ${theme.palette.divider}`,
        height: "100%"
    },
    avatar: {
        zIndex: 1,
        border: `1px solid ${theme.palette.divider}`,
        marginRight: 15
    },
    header: {
        display: "flex",
        justifyContent: "space-between",
        "span": {
            color: theme.palette.info.light
        }
    },
    text: {
        color: "inherit",
        textDecoration: "none",
        "& #hashtag": {
            color: theme.palette.primary.main
        }
    },
    image: {
        position: "relative",
        "& img": {
            objectFit: "cover",
            marginTop: 10,
            width: 495,
            height: 280,
            borderRadius: 20,
            borderColor: theme.palette.info.light
        },
        "& .small": {
            width: 260,
            height: 152
        }
    },
    replyWrapper: {
        marginTop: 12,
        zIndex: 2
    },
    addForm: {
        padding: "20px 20px 15px 20px"
    }
}));
