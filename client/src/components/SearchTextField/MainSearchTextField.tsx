import { Theme, withStyles } from '@material-ui/core';
import TextField from '@material-ui/core/TextField/TextField';

export const MainSearchTextField = withStyles((theme: Theme) => ({
    root: {
        '& .MuiOutlinedInput-root': {
            borderRadius: 30,
            backgroundColor: '#EFF3F4',
            padding: 19,
            width: 450,
            height: 20,
            marginTop: 6,
            '&.Mui-focused': {
                backgroundColor: theme.palette.common.white,
                '& fieldset': { borderWidth: 1, borderColor: theme.palette.primary.main },
                '& svg path': {
                    fill: theme.palette.primary.main,
                },
            },
            "& .MuiInputAdornment-root": {
                "& svg" : {
                    color: "rgb(83, 100, 113)",
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
