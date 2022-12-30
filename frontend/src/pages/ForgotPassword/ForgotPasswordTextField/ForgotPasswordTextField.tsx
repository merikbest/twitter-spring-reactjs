import {Theme, withStyles} from "@material-ui/core";
import TextField from "@material-ui/core/TextField/TextField";

export const ForgotPasswordTextField = withStyles((theme: Theme) => ({
    root: {
        '& .MuiOutlinedInput-root': {
            width: 330,
            height: 35,
            borderRadius: 30,
            border: "1px solid #ccd6dd",
            padding: 0,
            paddingLeft: 15,
            "&.Mui-error": {
                '& fieldset': { boxShadow: "0 0 0 1px #dd2e44",  border: "1px solid #dd2e44", },
            },
            '&.Mui-focused': {
                '& fieldset': { borderWidth: 1, borderColor: theme.palette.primary.main },
            },
            '&:hover': {
                '& fieldset': { borderColor: 'transparent' },
            },
            '& fieldset': {
                borderColor: 'transparent',
                borderWidth: 1,
            },
        },
        '& .MuiOutlinedInput-input': {
            padding: '12px 14px 14px 5px',
        },
    },
}))(TextField);
