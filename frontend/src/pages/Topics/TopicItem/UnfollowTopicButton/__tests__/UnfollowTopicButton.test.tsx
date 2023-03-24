import React from "react";
import { Button } from "@material-ui/core";

import { createMockRootState, mountWithStore } from "../../../../../util/test-utils/test-helper";
import UnfollowModal from "../../../../../components/UnfollowModal/UnfollowModal";
import UnfollowTopicButton from "../UnfollowTopicButton";

describe("UnfollowTopicButton", () => {

    it("should click and render UnfollowModal", () => {
        const wrapper = mountWithStore(
            <UnfollowTopicButton topicName={"test"} onClickFollowTopic={jest.fn()} />,
            createMockRootState());
        expect(wrapper.find(UnfollowModal).prop("visible")).toBe(false);
        wrapper.find(Button).at(0).simulate("click");
        expect(wrapper.find(UnfollowModal).prop("visible")).toBe(true);
    });

    it("should click close UnfollowModal", () => {
        const wrapper = mountWithStore(
            <UnfollowTopicButton topicName={"test"} onClickFollowTopic={jest.fn()} />,
            createMockRootState());
        wrapper.find(Button).at(0).simulate("click");
        expect(wrapper.find(UnfollowModal).prop("visible")).toBe(true);
        wrapper.find(UnfollowModal).find(Button).at(0).simulate("click");
        expect(wrapper.find(UnfollowModal).prop("visible")).toBe(false);
    });

    it("should hover UnfollowTopicButton", () => {
        const wrapper = mountWithStore(
            <UnfollowTopicButton topicName={"test"} onClickFollowTopic={jest.fn()} />,
            createMockRootState());
        wrapper.find(Button).simulate("mouseover");
        expect(wrapper.find(Button).text().includes("Unfollow")).toBe(true);
        wrapper.find(Button).simulate("mouseleave");
        expect(wrapper.find(Button).text().includes("Following")).toBe(true);
    });
});
