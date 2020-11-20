import * as React from "react";
import { useCallback, useMemo, useRef, useState } from "react";
import cx from "classnames";
import Lottie, { EventListener, Options } from "react-lottie";

import Text from "components/Text";
import { AnimationItem } from "utils/Types";

import * as s from "./styles.scss";

interface IProps {
	animation: unknown | null;
	className?: string;
}

const Player = ({ animation, className }: IProps): JSX.Element => {
	const [isPlaying, setIsPlaying] = useState(true);
	const [loop, setLoop] = useState(true);
	const [currentFrame, setCurrentFrame] = useState(0);
	const [totalFrames, setTotalFrames] = useState(0);
	const [duration, setDuration] = useState(0);

	const element = useRef<Lottie>(null);

	const options: Options = useMemo(
		() => ({
			loop,
			autoplay: true,
			animationData: animation,
			rendererSettings: {
				// Same options as the svg's "preserveAspectRatio" property
				preserveAspectRatio: "xMidYMid meet",
			},
		}),
		[loop, animation],
	);

	const updateTime = useCallback((): void => {
		if (element.current) {
			// Lottie AnimationItem: https://github.com/airbnb/lottie-web/blob/master/index.d.ts#L6
			const anim = (element.current as any)?.anim as AnimationItem;
			if (anim) {
				if (totalFrames !== anim.totalFrames) setTotalFrames(anim.totalFrames);
				if (currentFrame !== anim.currentFrame) setCurrentFrame(anim.currentFrame);
				if (duration !== anim.getDuration()) setDuration(anim.getDuration());
			}
		}
	}, [element]);

	const eventListeners: EventListener[] = useMemo(
		() => [
			// https://github.com/airbnb/lottie-web#events
			// Works: loopComplete, enterFrame
			// Does not work: data_ready, config_ready
			// Untested: complete, segmentStart, data_failed, loaded_images, DOMLoaded, destroy
			{
				eventName: "enterFrame",
				callback: (): void => updateTime(),
			},
		],
		[],
	);

	return (
		<div className={cx(className, s.main)}>
			{animation ? (
				<>
					<div className={s.controls}>
						{isPlaying ? (
							<button className={s.button} onClick={() => setIsPlaying(false)}>
								PAUSE
							</button>
						) : (
							<button className={s.button} onClick={() => setIsPlaying(true)}>
								PLAY
							</button>
						)}
						<div className={s.number}>{`Frame ${Math.round(currentFrame)} / ${totalFrames}`}</div>
						<div className={s.number}>{`Time ${(
							(totalFrames === 0 ? 0 : currentFrame / totalFrames) * duration
						).toFixed(2)} / ${duration.toFixed(2)}`}</div>
					</div>
					<div className={s.canvas}>
						<Lottie
							ref={element}
							options={options}
							height={"100%"}
							width={"100%"}
							isPaused={!isPlaying}
							eventListeners={eventListeners}
						/>
					</div>
				</>
			) : (
				<div className={s.placeholderMessage}>
					<Text.H2>{"No file to play"}</Text.H2>
				</div>
			)}
		</div>
	);
};

export default Player;
