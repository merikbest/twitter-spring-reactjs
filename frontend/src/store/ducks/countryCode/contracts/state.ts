import { LoadingStatus } from "../../../../types/common";
import { CountryCodeResponse } from "../../../../types/user";

export interface CountryCodesState {
    items: CountryCodeResponse[];
    loadingState: LoadingStatus;
}
