import { makeStyles } from "@material-ui/core";

export const usePopperListUserCountStyles = makeStyles(() => ({
    popperListMembers: {
        marginLeft: 20,
        "& .MuiTypography-h6": {
            fontWeight: 700
        },
        "&:hover": {
            cursor: "pointer",
            textDecoration: "underline"
        }
    }
}));
