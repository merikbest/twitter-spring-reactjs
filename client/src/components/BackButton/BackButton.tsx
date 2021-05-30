import React, {FC, ReactElement} from 'react';
import {useHistory} from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

export const BackButton: FC = (): ReactElement => {
    const history = useHistory();

    const handleClickButton = () => {
        history.goBack();
    };

    return (
        <IconButton onClick={handleClickButton} style={{marginRight: 20}} color="primary">
            <ArrowBackIcon/>
        </IconButton>
    );
};
