interface setTokenTypes {
    token: string;
    type: string;
}
interface setNameTypes {
    type: string;
    payload?: string;
    name?: string;
    token?: string;
}
export type loginTypes = setNameTypes;
export interface ChatState {
    token: string;
    name: string;
}
