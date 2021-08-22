import {Theme, withStyles} from "@material-ui/core";
import TextField from "@material-ui/core/TextField/TextField";

export const PeopleSearchInput = withStyles((theme: Theme) => ({
    root: {
        '& .MuiOutlinedInput-root': {
            borderRadius: 30,
            border: "1px solid rgb(207, 217, 222)",
            padding: 0,
            paddingLeft: 15,
            marginLeft: 15,
            width: 385,
            '&.Mui-focused': {
                backgroundColor: '#fff',
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
            padding: "12px 0px",
        },
    },
}))(TextField);
