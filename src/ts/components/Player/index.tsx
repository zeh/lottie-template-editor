import * as React from "react";
import { useState } from "react";
import cx from "classnames";
import Lottie, { Options } from "react-lottie";

import Text from "components/Text";

import * as s from "./styles.scss";

interface IProps {
	animation: unknown | null;
	className?: string;
}

const Player = ({ animation, className }: IProps): JSX.Element => {
	const [isStopped, setIsStopped] = useState(false);
	const [isPaused, setIsPaused] = useState(false);
	const [loop, setLoop] = useState(true);

	const options: Options = {
		loop,
		autoplay: true,
		animationData: animation,
		rendererSettings: {
			// Same options as the svg's "preserveAspectRatio" property
			preserveAspectRatio: "xMidYMid meet",
		},
	};

	return (
		<div className={cx(className, s.main)}>
			<div className={s.canvas}>
				{animation ? (
					<Lottie options={options} height={"100%"} width={"100%"} isStopped={isStopped} isPaused={isPaused} />
				) : (
					<div className={s.placeholderMessage}>
						<Text.H2>{"No file to play!"}</Text.H2>
						<Text.P>
							{"Please drag a Lottie-generated JSON file into"}
							<br />
							{"this window to start editing and playback."}
						</Text.P>
					</div>
				)}
			</div>
		</div>
	);
};

export default Player;
