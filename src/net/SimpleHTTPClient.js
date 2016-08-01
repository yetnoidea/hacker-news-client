const MIDDLEWARE = Symbol('middleware');

export default class SimpleHTTPClient {
    constructor() {
        this[MIDDLEWARE] = identity;
    }

    get(url) {
        return request(url).then(this[MIDDLEWARE]);
    }

    post(url, data) {
        return request(url, 'POST', data).then(this[MIDDLEWARE]);
    }

    middleware(process) {
        if (typeof process !== 'function') return;

        const middleware = this[MIDDLEWARE];
        this[MIDDLEWARE] = (data) => process(middleware(data));
    }
};

function request(url, method = 'GET', data = null) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();

        xhr.onload = () => {
            const res = xhr.responseText;
            if (res) resolve(res);
            else reject('invalid data');
        };

        xhr.onerror = (event) => {
            reject(event);
        };

        xhr.open(method, url);
        xhr.send(data);
    });
}

function identity(value) {
    return value;
}