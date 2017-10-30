import { h } from 'preact';
import style from './style';

const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
const gameDay = date => days[date.getDay()];
const gameTime = date =>
	[ date.getHours() % 12,
		 ':',
		 date.getMinutes(),
		 ' ',
		 date.getHours() < 12 ? 'AM' : 'PM'
	].join('');

const BoxScore = ({ gameSchedule, score }) =>
	<div class={style.row}>
		<div class={style.cell}>
			{gameSchedule.visitorTeamAbbr}<br />
			{!!score && score.visitorTeamScore.pointTotal}
		</div>
		{!!score && score.phase !== 'FINAL' && score.phase !== 'PREGAME' && (
			<div class={style.cell}>
				{score.phase}<br />
				{score.time}<br />
				{score.down} &amp; {score.yardsToGo} on {score.yardline}
			</div>
		)}
		{(!score || score.phase === 'PREGAME') && (
			<div class={style.cell}>
				{gameDay(new Date(gameSchedule.isoTime))}<br />
				{gameTime(new Date(gameSchedule.isoTime))}
			</div>
		)}
		<div class={style.cell}>
			{gameSchedule.homeTeamAbbr}<br />
			{!!score && score.homeTeamScore.pointTotal}
		</div>
	</div>;

export default BoxScore;
