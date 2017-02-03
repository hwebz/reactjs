import React, { Component } from 'react';
import {Link} from 'react-router';

class App extends Component {
  constructor() {
    super(...arguments);
    this.state = {
      route: window.location.hash.substr(1)
    };
  }

  componentDidMount() {
    window.addEventListener('hashchange', () => {
      this.setState({
        route: window.location.hash.substr(1)
      });
    });
  }

  render() {
    // var Child;
    //   switch (this.state.route) {
    //     case '/about': Child = About; break;
    //     case '/repos': Child = Repos; break;
    //     default: Child = Home;
    //   }
    return(
      <div>
        <menu>
          <ul>
            <li><Link to="/about" activeClassName="active">About</Link></li>
            <li><Link to="/repos" activeClassName="active">Repos</Link></li>
          </ul>
        </menu>
        {this.props.children}
      </div>
    );
  }
}

export default App;