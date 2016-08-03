const DATA = Symbol('data');

export default class Selector {
    constructor() {
        this[DATA] = [];
    }

    get size() {
        return this[DATA].length;
    }

    filter(condition) {
        return this[DATA].filter(condition);
    }

    append(record) {
        this[DATA].push(record);
    }

    appendRecords(records) {
        if (!Array.isArray(records)) return;
        this[DATA] = this[DATA].concat(records);
    }
};