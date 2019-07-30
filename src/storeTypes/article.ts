interface setObjectAction {
    type: string;
    payload: object | null;
}
interface setArrayAction {
    type: string;
    payload: ReadonlyArray<object> | null;
}
export type articleActionTypes = setObjectAction | setArrayAction;
export type articleType = {
    title: string;
    sign: string;
    thumb: string;
    date: string | null;
    status: string;
    tag: Array<object>;
    markdown: string;
    recommend: string;
    create_time: string | null;
};
export type articleState = {
    data: object;
    tags: Array<object>;
    singleArticle: articleType;
};
