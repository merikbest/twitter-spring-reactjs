import { makeStyles, Theme } from "@material-ui/core";

interface ProfileModalStylesProps {
    isProfileUpdated?: boolean;
}

export const useProfileModalStyles = makeStyles<Theme, ProfileModalStylesProps>((theme) => ({
    container: {
        width: 598,
        height: 600,
        marginTop: 5,
        position: "relative"
    },
    logoIcon: {
        margin: props => props.isProfileUpdated ? "180px auto 80px auto" : "0 auto",
        width: props => props.isProfileUpdated ? 54 : 30,
        "& svg": {
            fontSize: props => props.isProfileUpdated ? 50 : 34,
            color: theme.palette.primary.main
        }
    },
    title: {
        width: 250,
        margin: props => props.isProfileUpdated ? "0px auto" : "16px 0",
    }
}));
