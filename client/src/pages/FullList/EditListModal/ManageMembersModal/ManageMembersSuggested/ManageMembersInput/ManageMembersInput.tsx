import {Theme, withStyles} from "@material-ui/core";
import TextField from "@material-ui/core/TextField/TextField";

export const ManageMembersInput = withStyles((theme: Theme) => ({
    root: {
        '& .MuiOutlinedInput-root': {
            borderRadius: 30,
            border: `1px solid ${theme.palette.info.light}`,
            padding: 0,
            paddingLeft: 15,
            marginTop: 8,
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
            "& .MuiInputAdornment-root": {
                "& svg" : {
                    color: theme.palette.text.secondary,
                    height: "1.25em"
                }
            },
        },
        '& .MuiOutlinedInput-input': {
            padding: "12px 0px",
        },
    },
}))(TextField);
