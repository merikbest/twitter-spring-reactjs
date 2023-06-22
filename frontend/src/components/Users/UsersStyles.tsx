import { makeStyles } from "@material-ui/core";

export const useUsersStyles = makeStyles((theme) => ({
    container: {
        backgroundColor: theme.palette.secondary.main,
        borderRadius: 16,
        marginTop: 20,
        "& .MuiList-root": {
            "& .MuiListItemText-primary": {
                color: "black",
                "&:hover": {
                    textDecoration: "underline"
                }
            },
            "& a": {
                textDecoration: "none"
            }
        }
    },
    header: {
        borderTop: 0,
        borderLeft: 0,
        borderRight: 0,
        backgroundColor: "transparent",
        padding: "13px 18px",
        borderBottom: `1px solid ${theme.palette.divider}`
    },
    footer: {
        padding: 16,
        borderRadius: "0px 0px 16px 16px",
        cursor: "pointer",
        "& .MuiTypography-body1": {
            color: theme.palette.primary.main
        },
        "&:hover": {
            backgroundColor: theme.palette.secondary.dark
        }
    }
}));
