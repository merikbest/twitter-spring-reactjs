import React from "react";

import { createMockRootState, mountWithStore } from "../../../../util/test-utils/test-helper";
import Spinner from "../../../../components/Spinner/Spinner";
import UsersItem from "../../../../components/UsersItem/UsersItem";
import UsersList from "../UsersList";

describe("UsersList", () => {
    it("should render correctly", () => {
        const wrapper = mountWithStore(<UsersList />, createMockRootState());
        expect(wrapper.find(UsersItem).length).toEqual(2);
        expect(wrapper.find(Spinner).exists()).toBe(true);
    });
});
