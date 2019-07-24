import service from "../../axios/service";
import history from "../../utils/history";
import { setToken, removeToken } from "../../utils/auth";
// import { loginTypes } from "../../storeTypes/login";
const settoken = (data: string) => {
    return { type: "SET_TOKEN", token: data };
};
const setName = (data: string) => {
    return { type: "SET_NAME", name: data };
};
type paramsType = { username: string };
export function login(params: paramsType): Function {
    return dispatch => {
        return service({
            url: "/api/login",
            method: "post",
            data: params
        })
            .then(res => {
                const data = res;
                if (data.token) {
                    console.log("history", history);
                    dispatch(settoken(data.token));
                    dispatch(setName(params.username));
                    setToken(data.token);
                    history.push("/");
                }
            })
            .catch(err => {
                console.error("err", err);
            });
    };
}
