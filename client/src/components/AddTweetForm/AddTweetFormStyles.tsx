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
