import {makeStyles} from "@material-ui/core";
import grey from "@material-ui/core/colors/grey";

export const useTweetStyles = makeStyles((theme) => ({
    tweetsHeader: {
        borderRadius: 0,
        borderTop: 0,
        borderLeft: 0,
        borderRight: 0,
        padding: '10px 15px',
        '& h6': {
            fontWeight: 800
        },
    },
    tweetFooter: {
        display: 'flex',
        position: 'relative',
        left: -13,
        justifyContent: 'space-between',
        width: 450
    },
    tweetUserName: {
        color: grey[500]
    },
    tweet: {
        cursor: 'pointer',
        paddingTop: 15,
        paddingLeft: 20,
        '&:hover': {
            backgroundColor: 'rgb(245, 248, 250)'
        }
    },
    tweetAvatar: {
        width: theme.spacing(5),
        height: theme.spacing(5),
    }
}));
