import React from "react";
import { ListItem } from "@material-ui/core";

import { createMockRootState, mountWithStore } from "../../../../../util/test-utils/test-helper";
import { LoadingStatus } from "../../../../../types/common";
import TweetListAction from "../TweetListAction";
import TweetListModal from "../TweetListModal/TweetListModal";
import ShareActionsItem from "../../ShareActionsItem/ShareActionsItem";

describe("TweetListAction", () => {
    it("should open TweetListModal", () => {
        const wrapper = mountWithStore(<TweetListAction />, createMockRootState(LoadingStatus.LOADED));
        expect(wrapper.find(TweetListModal).at(0).prop("visibleModalWindow")).toBe(false);
        wrapper.find(ShareActionsItem).find(ListItem).simulate("click");
        expect(wrapper.find(TweetListModal).at(0).prop("visibleModalWindow")).toBe(true);
    });
});
