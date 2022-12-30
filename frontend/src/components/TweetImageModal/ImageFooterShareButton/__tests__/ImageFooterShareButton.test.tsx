import React from "react";

import {createMockRootState, mountWithStore} from "../../../../util/testHelper";
import {LoadingStatus} from "../../../../store/types/common";
import ImageFooterShareButton from "../ImageFooterShareButton";

describe("ImageFooterShareButton", () => {
    it("should render correctly", () => {
        const wrapper = mountWithStore(<ImageFooterShareButton/>, createMockRootState(LoadingStatus.SUCCESS));
        expect(wrapper.find("#shareIcon").exists()).toBeTruthy();
    });
});
