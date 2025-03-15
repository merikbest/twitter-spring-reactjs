import { makeStyles } from "@material-ui/core";

export const useUserTweetsStyles = makeStyles((theme) => ({
    textWrapper: {
        margin: "40px 20px",
        textAlign: "center",
        "& .MuiTypography-subtitle1": {
            marginTop: 12
        }
    },
    button: {
        marginTop: 15
    }
}));
