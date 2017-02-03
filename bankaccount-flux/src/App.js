import React, { Component } from 'react';
import BankBalanceStore from './BankBalanceStore';
import BankActions from './BankActions';

// Using Flux Utils: ReduceStore -> don't need subscribe or unsubscribe listeners
import { Container } from 'flux/utils';

// Using Store waitFor another Store
import BankRewardsStore from './BankRewardsStore';

class App extends Component {

  constructor() {
    super(...arguments);
    BankActions.createAccount();
    // Don't need state
    // this.state = {
    //   balance: BankBalanceStore.getState()
    // }
  }

  // Don't need 2 methods
  // componentDidMount() {
  //   this.storeSubscription = BankBalanceStore.addListener(data => this.handleStoreChange(data));
  // }

  // componentWillUnmount() {
  //   this.storeSubscription.remove();
  // }

  handleStoreChange() {
    this.setState({ balance: BankBalanceStore.getState() });
  }

  deposit() {
    BankActions.depositIntoAccount(Number(this.refs.amount.value));
    this.refs.amount.value = '';
  }

  withdraw() {
    BankActions.withdrawFromAccount(Number(this.refs.amount.value));
    this.refs.amount.value = '';
  }

  render() {
    return (
      <div>
        <header>FluxTrust Bank</header>
        <h1>You balance is ${(this.state.balance).toFixed(2)}</h1>
        {/** Add rewardsTier by BankRewardsStore */}
        <h2>Your Points Rewards Tier is {this.state.rewardsTier}</h2>
        <div className="atm">
          <input type="text" placeholder="Enter amount..." ref="amount" />
          <br />
          <button onClick={this.withdraw.bind(this)}>Withdraw</button>
          <button onClick={this.deposit.bind(this)}>Deposit</button>
        </div>
      </div>
    );
  }
}

// export default App;

// If using Flux Utils
App.getStores = () => ([BankBalanceStore]);
App.calculateState = (prevState) => ({
  balance: BankBalanceStore.getState(),
  rewardsTier: BankRewardsStore.getState()
});

const AppContainer = Container.create(App);

export default AppContainer;
