import React from "react";
import { Link as MuiLink } from "@material-ui/core";

import ManageContacts from "../ManageContacts";
import { createMockRootState, mountWithStore } from "../../../../../../util/test-utils/test-helper";
import { EMAIL_AND_PHONE_DISCOVERABILITY_SETTINGS } from "../../../../../../constants/url-constants";

describe("ManageContacts", () => {

    it("should render correctly", () => {
        const wrapper = mountWithStore(<ManageContacts />, createMockRootState());

        expect(wrapper.text().includes("Remove all contacts")).toBe(true);
        expect(wrapper.text().includes("These are the contacts that you have imported from your mobile devices.")).toBe(true);
        expect(wrapper.find(MuiLink).at(0).prop("href")).toBe(EMAIL_AND_PHONE_DISCOVERABILITY_SETTINGS);
    });
});
