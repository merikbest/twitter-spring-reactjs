import React from "react";

import {mountWithStore} from "../../../util/testHelper";
import ActionSnackbar from "../ActionSnackbar";

describe("ActionSnackbar", () => {

    it("should render correctly", () => {
        const wrapper = mountWithStore(
            <ActionSnackbar
                snackBarMessage={"Test message"}
                openSnackBar={true}
                onCloseSnackBar={jest.fn()}/>);
        
        expect(wrapper.find(".MuiSnackbarContent-message").text()).toEqual("Test message");
    });
});
