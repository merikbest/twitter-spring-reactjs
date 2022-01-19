import {makeStyles, Theme} from "@material-ui/core";

export const useLocationInformationStyles = makeStyles((theme: Theme) => ({
    infoItemWrapper: {
        padding: "12px 16px"
    },
    infoItem: {
        paddingBottom: 12,
        "& .MuiCheckbox-root": {
            float: "right",
            marginTop: -10,
        },
    },
    deleteLocationInformation: {
        textAlign: "center",
        padding: 16,
        cursor: "pointer",
        "& .MuiTypography-body1": {
            color: theme.palette.error.main,
        },
        "&:hover": {
            backgroundColor: "rgba(244, 33, 46, 0.1)"
        }
    },
}));
