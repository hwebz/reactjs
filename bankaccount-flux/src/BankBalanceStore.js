// Not using Flux Utils
/*import { EventEmitter } from 'fbemitter';
import AppDispatcher from './AppDispatcher';
import bankConstants from './constants';

const CHANGE_EVENT = 'change';
let __emitter = new EventEmitter();
let balance = 0;

let BankBalanceStore = {
	getState() {
		return balance;
	},

	addListener: (callback) => {
		return __emitter.addListener(CHANGE_EVENT, callback);
	}
};

BankBalanceStore.dispatchToken = AppDispatcher.register((action) => {
	switch (action.type) {
		case bankConstants.CREATE_ACCOUNT:
			balance = 0;
			__emitter.emit(CHANGE_EVENT);
			break;
		case bankConstants.DEPOSITED_INTO_ACCOUNT:
			balance += action.amount;
			__emitter.emit(CHANGE_EVENT);
			break;
		case bankConstants.WITHDREW_FROM_ACCOUNT:
			balance -= action.amount;
			__emitter.emit(CHANGE_EVENT);
			break;
	}
});

export default BankBalanceStore;*/

// Using "Store"
/*import AppDispatcher from './AppDispatcher';
import { Store } from 'flux/utils';
import bankConstants from './constants';

let balance = 0;

class BankBalanceStore extends Store {
	getState() {
		return __balance;
	}

	__onDispatch(action) {
		switch(action.type) {
			case bankConstants.CREATE_ACCOUNT:
				balance = 0;
				this.__emitChange();
				break;
			case bankConstants.DEPOSITED_INTO_ACCOUNT:
				balance += action.amount;
				this.__emitChange();
				break;
			case bankConstants.WITHDREW_FROM_ACCOUNT:
				balance -= action.amount;
				this.__emitChange();
				break;
		}	
	}
}

export default new BankBalanceStore(AppDispatcher);*/

// Using "ReduceStore"
import AppDispatcher from './AppDispatcher';
import { ReduceStore } from 'flux/utils';
import bankConstants from './constants';

class BankBalanceStore extends ReduceStore {
	getInitialState() {
		return 0;
	}

	reduce(state, action) {
		switch(action.type) {
			case bankConstants.CREATE_ACCOUNT:
				return 0;
			case bankConstants.DEPOSITED_INTO_ACCOUNT:
				return state + action.amount;
			case bankConstants.WITHDREW_FROM_ACCOUNT:
				return state - action.amount;
			default:
				return state;
		}
	}
}

export default new BankBalanceStore(AppDispatcher);