import React, {FC, ReactElement, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";

import {fetchUsers, resetUsersState} from "../../store/ducks/users/actionCreators";
import {selectPagesCount, selectUsers, selectUsersIsLoading} from "../../store/ducks/users/selectors";
import ConnectToUsers from "../../components/ConnectToUsers/ConnectToUsers";
import {withDocumentTitle} from "../../hoc/withDocumentTitle";
import InfiniteScrollWrapper from "../../components/InfiniteScrollWrapper/InfiniteScrollWrapper";

const Connect: FC = (): ReactElement => {
    const dispatch = useDispatch();
    const users = useSelector(selectUsers);
    const isUsersLoading = useSelector(selectUsersIsLoading);
    const pagesCount = useSelector(selectPagesCount);

    useEffect(() => {
       loadUsers(0);
        window.scrollTo(0, 0);
    }, []);

    const loadUsers = (page: number): void => {
        dispatch(fetchUsers(page));
    };

    return (
        <InfiniteScrollWrapper dataLength={users.length} pagesCount={pagesCount} loadItems={loadUsers}>
            <ConnectToUsers
                title={"Suggested for you"}
                isUsersLoading={isUsersLoading}
                users={users}
            />
        </InfiniteScrollWrapper>
    );
};

export default withDocumentTitle(Connect)("Connect");
