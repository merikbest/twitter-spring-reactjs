import React from "react";
import {Link as MuiLink} from "@material-ui/core";

import ManageContacts from "../ManageContacts";
import {createMockRootState, mountWithStore} from "../../../../../../util/testHelper";
import {EMAIL_AND_PHONE_DISCOVERABILITY_SETTINGS} from "../../../../../../util/url";

describe("ManageContacts", () => {

    it("should render correctly", () => {
        const wrapper = mountWithStore(<ManageContacts/>, createMockRootState());

        expect(wrapper.text().includes("Remove all contacts")).toBe(true);
        expect(wrapper.text().includes("These are the contacts that you have imported from your mobile devices.")).toBe(true);
        expect(wrapper.find(MuiLink).at(0).prop("href")).toBe(EMAIL_AND_PHONE_DISCOVERABILITY_SETTINGS);
    });
});
