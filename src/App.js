import React from 'react';
import Main from './Main';
import { Signup, Login } from './components/Signup';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Nav from './components/Nav';
import { firebase } from './utils/db';

class App extends React.Component {
	constructor() {
		super();
		this.state = {
			user: undefined
		};
	}
	componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({user: user});
      } else {
        this.setState({user: undefined});
      }
    });
  }
	render() {
		return (
			<Router>
				<div>
					<h3>Welcome {this.state.user ? this.state.user.email : 'guest'}</h3>
					<Nav />

          {
            !this.state.user && <Login />
          }

					<Route exact path="/" component={Main} />
					<Route path="/signup" component={Signup} />
				</div>
			</Router>
		);
	}
}

export default App;
