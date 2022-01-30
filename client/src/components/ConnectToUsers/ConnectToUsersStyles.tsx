import {makeStyles, Theme} from "@material-ui/core";

export const useConnectToUsersStyles = makeStyles((theme: Theme) => ({
    header: {
        display: 'flex',
        alignItems: 'center',
        flex: 1,
        borderTop: 0,
        borderLeft: 0,
        borderRight: 0,
        borderRadius: 0,
        '& .MuiTypography-h5': {
            margin: "10px 20px",
        },
    },
}));
