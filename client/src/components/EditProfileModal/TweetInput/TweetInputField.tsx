import {Theme, withStyles} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";

export const TweetInputField = withStyles((theme: Theme) => ({
    root: {
        '& .MuiOutlinedInput-input': {
            paddingTop: 26,
            paddingBottom: 10,
        },
        '& .MuiOutlinedInput-inputMultiline': {
            overflow: 'hidden',
            paddingTop: 10,
            paddingBottom: 10,
        },
    },
}))(TextField);
