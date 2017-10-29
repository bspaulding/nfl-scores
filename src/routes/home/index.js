import { h, Component } from 'preact';
import style from './style';
import BoxScore from '../../components/box-score';

export default class Home extends Component {
	render() {
		return (
			<div class={style.home}>
				{this.props.gameScores
					.filter(g => !!g.score && g.score.phase !== 'FINAL')
					.sort((a, b) => a.gameSchedule.isoTime < b.gameSchedule.isoTime)
					.map(game => <BoxScore {...game} />)}
			</div>
		);
	}
}
