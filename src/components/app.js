import { h, Component } from 'preact';
import { Router } from 'preact-router';

import Header from './header';
import Loader from './loader';
import Home from '../routes/home';
import Completed from '../routes/completed';
import Upcoming from '../routes/upcoming';

export default class App extends Component {
	loadScores() {
		this.setState({ loading: true });
		try {
			fetch('https://feeds.nfl.com/feeds-rs/scores.json')
				.then(response => {
					if (response.ok) {
						response.json().then(scores => this.setState({ loading: false, scores }));
					} else {
						this.setState({ loading: false });
					}
				});
		} catch (error) {
			this.setState({ loading: false, error });
		}
	}

	constructor(props) {
		super(props);
		this.state = { loading: true, scores: { gameScores: [] } };
		this.loadScores = this.loadScores.bind(this);
	}

	componentDidMount() {
		this.loadScores();
		this.interval = setInterval(this.loadScores, 10000);
	}

	componentWillUnmount() {
		clearInterval(this.interval);
	}

	/** Gets fired when the route changes.
	 *	@param {Object} event		"change" event from [preact-router](http://git.io/preact-router)
	 *	@param {string} event.url	The newly routed URL
	 */
	handleRoute = e => {
		this.currentUrl = e.url;
	};

	render() {
		return (
			<div id="app">
				<Header />
				{this.state.loading && <div style={{ padding: '56px 20px' }}><Loader /></div>}
				<Router onChange={this.handleRoute}>
					<Home path="/" {...this.state.scores} />
					<Completed path="/completed" {...this.state.scores} />
					<Upcoming path="/upcoming" {...this.state.scores} />
				</Router>
			</div>
		);
	}
}
