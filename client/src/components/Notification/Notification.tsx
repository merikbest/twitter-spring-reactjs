import React, {FC, ReactElement } from 'react'
import { useState } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import Alert, {Color} from '@material-ui/lab/Alert';

interface NotificationProps {
    children: (callback: (text: string, type: Color) => void) => ReactElement;
}

const Notification: FC<NotificationProps> = ({children}): ReactElement => {
    const [open, setOpen] = React.useState<boolean>(false);
    const [notificationObj, setNotificationObj] = useState<{ text: string; type: Color }>();

    const openNotification = (text: string, type: Color) => {
        setNotificationObj({
            text,
            type
        });
        setOpen(true);
    }

    return (
        <>
            {children(openNotification)}
            <Snackbar open={open} autoHideDuration={6000} onClose={() => setOpen(false)}>
                <Alert onClose={() => setOpen(false)} severity={notificationObj?.type}>
                    {notificationObj?.text}
                </Alert>
            </Snackbar>
        </>
    )
}

export default Notification;
