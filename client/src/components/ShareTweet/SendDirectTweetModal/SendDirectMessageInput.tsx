import {Theme, withStyles} from "@material-ui/core";
import TextField from "@material-ui/core/TextField/TextField";

export const SendDirectMessageInput = withStyles((theme: Theme) => ({
    root: {
        '& .MuiOutlinedInput-root': {
            marginTop: 2,
            borderRadius: 20,
            border: `1px solid ${theme.palette.info.light}`,
            width: 540,
            padding: 10,
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
