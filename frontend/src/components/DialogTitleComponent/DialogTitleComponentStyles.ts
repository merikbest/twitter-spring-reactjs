import { makeStyles, Theme } from "@material-ui/core";

interface DialogTitleComponentProps {
    borderBottom?: boolean;
}

export const useDialogTitleComponentStyles = makeStyles<Theme, DialogTitleComponentProps>(() => ({
    dialogTitle: (props) => (props.borderBottom ? { borderBottom: 0 } : {}),
    button: {
        marginLeft: "auto"
    }
}));
