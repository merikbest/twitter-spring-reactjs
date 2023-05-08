import { makeStyles } from "@material-ui/core";

export const useImageDescriptionStyles = makeStyles((theme) => ({
    altButton: {
        position: "absolute",
        fontWeight: 500,
        color: theme.palette.common.white,
        backgroundColor: theme.palette.common.black,
        opacity: 0.75,
        marginTop: -35,
        marginLeft: 15,
        paddingLeft: 4,
        paddingRight: 4,
        borderRadius: 4
    },
    popover: {
        width: 300,
        maxHeight: 400,
        boxShadow: "rgb(101 119 134 / 20%) 0px 0px 15px, rgb(101 119 134 / 15%) 0px 0px 3px 1px",
        borderRadius: 16
    },
    popoverContainer: {
        margin: 32,
        "& .MuiTypography-h3": {
            textAlign: "center"
        },
        "& .MuiTypography-subtitle1": {
            marginTop: 8,
            marginBottom: 24
        }
    }
}));
