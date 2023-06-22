import { makeStyles } from "@material-ui/core";

export const useHomeStyles = makeStyles((theme) => ({
    header: {
        justifyContent: "space-between",
        "& .MuiTypography-h5": {
            marginLeft: 16,
            display: "inline-block",
            verticalAlign: "middle"
        }
    },
    headerIcon: {
        paddingRight: 10
    },
    addForm: {
        padding: "72px 20px 0px 20px"
    },
    divider: {
        height: 12,
        backgroundColor: theme.palette.divider
    }
}));
