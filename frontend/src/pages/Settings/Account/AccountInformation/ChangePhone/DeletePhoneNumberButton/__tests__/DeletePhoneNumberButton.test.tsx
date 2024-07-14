import React from "react";

import { createMockRootState, mountWithStore } from "../../../../../../../util/test-utils/test-helper";
import { LoadingStatus } from "../../../../../../../types/common";
import DeletePhoneNumberButton from "../DeletePhoneNumberButton";
import DeletePhoneModal from "../DeletePhoneModal/DeletePhoneModal";

describe("DeletePhoneNumberButton", () => {
    const mockStore = createMockRootState(LoadingStatus.LOADED);

    it("should open and close DeletePhoneModal", () => {
        const wrapper = mountWithStore(<DeletePhoneNumberButton />, mockStore);
        wrapper.find("#openDeletePhoneModal").simulate("click");
        expect(wrapper.find(DeletePhoneModal).exists()).toBe(true);
        wrapper.find(DeletePhoneModal).find(".MuiBackdrop-root").simulate("click");
    });
});
