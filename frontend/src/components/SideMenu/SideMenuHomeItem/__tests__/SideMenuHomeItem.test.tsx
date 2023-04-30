import React from "react";

import { createMockRootState, mountWithStore } from "../../../../util/test-utils/test-helper";
import { LoadingStatus } from "../../../../types/common";
import SideMenuHomeItem from "../SideMenuHomeItem";
import { HOME } from "../../../../constants/path-constants";
import { HomeIcon, HomeIconFilled } from "../../../../icons";

describe("SideMenuHomeItem", () => {

    it("should render homeNotification", () => {
        const wrapper = mountWithStore(
            <SideMenuHomeItem
                title={"Home"}
                path={HOME}
                icon={HomeIcon}
                filledIcon={HomeIconFilled}
        />, createMockRootState(LoadingStatus.SUCCESS));
        expect(wrapper.find("#homeNotification").exists()).toBeFalsy();
    });
});
