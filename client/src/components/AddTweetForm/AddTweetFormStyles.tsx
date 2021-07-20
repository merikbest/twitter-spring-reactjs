import {makeStyles, Theme} from "@material-ui/core";

export const useAddTweetFormStyles = makeStyles((theme: Theme) => ({
    content: {
        display: 'flex',
        width: '100%',
    },
    contentAvatar: {
        width: theme.spacing(6.5),
        height: theme.spacing(6.5),
        marginRight: 15,
    },
    contentTextarea: {
        width: '100%',
        border: 0,
        fontSize: 20,
        outline: 'none',
        fontFamily: 'inherit',
        resize: 'none',
    },
    image: {
        position: 'relative',
        '& img': {
            marginLeft: "58px",
            objectFit: "cover",
            marginTop: 10,
            width: 504,
            height: 280,
            borderRadius: 20,
            borderColor: "#5b7083",
        },
        "& svg": {
            verticalAlign: "top",
            fill: '#fff',
            height: "0.75em",
        },
    },
    imageSmall: {
        position: 'relative',
        '& img': {
            marginLeft: "58px",
            objectFit: "cover",
            marginTop: 10,
            width: 260,
            height: 152,
            borderRadius: 20,
            borderColor: "#5b7083",
        },
        "& svg": {
            verticalAlign: "top",
            fill: '#fff',
            height: "0.75em",
        },
    },
    imageRemove: {
        padding: 6,
        top: 15,
        left: 65,
        position: 'absolute',
        backgroundColor: '#322C28 !important',
    },
    footer: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    footerWrapper: {
        display: 'flex',
        position: 'relative',
        paddingTop: 5,
        paddingBottom: 5,
        left: -13,
        justifyContent: 'space-between',
        maxWidth: 450,
        marginTop: 10,
        paddingLeft: 70,
    },
    footerImage: {
        "& .MuiIconButton-root": {
            marginBottom: 6,
            width: 40,
            height: 40,
            "& span": {
                paddingBottom: 3,
                "& svg" : {
                    verticalAlign: "bottom",
                    height: "0.9em",
                }
            },
        },
    },
    footerAddForm: {
        display: 'flex',
        alignItems: 'center',
    },
    footerAddFormCircleProgress: {
        position: 'relative',
        width: 20,
        height: 20,
        margin: '0 10px',
        '& .MuiCircularProgress-root': {
            position: 'absolute',
        },
    },
}));
