import { makeStyles } from "@material-ui/core";

export const useSetupProfileModalStyles = makeStyles(() => ({
    container: {
        "& .MuiDialog-root": {
            height: 666,
            marginTop: 92
        },
        "& .MuiDialog-container": {
            padding: "0 32px"
        }
    }
}));
