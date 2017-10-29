import { h } from 'preact';
import style from './style';
import BoxScore from '../../components/box-score';

const Upcoming = ({ gameScores }) =>
	<div class={style.home}>
		{gameScores
			.filter(g => !g.score || g.score.phase === 'PREGAME')
			.sort((a, b) => a.gameSchedule.isoTime < b.gameSchedule.isoTime)
			.map(game => <BoxScore {...game} />)}
	</div>;

export default Upcoming;
