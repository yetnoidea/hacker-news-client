import React from 'react';
import classNames from 'classnames';

export default ({ event, className, children }) => {
    if (isLoadEvent(event))
        return <div className={classNames(className, 'loader', event)}>{children}</div>;

    return <div className={className}>{children}</div>;
};

function isLoadEvent(event) {
    return ['loading', 'loaded', 'error'].some((type) => type === event);
}