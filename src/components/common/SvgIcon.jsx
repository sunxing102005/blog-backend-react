import React from "react";
export default class Table extends React.Component {
    render() {
        const { className, iconClass } = this.props;
        const iconName = `#icon-${iconClass}`;
        const svgClass = className ? `svg-icon ${className}` : "svg-icon";
        return (
            <svg className={svgClass} aria-hidden="true">
                <use xlinkHref={iconName} />
            </svg>
        );
    }
}
