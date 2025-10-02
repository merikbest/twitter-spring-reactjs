import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { selectUserDataId, selectUserDataIsMutedDirectMessages } from "../../../../store/ducks/user/selectors";
import { updateDirect } from "../../../../store/ducks/user/actionCreators";

export const useDirectMessages = () => {
    const dispatch = useDispatch();
    const myProfileId = useSelector(selectUserDataId);
    const isMutedDirectMessages = useSelector(selectUserDataIsMutedDirectMessages);
    const [checked, setChecked] = useState<boolean>(false);

    useEffect(() => {
        if (myProfileId) {
            setChecked(isMutedDirectMessages!);
        }
    }, [myProfileId, isMutedDirectMessages]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChecked(event.target.checked);
        dispatch(updateDirect({ mutedDirectMessages: event.target.checked }));
    };

    return { checked, handleChange };
};
