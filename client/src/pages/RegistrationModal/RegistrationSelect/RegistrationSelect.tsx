import {Select, Theme, withStyles} from "@material-ui/core";

export const RegistrationSelect = withStyles((theme: Theme) => ({
    root: {
        '&$focused': {
            boxShadow: `0 0 0 2px ${theme.palette.primary.main}`,
        },
    },
    select: {
        '&:hover': {
            backgroundColor: theme.palette.common.white,
        },
        '&:focus': {
            backgroundColor: theme.palette.common.white,
        },
    },
}))(Select);
