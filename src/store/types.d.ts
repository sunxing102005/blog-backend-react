import { StateType, ActionType } from "typesafe-actions";
declare module "MyTypes" {
    export type RootState = StateType<
        ReturnType<typeof import("../reducers/index").default>
    >;
}
