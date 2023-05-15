import { makeStyles } from "@material-ui/core";

export const useTaggedImageUsersStyles = makeStyles(() => ({
    taggedImageUsers: {
        display: "flex",
        alignItems: "center",
        "&:hover": {
            textDecoration: "underline",
            cursor: "pointer"
        },
        "& svg": {
            verticalAlign: "bottom",
            height: "1.25em"
        }
    }
}));
