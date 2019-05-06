import { SEARCH_LIST } from "../../actionTypes/article";
import service from "../../axios/service";
const setList = data => {
    return { type: SEARCH_LIST, data };
};
export function fetchListData(params) {
    return dispatch => {
        return service({
            url: "/api/content",
            method: "get",
            data: params
        })
            .then(res => {
                dispatch(setList(res));
            })
            .catch(err => {
                console.error("err", err);
            });
    };
}
