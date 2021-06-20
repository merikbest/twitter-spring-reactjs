import {Theme, withStyles} from "@material-ui/core";
import OutlinedInput from '@material-ui/core/OutlinedInput';

export const TweetInputField = withStyles((theme: Theme) => ({
    root: {
        padding: 0,
        '& .MuiOutlinedInput-root': {
            padding: 0,
        },
        '&:hover': {
            borderColor: "#fff",
            '& .MuiOutlinedInput-notchedOutline': {

            },
        },
        '& .MuiOutlinedInput-input': {
            paddingTop: "25px",
            paddingBottom: "13px",
            paddingLeft: "4px"
        },
    },
}))(OutlinedInput);
