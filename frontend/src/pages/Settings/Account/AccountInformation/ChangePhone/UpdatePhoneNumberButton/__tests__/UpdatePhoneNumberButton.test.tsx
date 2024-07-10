import React from "react";

import { createMockRootState, mountWithStore } from "../../../../../../../util/test-utils/test-helper";
import ChangePhoneModal from "../ChangePhoneModal/ChangePhoneModal";
import { LoadingStatus } from "../../../../../../../types/common";
import UpdatePhoneNumberButton from "../UpdatePhoneNumberButton";

describe("UpdatePhoneNumberButton", () => {
    const mockStore = createMockRootState(LoadingStatus.LOADED);

    it("should open and close ChangePhoneModal", () => {
        const wrapper = mountWithStore(<UpdatePhoneNumberButton />, mockStore);
        wrapper.find("#openChangePhoneModal").simulate("click");
        expect(wrapper.find(ChangePhoneModal).exists()).toBe(true);
        wrapper.find(ChangePhoneModal).find(".MuiBackdrop-root").simulate("click");
    });
});
