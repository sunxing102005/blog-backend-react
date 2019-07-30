import * as Cookies from "js-cookie";

const TokenKey = "Admin-Token";

export function getToken(): string {
    return Cookies.get(TokenKey);
}

export function setToken(token): void {
    return Cookies.set(TokenKey, token);
}

export function removeToken(): void {
    return Cookies.remove(TokenKey);
}
export function getName(): string {
    return Cookies.get("username");
}
export function setName(name): void {
    return Cookies.set("username", name);
}
