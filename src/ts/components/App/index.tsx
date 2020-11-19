import * as React from "react";
import { useCallback } from "react";

import DropTarget from "components/DropTarget";
import Player from "components/Player";
import Sidebar from "components/Sidebar";

import * as s from "./styles.scss";

const App = (): JSX.Element => {
	const handleDropFiles = useCallback((files: File[]) => {
		console.info("Dragged files:", files);
	}, []);

	return (
		<div className={s.main}>
			<div className={s.content}>
				<Player className={s.player} />
				<Sidebar className={s.sidebar} />
			</div>
			<DropTarget onDropFiles={handleDropFiles} />
		</div>
	);
};

export default App;
