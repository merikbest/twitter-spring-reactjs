import React from "react";

import { createMockRootState, mountWithStore } from "../../../util/test-utils/test-helper";
import ConnectToUsers from "../ConnectToUsers";
import { mockUsers } from "../../../util/test-utils/mock-test-data";
import Spinner from "../../Spinner/Spinner";
import UsersItem from "../../UsersItem/UsersItem";
import { LoadingStatus } from "../../../types/common";

describe("ConnectToUsers", () => {
    const mockRootState = createMockRootState(LoadingStatus.LOADED);

    it("should render loading spinner", () => {
        const wrapper = mountWithStore(
            <ConnectToUsers
                title={"Followers you know"}
                isUsersLoading={true}
                users={[]}
            />, mockRootState);

        expect(wrapper.find(Spinner).exists()).toBe(true);
    });

    it("should render UsersItem list", () => {
        const wrapper = mountWithStore(
            <ConnectToUsers
                title={"Followers you know"}
                isUsersLoading={true}
                users={mockUsers}
            />, mockRootState);

        expect(wrapper.find(Spinner).exists()).toBe(true);
        expect(wrapper.text().includes("Followers you know")).toBe(true);
        expect(wrapper.find(UsersItem).length).toEqual(2);
    });
});
