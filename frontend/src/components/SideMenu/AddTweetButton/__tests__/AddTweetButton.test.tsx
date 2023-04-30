import React from "react";
import { Button, IconButton } from "@material-ui/core";

import { createMockRootState, mountWithStore } from "../../../../util/test-utils/test-helper";
import AddTweetButton from "../AddTweetButton";
import { LoadingStatus } from "../../../../types/common";
import AddTweetModal from "../../../AddTweetModal/AddTweetModal";
import CloseButton from "../../../CloseButton/CloseButton";

describe("AddTweetButton", () => {

    it("should open and close Add Tweet Modal  window", () => {
        const wrapper = mountWithStore(<AddTweetButton />, createMockRootState(LoadingStatus.SUCCESS));
        expect(wrapper.find(AddTweetModal).prop("visible")).toBe(false);
        wrapper.find(Button).simulate("click");
        expect(wrapper.find(AddTweetModal).prop("visible")).toBe(true);
        wrapper.find(AddTweetModal).find(CloseButton).find(IconButton).simulate("click");
        expect(wrapper.find(AddTweetModal).prop("visible")).toBe(false);
    });
});
