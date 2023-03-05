export default abstract class EventObject
{
	private _eventLists: { [name: string]: Function[] } = {};

	on(event: string, callback: Function)
	{
		if (!this._eventLists[event])
			this._eventLists[event] = [];

		this._eventLists[event].push(callback);
	}

	protected _fireEvent(event: string, ...params: any)
	{
		for (const callback of this._eventLists[event] || [])
			callback(...params);
	}
}