import { createMockRootState } from "../../../../util/test-utils/test-helper";
import {
    selectErrorMessage,
    selectIsLoaded,
    selectIsLoading,
    selectRegistrationInfo,
    selectRegistrationStep1,
    selectRegistrationStep2,
    selectRegistrationStep3,
    selectRegistrationStep4,
    selectRegistrationStep5
} from "../selector";
import { initialRegistrationInfo } from "../reducer";
import { RegistrationStep } from "../../../../types/auth";

describe("authentication selectors:", () => {
    const mockState = createMockRootState();

    describe("selectIsLoading", () => {
        it("should return boolean", () => {
            expect(selectIsLoading(mockState)).toBe(false);
        });
    });

    describe("selectIsLoaded", () => {
        it("should return boolean", () => {
            expect(selectIsLoaded(mockState)).toBe(true);
        });
    });

    describe("selectRegistrationInfo", () => {
        it("should return RegistrationRequest", () => {
            expect(selectRegistrationInfo(mockState)).toBe(initialRegistrationInfo);
        });
    });

    describe("selectErrorMessage", () => {
        it("should return string", () => {
            expect(selectErrorMessage({
                ...mockState,
                authentication: { ...mockState.authentication, errorMessage: "test_error" }
            })).toBe("test_error");
        });
    });

    describe("selectRegistrationStep1", () => {
        it("should return boolean", () => {
            expect(selectRegistrationStep1({
                ...mockState,
                authentication: { ...mockState.authentication, registrationStep: RegistrationStep.STEP_1 }
            })).toBe(true);
        });
    });

    describe("selectRegistrationStep2", () => {
        it("should return boolean", () => {
            expect(selectRegistrationStep2({
                ...mockState,
                authentication: { ...mockState.authentication, registrationStep: RegistrationStep.STEP_2 }
            })).toBe(true);
        });
    });

    describe("selectRegistrationStep3", () => {
        it("should return boolean", () => {
            expect(selectRegistrationStep3({
                ...mockState,
                authentication: { ...mockState.authentication, registrationStep: RegistrationStep.STEP_3 }
            })).toBe(true);
        });
    });

    describe("selectRegistrationStep4", () => {
        it("should return boolean", () => {
            expect(selectRegistrationStep4({
                ...mockState,
                authentication: { ...mockState.authentication, registrationStep: RegistrationStep.STEP_4 }
            })).toBe(true);
        });
    });

    describe("selectRegistrationStep5", () => {
        it("should return boolean", () => {
            expect(selectRegistrationStep5({
                ...mockState,
                authentication: { ...mockState.authentication, registrationStep: RegistrationStep.STEP_5 }
            })).toBe(true);
        });
    });
});
