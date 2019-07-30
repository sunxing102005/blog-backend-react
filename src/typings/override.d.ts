export interface MessageType {
    (): void;
    then: (fill: ThenableArgument, reject?: ThenableArgument) => Promise<void>;
    promise: Promise<void>;
}
declare module react {
    interface $store {}
}
