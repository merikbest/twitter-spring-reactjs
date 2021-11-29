import {Theme, withStyles} from "@material-ui/core";
import TextField from "@material-ui/core/TextField/TextField";

export const MessageInput = withStyles((theme: Theme) => ({
    root: {
        '& .MuiOutlinedInput-root': {
            marginTop: 2,
            borderRadius: 20,
            padding: "3px 14px",
            border: `1px solid ${theme.palette.info.light}`,
            width: 490,
            '&.Mui-focused': {
                backgroundColor: theme.palette.common.white,
                '& fieldset': { borderWidth: 1, borderColor: theme.palette.primary.main },
                '& svg path': {
                    fill: theme.palette.primary.main,
                },
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
            "&::placeholder": {
                color: theme.palette.text.primary,
            },
        },
    },
}))(TextField);
