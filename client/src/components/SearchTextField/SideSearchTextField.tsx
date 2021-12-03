import { Theme, withStyles } from '@material-ui/core';
import TextField from '@material-ui/core/TextField/TextField';

export const SideSearchTextField = withStyles((theme: Theme) => ({
    root: {
        '& .MuiOutlinedInput-root': {
            borderRadius: 30,
            backgroundColor: theme.palette.grey[200],
            padding: 0,
            paddingLeft: 15,
            '&.Mui-focused': {
                backgroundColor: theme.palette.background.paper,
                '& fieldset': { borderWidth: 1, borderColor: theme.palette.primary.main },
                '& svg path': {
                    fill: theme.palette.primary.main,
                },
            },
            "& .MuiInputAdornment-root": {
                "& svg" : {
                    color: theme.palette.text.secondary,
                    height: "1.25em"
                }
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
