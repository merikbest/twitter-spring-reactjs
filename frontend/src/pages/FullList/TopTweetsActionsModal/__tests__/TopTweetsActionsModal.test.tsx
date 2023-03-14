import React from "react";
import { ClickAwayListener, IconButton } from "@material-ui/core";

import { createMockRootState, mountWithStore } from "../../../../util/test-utils/test-helper";
import TopTweetsActionsModal from "../TopTweetsActionsModal";
import HoverAction from "../../../../components/HoverAction/HoverAction";
import { LoadingStatus } from "../../../../types/common";

describe("TopTweetsActionsModal", () => {
    const mockStore = createMockRootState(LoadingStatus.LOADED);

    it("should render TopTweetsActionsModal correctly", () => {
        const wrapper = mountWithStore(<TopTweetsActionsModal />, mockStore);
        wrapper.find(IconButton).simulate("click");

        expect(wrapper.text().includes("See top Tweets")).toBe(true);
        expect(wrapper.text().includes("You’re seeing top Tweets first. Latest Tweets will show up as they happen.")).toBe(true);
        expect(wrapper.text().includes("Don’t show these Tweets in Home")).toBe(true);
        expect(wrapper.text().includes("Top Tweets from this List will no longer show up in your Home timeline.")).toBe(true);
    });

    it("should click away TopTweetsActionsModal", () => {
        const wrapper = mountWithStore(<TopTweetsActionsModal />, mockStore);
        // @ts-ignore
        wrapper.find(ClickAwayListener).prop("onClickAway")(jest.fn());

        expect(wrapper.find(ClickAwayListener).exists()).toBeTruthy();
    });

    it("should hover IconButton", () => {
        const wrapper = mountWithStore(<TopTweetsActionsModal />, mockStore);
        wrapper.find(IconButton).simulate("mouseenter");

        expect(wrapper.find(HoverAction).exists()).toBeTruthy();
    });
});
