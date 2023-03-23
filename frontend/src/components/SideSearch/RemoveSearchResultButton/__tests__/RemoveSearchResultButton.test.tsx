import React from "react";
import { IconButton } from "@material-ui/core";

import { createMockRootState, mockDispatch, mountWithStore } from "../../../../util/test-utils/test-helper";
import RemoveSearchResultButton from "../RemoveSearchResultButton";
import { SEARCH_TERMS } from "../../../../constants/common-constants";
import { SearchActionsType } from "../../../../store/ducks/search/contracts/actionTypes";

describe("RemoveSearchResultButton", () => {
    let mockDispatchFn: jest.Mock;

    beforeEach(() => {
        mockDispatchFn = mockDispatch();
    });

    it("should click remove search result", () => {
        localStorage.setItem(SEARCH_TERMS, JSON.stringify({ text: ["test"], tags: ["#test"], users: [1, 2] }));
        const wrapper = mountWithStore(<RemoveSearchResultButton stateItem={"text"} item={"test"} />, createMockRootState());
        wrapper.find(IconButton).simulate("click");
        expect(mockDispatchFn).nthCalledWith(1, {
            payload: { stateItem: "text", item: "test" },
            type: SearchActionsType.DELETE_RECENT_SEARCH_RESULT
        });
    });
});
