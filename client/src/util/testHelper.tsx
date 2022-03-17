import React from "react";

// @ts-ignore
export const testAction = (action, payload, expectedPayload) => {
    describe(`${action.name}`, () => {
        Object.keys(expectedPayload).forEach((key) => {
            it(`should return a payload ${key}`, () => {
                expect(payload[key]).toEqual(expectedPayload[key]);
            });
        });

        it("should have all tested payload properties", () => {
            expect(Object.keys(payload).length).toBe(Object.keys(expectedPayload).length);
        });

        it("should not return undefined", () => {
            expect(payload.type).not.toBe(undefined);
        });
    });
};

// @ts-ignore
export const testActionDispatch = (actionType, actualState, expectedState) => {
    describe(`${actionType} action is dispatched`, () => {
        it("should return the expected state", () => {
            expect(actualState).toEqual(expectedState);
        });
    });
};
