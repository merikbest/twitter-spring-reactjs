import React from "react";

import { createMockRootState, mountWithStore } from "../../../../../../../../util/test-utils/test-helper";
import { LoadingStatus } from "../../../../../../../../types/common";
import { mockUserProfile } from "../../../../../../../../util/test-utils/mock-test-data";
import LockIcon from "../../../../../../../../components/LockIcon/LockIcon";
import MemberItemInfo from "../MemberItemInfo";

describe("MemberItemInfo", () => {
    const mockStore = createMockRootState(LoadingStatus.LOADED);

    it("should render correctly", () => {
        const wrapper = mountWithStore(
            <MemberItemInfo
                fullName={mockUserProfile.fullName}
                username={mockUserProfile.username}
                about={mockUserProfile.about}
                isPrivateProfile={false}
            />, mockStore);
        expect(wrapper.find(LockIcon).exists()).toBeFalsy();
        expect(wrapper.text().includes(mockUserProfile.fullName)).toBe(true);
        expect(wrapper.text().includes(mockUserProfile.username)).toBe(true);
    });

    it("should render LockIcon", () => {
        const wrapper = mountWithStore(
            <MemberItemInfo
                fullName={mockUserProfile.fullName}
                username={mockUserProfile.username}
                about={mockUserProfile.about}
                isPrivateProfile
            />, mockStore);
        expect(wrapper.find(LockIcon).exists()).toBeTruthy();
    });
});
