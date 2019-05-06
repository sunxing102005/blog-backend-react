// import { SEARCH_LIST } from "../../actionTypes/article";
import service from "../../axios/service";
import history from "@/utils/history";
import { setToken, removeToken } from "@/utils/auth";
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
                // dispatch(setList(res));
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
export function fedLogout() {
    return dispatch => {
        dispatch(settoken(""));
        dispatch(setName(""));
        removeToken();
        history.push("/login");
    };
}
