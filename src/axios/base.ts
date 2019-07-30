import config from "../config/index.js";
const getRequestURL = (path: string): string => {
    return config.serverHost + path;
};

export default {
    getRequestURL
};
