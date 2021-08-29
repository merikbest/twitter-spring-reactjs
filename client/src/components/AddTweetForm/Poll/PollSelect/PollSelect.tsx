import {Select, Theme, withStyles} from "@material-ui/core";

export const PollSelect = withStyles((theme: Theme) => ({
    root: {
        padding: "25px 32px 11px 14px",
        '&$focused': {
            boxShadow: "0 0 0 2px rgb(29, 161, 242)",
        },
        '&:hover': {
            backgroundColor: '#fff',
        },
    },
    focused: {},
    select: {
        '&:hover': {
            backgroundColor: '#fff',
        },
        '&:focus': {
            backgroundColor: '#fff',
        },
    },
}))(Select);
