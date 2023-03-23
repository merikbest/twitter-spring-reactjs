import React from "react";
import { createMemoryHistory } from "history";
import { Avatar, ListItem } from "@material-ui/core";

import { createMockRootState, mountWithStore } from "../../../../util/test-utils/test-helper";
import UserSearchResult from "../UserSearchResult";
import { mockListsOwnerMember } from "../../../../util/test-utils/mock-test-data";
import { PROFILE } from "../../../../constants/path-constants";

describe("UserSearchResult", () => {
    it("should click user profile", () => {
        const history = createMemoryHistory();
        const pushSpy = jest.spyOn(history, "push");
        const wrapper = mountWithStore(<UserSearchResult user={mockListsOwnerMember[0]} recentSearch />, createMockRootState(), history);
        expect(wrapper.find(Avatar).prop("src")).toBe(mockListsOwnerMember[0].avatar);
        expect(wrapper.text().includes(mockListsOwnerMember[0].fullName)).toBe(true);
        expect(wrapper.text().includes(mockListsOwnerMember[0].username)).toBe(true);
        wrapper.find(ListItem).simulate("click");
        expect(pushSpy).toHaveBeenCalledWith(`${PROFILE}/${mockListsOwnerMember[0].id}`);
    });
});
