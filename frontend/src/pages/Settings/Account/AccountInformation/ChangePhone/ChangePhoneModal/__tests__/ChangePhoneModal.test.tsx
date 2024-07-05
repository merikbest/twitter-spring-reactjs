import React from "react";
import { Button, Dialog } from "@material-ui/core";
import { setImmediate } from "timers";

import ChangePhoneModal from "../ChangePhoneModal";
import { createMockRootState, mockDispatch, mountWithStore } from "../../../../../../../util/test-utils/test-helper";
import { FilledSelect } from "../../../../../../../components/FilledSelect/FilledSelect";
import { ChangeInfoTextField } from "../../../../../ChangeInfoTextField/ChangeInfoTextField";
import { LoadingStatus } from "../../../../../../../types/common";
import { LocalizationActionsType } from "../../../../../../../store/ducks/localization/contracts/actionTypes";

describe("ChangePhoneModal", () => {
    const mockStore = createMockRootState(LoadingStatus.LOADED);
    let mockDispatchFn: jest.Mock;

    beforeEach(() => {
        mockDispatchFn = mockDispatch();
    });

    it("should render correctly", () => {
        mountWithStore(<ChangePhoneModal visible={true} onClose={jest.fn()} />, mockStore);
        expect(mockDispatchFn).nthCalledWith(1, { type: LocalizationActionsType.FETCH_COUNTRY_CODES });
    });

    it("should render empty ChangePhoneModal window correctly", () => {
        const wrapper = mountWithStore(<ChangePhoneModal visible={false} onClose={jest.fn()} />, mockStore);

        expect(wrapper.find(Dialog).exists()).toBeFalsy();
    });

    it("should render ChangePhoneModal window correctly and change phone", (done) => {
        const wrapper = mountWithStore(<ChangePhoneModal visible={true} onClose={jest.fn()} />, mockStore);

        expect(wrapper.find(Dialog).exists()).toBeTruthy();
        expect(wrapper.text().includes("Change phone")).toBe(true);
        expect(wrapper.text().includes(`Your current phone number is ${mockStore.user.data?.phoneCode}${mockStore.user.data?.phone}.`)).toBe(true);
        expect(wrapper.text().includes("Country code")).toBe(true);
        expect(wrapper.find(FilledSelect).prop("value")).toBe(mockStore.user.data?.phoneCode);

        wrapper.find(FilledSelect).find("select").simulate("change", { target: { value: "+1" } });
        wrapper.find(ChangeInfoTextField).find("input").simulate("change", { target: { value: 123456789 } });

        setImmediate(() => {
            wrapper.find(Button).simulate("submit");
            wrapper.update();
            done();
            expect(wrapper.find(FilledSelect).prop("value")).toBe("+1");
            expect(wrapper.find(ChangeInfoTextField).prop("value")).toBe(123456789);
        });
    });
});
