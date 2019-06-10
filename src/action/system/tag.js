import { GET_ALL_TAGS } from "../../actionTypes/tag";
import service from "../../axios/service";
const getTags = data => {
    return { type: GET_ALL_TAGS, data };
};
export function fetchTags(params) {
    return dispatch => {
        return service({
            url: "/api/meta",
            method: "get",
            data: params
        })
            .then(res => {
                dispatch(getTags(res));
            })
            .catch(err => {
                console.error("err", err);
            });
    };
}
