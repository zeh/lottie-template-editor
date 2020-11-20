import * as React from "react";
import { useCallback, useState } from "react";
import cx from "classnames";

import DropTarget from "components/DropTarget";
import Player from "components/Player";
import Sidebar from "components/Sidebar";
import Text from "components/Text";

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
	const [errorMessage, setErrorMessage] = useState<string | null>(null);

	const handleDropFiles = useCallback(
		async (files: File[]) => {
			const file = await findValidJSONFile(files);
			if (!file) {
				setErrorMessage("The file dropped doesn't look like a valid Lottie JSON.");
			} else {
				setErrorMessage(null);
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
			{!animation && !errorMessage ? (
				<div className={s.message}>
					<Text.H2>{"No file to play"}</Text.H2>
					<Text.P>
						{"Please drag a Lottie-generated JSON file into"}
						<br />
						{"this window to start editing and playback."}
					</Text.P>
				</div>
			) : null}
			{errorMessage ? (
				<div className={cx(s.message, s.messageError)}>
					<Text.H2>{"Error!"}</Text.H2>
					<Text.P>{errorMessage}</Text.P>
				</div>
			) : null}
			<DropTarget onDropFiles={handleDropFiles} />
		</div>
	);
};

export default App;
