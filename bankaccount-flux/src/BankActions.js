import AppDispatcher from './AppDispatcher';
import bankConstants from './constants';

let BankActions = {
	// Create an account with an empty value
	createAccount() {
		AppDispatcher.dispatch({
			type: bankConstants.CREATE_ACCOUNT,
			amount: 0
		});
	},

	depositIntoAccount(amount) {
		AppDispatcher.dispatch({
			type: bankConstants.DEPOSITED_INTO_ACCOUNT,
			amount: amount
		});
	},

	withdrawFromAccount(amount) {
		AppDispatcher.dispatch({
			type: bankConstants.WITHDREW_FROM_ACCOUNT,
			amount
		});
	}
}

export default BankActions;