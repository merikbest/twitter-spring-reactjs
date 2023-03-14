import { createMockRootState } from "../../../../util/test-utils/test-helper";
import { selectOpenSnackBar, selectSnackBarMessage } from "../selector";

describe("actionSnackbar selectors:", () => {
    const mockState = createMockRootState();

    describe("selectSnackBarMessage", () => {
        it("should return message string", () => {
            expect(selectSnackBarMessage({
                ...mockState,
                actionSnackbar: { ...mockState.actionSnackbar, snackBarMessage: "test_message" }
            })).toBe("test_message");
        });
    });

    describe("selectOpenSnackBar", () => {
        it("should return openSnackBar", () => {
            expect(selectOpenSnackBar({
                ...mockState,
                actionSnackbar: { ...mockState.actionSnackbar, openSnackBar: true }
            })).toBe(true);
        });
    });
});
