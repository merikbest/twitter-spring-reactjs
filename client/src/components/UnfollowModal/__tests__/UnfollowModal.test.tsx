import React from "react";
import {Button, Dialog} from "@material-ui/core";

import {createMockRootState, mountWithStore} from "../../../util/testHelper";
import {mockUsers} from "../../../util/mockData/mockData";
import UnfollowModal from "../UnfollowModal";
import {LoadingStatus} from "../../../store/types/common";

describe("UnfollowModal", () => {
    const mockRootState = createMockRootState(LoadingStatus.SUCCESS);

    it("should render correctly", () => {
        const wrapper = mountWithStore(
            <UnfollowModal 
                user={mockUsers[0]}
                visible={true}
                onClose={jest.fn()}
                handleUnfollow={jest.fn()}
            />, mockRootState);
        
        wrapper.find(Dialog).simulate("click");
        
        expect(wrapper.text().includes(`Unfollow ${mockUsers[0].fullName}`)).toBe(true);
        expect(wrapper.text().includes("Their Tweets will no longer show up in your home timeline.")).toBe(true);
        expect(wrapper.find(Button).at(0).text().includes("Cancel")).toBe(true);
        expect(wrapper.find(Button).at(1).text().includes("Unfollow")).toBe(true);
    });

    it("should render empty UnfollowModal", () => {
        const wrapper = mountWithStore(
            <UnfollowModal
                user={mockUsers[0]}
                visible={false}
                onClose={jest.fn()}
                handleUnfollow={jest.fn()}
            />, mockRootState);

        expect(wrapper.find(Dialog).exists()).toBeFalsy();
    });
});
