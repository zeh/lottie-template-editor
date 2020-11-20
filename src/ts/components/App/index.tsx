import * as React from "react";
import { useCallback, useState } from "react";

import DropTarget from "components/DropTarget";
import Player from "components/Player";
import Sidebar from "components/Sidebar";

import * as s from "./styles.scss";

type TLottieFile = Record<string, unknown>;

const findValidJSONFile = async (files: File[]): Promise<TLottieFile | null> => {
	const jsonFile = files.find((f) => f.name.endsWith(".json"));
	if (!jsonFile) return null;
	const text = JSON.parse(await jsonFile.text());
	if (!text.v || !text.meta || !text.fonts) return null;
	return text as TLottieFile;
};

const App = (): JSX.Element => {
	const [animation, setAnimation] = useState<TLottieFile | null>(null);

	const handleDropFiles = useCallback(
		async (files: File[]) => {
			const file = await findValidJSONFile(files);
			if (!file) {
				console.error("No valid .json file dragged.");
			} else {
				setAnimation(file);
			}
		},
		[setAnimation],
	);

	return (
		<div className={s.main}>
			<div className={s.content}>
				<Player animation={animation} className={s.player} />
				<Sidebar animation={animation} className={s.sidebar} />
			</div>
			<DropTarget onDropFiles={handleDropFiles} />
		</div>
	);
};

export default App;
