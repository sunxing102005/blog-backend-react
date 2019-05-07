import service from "../axios/service";
export function getContent(params) {
    return service({
        url: "/api/content",
        method: "get",
        data: params
    });
}
