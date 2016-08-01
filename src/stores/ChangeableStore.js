import EventEmitter from 'EventEmitter';

// const CHANGE_EVENT = Symbol('change');
const CHANGE_EVENT = 'change';
const EMITTING = Symbol('emitting');
const PENDING = Symbol('pending');
const QUEUE_TIMER = Symbol('queue-timer');
const EMITTER = Symbol('emitter');

export default class ChangeableStore {
    constructor() {
        this[PENDING] = false;
        this[EMITTING] = false;
        this[EMITTER] = new EventEmitter();
    }
    
    addChangeListener(callback) {
        this[EMITTER].on(CHANGE_EVENT, callback);
        return () => this.removeChangeListener(callback);
    }
    
    removeChangeListener(callback) {
        this[EMITTER].removeListener(CHANGE_EVENT, callback);
    }

    emitChange() {
        // if (this[EMITTING]) {
        //     console.error('EmitWarning: should not emit in the middle of emit!');
        //     setTimeout(() => this.emitChange(), 0);
        //     return;
        // }

        // enqueueChange(this);
        flushChange(this);
    }
};

function enqueueChange(store) {
    const pending = store[PENDING];
    store[PENDING] = true;

    if (pending) {
        clearTimeout(store[QUEUE_TIMER]);
        store[QUEUE_TIMER] = setTimeout(() => {
            store[PENDING] = false;
            enqueueChange(store);
        }, 0);
    } else {
        flushChange(store);
    }
}

function flushChange(store) {
    store[EMITTING] = true;

    try {
        store[EMITTER].emit(CHANGE_EVENT);
    } finally {
        store[EMITTING] = false;
    }
}