import { makeStyles } from "@material-ui/core";

export const useLoginStyles = makeStyles((theme) => ({
    container: {
        width: 334,
        margin: "0 auto",
        "& svg": {
            marginTop: 20,
            color: theme.palette.primary.main,
            fontSize: 45
        },
        "& .MuiTypography-h4": {
            fontWeight: 700,
            margin: "18px 0px"
        }
    },
    error: {
        padding: "12px 16px",
        borderRadius: 12,
        marginBottom: 12,
        backgroundColor: "rgb(255, 210, 218)"
    },
    input: {
        marginBottom: 24
    },
    footer: {
        marginTop: 32,
        textAlign: "center",
        "& a": {
            textDecoration: "none",
            color: theme.palette.primary.main,
            "&:hover": {
                textDecoration: "underline"
            }
        }
    }
}));
