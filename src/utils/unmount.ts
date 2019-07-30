/**
 * 组件销毁后，不能设置state
 * @param {*} target
 */
import * as React from "react";
export function inject_unmount<T extends { new (...args: any[]): {} }>(
    target: T
): T {
    // 改装componentWillUnmount，销毁的时候记录一下
    let next = target.prototype.componentWillUnmount;
    target.prototype.componentWillUnmount = function() {
        if (next) next.apply(this, arguments);
        this.unmount = true;
    };
    // 对setState的改装，setState查看目前是否已经销毁
    let setState = target.prototype.setState;
    target.prototype.setState = function() {
        // console.log("this.unmount", this.unmount);
        if (this.unmount) return;
        setState.apply(this, arguments);
    };
    return target;
}
