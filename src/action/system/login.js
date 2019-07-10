// import { SEARCH_LIST } from "../../actionTypes/article";
import service from "../../axios/service";
import history from "@/utils/history";
import { setToken, getToken, removeToken } from "@/utils/auth";
const settoken = data => {
    return { type: "SET_TOKEN", token: data };
};
const setName = data => {
    return { type: "SET_NAME", name: data };
};
export function login(params) {
    return dispatch => {
        return service({
            url: "/api/login",
            method: "post",
            data: params
        })
            .then(res => {
                const data = res;
                if (data.token) {
                    console.log("history", data.token);
                    dispatch(settoken(data.token));
                    dispatch(setName(params.username));
                    setToken(data.token);
                    console.log("getToken", getToken());
                    history.push("/");
                }
            })
            .catch(err => {
                console.error("err", err);
            });
    };
}
export function fedLogout() {
    return dispatch => {
        return new Promise(resolve => {
            dispatch(settoken(""));
            dispatch(setName(""));
            removeToken();
            // window.location.reload();
            history.push("/login");
        });
    };
}
