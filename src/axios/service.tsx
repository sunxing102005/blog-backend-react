import { message } from "antd";
import axios from "axios";
import base from "./base";
import { fedLogout } from "@/action/system/login";
import { getToken } from "@/utils/auth";
type OptionType = {
    url: string;
    data: { fn?: Function; errorFn?: Function; [propName: string]: any };
    isFormData?: boolean;
    isBlob?: boolean;
    method: string;
};
const service = (option: OptionType) => {
    const url = base.getRequestURL(option.url);

    //是否返回的是二进制文件
    const isBlob = option.isBlob;
    const responseType = isBlob ? "blob" : "json";

    const req: any = {
        method: option.method,
        callbackFn: (option.data && option.data.fn) || null,
        callbackErrFn: (option.data && option.data.errorFn) || null
    };

    option.data && option.data.fn && delete option.data.fn;
    option.data && option.data.errorFn && delete option.data.errorFn;

    let sendData = option.data || {};

    if (req.method.toLowerCase() === "post") {
        // formData直接取参数，不通过qs.stringify
        if (option.isFormData) {
            req.data = sendData.formData;
        } else {
            //针对参数类型是对象（包含数组）
            for (const key in sendData) {
                if (
                    typeof sendData[key] === "object" &&
                    !(sendData[key] instanceof Array)
                ) {
                    sendData[key] = JSON.stringify(sendData[key]);
                }
            }
            // console.log("sendData", sendData);
            // sendData = qs.stringify(sendData);
            // console.log("sendData1", sendData);
            req.data = sendData;
        }
    } else if (req.method === "get") {
        req.params = sendData;
    } else {
        req.data = sendData;
    }
    if (getToken()) {
        req.headers = { accesstoken: getToken() };
    }
    window.Pace.start(); //开始顶部进度条
    return axios({ url, ...req, responseType })
        .then(res => {
            console.log("res", res);
            window.Pace.stop(); //结束顶部进度条
            const response = res.data;
            if (isBlob) {
                return response;
            }
            console.log("response.data", response);
            if (response.errno) {
                let errmsg = response.errmsg;
                req.callbackFn && req.callbackErrFn(errmsg || "接口请求失败");
                throw errmsg;
            } else {
                req.callbackFn && req.callbackFn(response.data);
                return response.data;
            }
        })
        .catch(error => {
            let res = error.response;
            console.error(" service error:", error);
            if (res && res.status == 401) {
                message.info("登录信息失效，请重新登录").then(() => {
                    window.globalStore.dispatch(fedLogout());
                });
            }
            req &&
                req.callbackErrFn &&
                req.callbackErrFn(res.message || "接口请求失败");
            return Promise.reject(error);
        });
};
export default service;
