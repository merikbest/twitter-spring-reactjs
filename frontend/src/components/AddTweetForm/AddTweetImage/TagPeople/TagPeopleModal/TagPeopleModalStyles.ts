import { makeStyles } from "@material-ui/core";

export const useTagPeopleModalStyles = makeStyles((theme) => ({
    header: {
        margin: 0,
        border: 0
    },
    button: {
        marginLeft: "auto"
    },
    content: {
        height: 550,
        width: 598,
        padding: 0,
        "& .MuiListItem-root.Mui-selected": {
            backgroundColor: theme.palette.secondary.main
        }
    }
}));
