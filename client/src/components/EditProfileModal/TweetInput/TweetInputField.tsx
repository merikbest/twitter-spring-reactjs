import {Theme, withStyles} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";

export const TweetInputField = withStyles((theme: Theme) => ({
    root: {
        '& .MuiOutlinedInput-input': {
            paddingTop: 26,
            paddingBottom: 10,
        },
        "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "rgba(0, 0, 0, 0.23)",
        },
        "&:hover .Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "rgb(29, 161, 242)",
        },
        '& .MuiOutlinedInput-inputMultiline': {
            overflow: 'hidden',
            paddingTop: 10,
            paddingBottom: 10,
        },
    },
}))(TextField);
