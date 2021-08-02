import {Select, Theme, withStyles} from "@material-ui/core";

export const RegistrationSelect = withStyles((theme: Theme) => ({
    root: {
        '&$focused': {
            boxShadow: "0 0 0 2px rgb(29, 161, 242)",
        },
    },
    select: {
        '&:hover': {
            backgroundColor: '#fff',
        },
        '&:focus': {
            backgroundColor: '#fff',
        },
    },
}))(Select);
