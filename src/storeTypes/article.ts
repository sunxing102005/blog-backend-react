interface setObjectAction {
    type: string;
    data: object | null;
}
interface setArrayAction {
    type: string;
    data: ReadonlyArray<object> | null;
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
