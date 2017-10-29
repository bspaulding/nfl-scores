import { h } from 'preact';
import { Link } from 'preact-router/match';
import style from './style';
import logo from '../../assets/nfl.svg';

const Header = () =>
	<header class={style.header}>
		<img src={logo} class={style.logo} />
		<nav>
			<Link activeClassName={style.active} href="/">Now Playing</Link>
			<Link activeClassName={style.active} href="/completed">Done</Link>
			<Link activeClassName={style.active} href="/upcoming">Upcoming</Link>
		</nav>
	</header>;

export default Header;
