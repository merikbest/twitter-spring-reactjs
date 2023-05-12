import { makeStyles } from "@material-ui/core";

export const useFullListUserCountStyles = makeStyles(() => ({
    listMembers: {
        marginLeft: 20,
        "&:hover": {
            cursor: "pointer",
            textDecoration: "underline"
        }
    }
}));
