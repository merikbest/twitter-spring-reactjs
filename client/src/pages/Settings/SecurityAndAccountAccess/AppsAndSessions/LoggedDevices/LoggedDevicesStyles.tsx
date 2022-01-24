import {makeStyles, Theme} from "@material-ui/core";

export const useLoggedDevicesStyles = makeStyles((theme: Theme) => ({
    infoItemWrapper: {
        "& .MuiTypography-h6": {
            fontWeight: 700,
        },
    },
}));
