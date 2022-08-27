import React from "react";
import {Button} from "@material-ui/core";

import {createMockRootState, mountWithStore} from "../../../../util/testHelper";
import FollowingFollowers from "../../FollowingFollowers";
import EmptyFollowersDescription from "../EmptyFollowersDescription";

describe("FollowingFollowers", () => {
    const mockStore = createMockRootState();
    const mockUsername = "test_username";

    it("should render my profile following empty message", () => {
        const wrapper = createWrapper(0, true);
        expect(wrapper.text().includes("You aren’t following anyone yet")).toBe(true);
        expect(wrapper.text().includes("When you do, they’ll be listed here and you’ll see their Tweets in your timeline.")).toBe(true);
        expect(wrapper.find(Button).at(0).text()).toEqual("Find people to follow");
    });

    it("should render my profile followers empty message", () => {
        const wrapper = createWrapper(1, true);
        expect(wrapper.text().includes("You don’t have any followers yet")).toBe(true);
        expect(wrapper.text().includes("When someone follows you, you’ll see them here.")).toBe(true);
    });

    it("should render user profile following empty message", () => {
        const wrapper = createWrapper(0, false);
        expect(wrapper.text().includes(`@${mockUsername} isn’t following anyone`)).toBe(true);
        expect(wrapper.text().includes("When they do, they’ll be listed here.")).toBe(true);
    });

    it("should render user profile followers empty message", () => {
        const wrapper = createWrapper(1, false);
        expect(wrapper.text().includes(`@${mockUsername} doesn’t have any followers`)).toBe(true);
        expect(wrapper.text().includes("When someone follows them, they’ll be listed here.")).toBe(true);
    });

    const createWrapper = (activeTab: number, isMyProfile: boolean) => {
        return mountWithStore(
            <EmptyFollowersDescription
                activeTab={activeTab}
                isMyProfile={isMyProfile}
                username={mockUsername}
            />, mockStore);
    };
});
