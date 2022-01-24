import {makeStyles, Theme} from "@material-ui/core";

export const useTwoFactorAuthenticationStyles = makeStyles((theme: Theme) => ({
    infoItem: {
        paddingBottom: 12,
        "& .MuiCheckbox-root": {
            float: "right",
            marginTop: -10,
        },
    },
}));
