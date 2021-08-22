import {Theme, withStyles} from "@material-ui/core";
import TextField from "@material-ui/core/TextField/TextField";

export const MessagesModalInput = withStyles((theme: Theme) => ({
    root: {
        '& .MuiOutlinedInput-root': {
            '&.Mui-focused': {
                '& svg path': {
                    fill: theme.palette.primary.main,
                },
            },
            '& fieldset': {
                border: 0,
            },
        },
        '& .MuiOutlinedInput-input': {
            padding: '12px 14px 14px 5px',
        },
    },
}))(TextField);
