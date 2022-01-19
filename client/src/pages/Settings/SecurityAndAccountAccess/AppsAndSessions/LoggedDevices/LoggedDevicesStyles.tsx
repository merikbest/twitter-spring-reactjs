import {makeStyles, Theme} from "@material-ui/core";

export const useLoggedDevicesStyles = makeStyles((theme: Theme) => ({
    infoItemWrapper: {
        padding: "12px 16px",
        "& .MuiTypography-h6": {
            fontWeight: 700,
        },
    },
}));
