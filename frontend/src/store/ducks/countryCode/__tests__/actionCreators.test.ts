import { testAction } from "../../../../util/test-utils/test-helper";
import { fetchCountryCodes, setCountryCodes, setCountryCodesLoadingState } from "../actionCreators";
import { CountryCodesActionsType } from "../contracts/actionTypes";
import { LoadingStatus } from "../../../../types/common";
import { CountryCodeResponse } from "../../../../types/user";

describe("countryCodes actions", () => {
    testAction(fetchCountryCodes, fetchCountryCodes(), {
        type: CountryCodesActionsType.FETCH_COUNTRY_CODES
    });

    testAction(setCountryCodes, setCountryCodes([{ id: 1 }] as CountryCodeResponse[]), {
        type: CountryCodesActionsType.SET_COUNTRY_CODES,
        payload: [{ id: 1 }] as CountryCodeResponse[]
    });

    testAction(setCountryCodesLoadingState, setCountryCodesLoadingState(LoadingStatus.LOADING), {
        type: CountryCodesActionsType.SET_LOADING_STATE,
        payload: LoadingStatus.LOADING
    });
});
