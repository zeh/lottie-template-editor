import * as React from "react";

import Player from "components/Player";
import Sidebar from "components/Sidebar";

import * as s from "./styles.scss";

const App = (): JSX.Element => {
	return (
		<div className={s.main}>
			<div className={s.content}>
				<Player className={s.player} />
				<Sidebar className={s.sidebar} />
			</div>
		</div>
	);
};

export default App;
