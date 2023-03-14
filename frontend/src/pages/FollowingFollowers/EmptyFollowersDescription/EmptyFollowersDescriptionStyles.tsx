import { makeStyles } from "@material-ui/core";

export const useEmptyFollowersDescriptionStyles = makeStyles((theme) => ({
    content: {
        margin: "40px 20px",
        textAlign: "center",
        "& .MuiTypography-subtitle1": {
            marginTop: 12,
            marginBottom: 16
        }
    }
}));
