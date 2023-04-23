import { makeStyles } from "@material-ui/core";

export const useAddDescriptionModalStyles = makeStyles((theme) => ({
    header: {
        margin: 0,
        border: 0
    },
    button: {
        marginLeft: "auto"
    },
    content: {
        height: 666,
        width: 598,
        padding: 0,
        "& .MuiListItem-root.Mui-selected": {
            backgroundColor: theme.palette.secondary.main
        }
    },
    contentImage: {
        display: "flex",
        justifyContent: "center",
        "& img": {
            height: 500
        }
    },
    inputWrapper: {
        width: 560,
        height: 22,
        display: "flex",
        justifyContent: "space-between"
    }
}));
