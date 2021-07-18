import React, {FC, ReactElement} from 'react';
import {useHistory} from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';

import {ArrowIcon} from "../../icons";
import {useBackButtonStyles} from "./BackButtonStyles";

export const BackButton: FC = (): ReactElement => {
    const classes = useBackButtonStyles();
    const history = useHistory();

    const handleClickButton = () => {
        history.goBack();
    };

    return (
        <div className={classes.container}>
            <IconButton onClick={handleClickButton} color="primary">
                <span>{ArrowIcon}</span>
            </IconButton>
        </div>
    );
};
