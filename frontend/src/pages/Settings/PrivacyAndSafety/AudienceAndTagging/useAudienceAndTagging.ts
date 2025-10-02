import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { selectUserDataIsPrivateProfile } from "../../../../store/ducks/user/selectors";
import { updatePrivateProfile } from "../../../../store/ducks/user/actionCreators";

export const useAudienceAndTagging = () => {
    const dispatch = useDispatch();
    const isPrivateProfile = useSelector(selectUserDataIsPrivateProfile);
    const [checked, setChecked] = useState<boolean>(false);

    useEffect(() => {
        if (isPrivateProfile) {
            setChecked(isPrivateProfile);
        }
    }, [isPrivateProfile]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChecked(event.target.checked);
        dispatch(updatePrivateProfile({ privateProfile: event.target.checked }));
    };

    return { checked, handleChange };
};
