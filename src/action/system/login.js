// import { SEARCH_LIST } from "../../actionTypes/article";
import service from "../../axios/service";
import history from "@/utils/history";
import { setToken, removeToken } from "@/utils/auth";
import { action } from "typesafe-actions";
// const settoken = data => {
//     return { type: "SET_TOKEN", token: data };
// };
// const setName = data => {
//     return { type: "SET_NAME", name: data };
// };
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
                    console.log("history", history);
                    // dispatch(settoken(data.token));
                    // dispatch(setName(params.username));
                    setToken(data.token);
                    dispatch(action("SET_TOKEN", data.token));
                    dispatch(action("SET_NAME", data.username));
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
            // dispatch(settoken(""));
            // dispatch(setName(""));
            dispatch(action("SET_TOKEN", ""));
            dispatch(action("SET_NAME", ""));
            removeToken();
            window.location.reload();
        });
    };
}
