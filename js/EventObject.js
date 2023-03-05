export default class EventObject {
    constructor() {
        this._eventLists = {};
    }
    on(event, callback) {
        if (!this._eventLists[event])
            this._eventLists[event] = [];
        this._eventLists[event].push(callback);
    }
    _fireEvent(event, ...params) {
        for (const callback of this._eventLists[event] || [])
            callback(...params);
    }
}
//# sourceMappingURL=EventObject.js.map