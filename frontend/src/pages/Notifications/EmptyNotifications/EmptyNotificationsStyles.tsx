import { makeStyles } from "@material-ui/core";

export const useEmptyNotificationsStyles = makeStyles(() => ({
    infoWindow: {
        textAlign: "center",
        "& .MuiTypography-h4": {
            marginTop: 30
        }
    }
}));
