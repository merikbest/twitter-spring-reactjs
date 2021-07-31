import {NativeSelect, Select, Theme, withStyles} from "@material-ui/core";
import TextField from "@material-ui/core/TextField/TextField";

export const CustomSelect = withStyles((theme: Theme) => ({
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
