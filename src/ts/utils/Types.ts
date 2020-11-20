// Copied from lottie-web
// https://github.com/airbnb/lottie-web/blob/master/index.d.ts#L6

export type AnimationDirection = 1 | -1;
export type AnimationSegment = [number, number];
export type AnimationEventName =
	| "enterFrame"
	| "loopComplete"
	| "complete"
	| "segmentStart"
	| "destroy"
	| "config_ready"
	| "data_ready"
	| "DOMLoaded"
	| "error"
	| "data_failed"
	| "loaded_images";
export type AnimationEventCallback<T = any> = (args: T) => void;

export type AnimationItem = {
	name: string;
	isLoaded: boolean;
	currentFrame: number;
	currentRawFrame: number;
	firstFrame: number;
	totalFrames: number;
	frameRate: number;
	frameMult: number;
	playSpeed: number;
	playDirection: number;
	playCount: number;
	isPaused: boolean;
	autoplay: boolean;
	loop: boolean;
	renderer: any;
	animationID: string;
	assetsPath: string;
	timeCompleted: number;
	segmentPos: number;
	isSubframeEnabled: boolean;
	segments: AnimationSegment | AnimationSegment[];
	play(name?: string): void;
	stop(name?: string): void;
	togglePause(name?: string): void;
	destroy(name?: string): void;
	pause(name?: string): void;
	goToAndStop(value: number, isFrame?: boolean, name?: string): void;
	goToAndPlay(value: number, isFrame?: boolean, name?: string): void;
	includeLayers(data: any): void;
	setSegment(init: number, end: number): void;
	resetSegments(forceFlag: boolean): void;
	hide(): void;
	show(): void;
	resize(): void;
	setSpeed(speed: number): void;
	setDirection(direction: AnimationDirection): void;
	playSegments(segments: AnimationSegment | AnimationSegment[], forceFlag?: boolean): void;
	setSubframe(useSubFrames: boolean): void;
	getDuration(inFrames?: boolean): number;
	triggerEvent<T = any>(name: AnimationEventName, args: T): void;
	addEventListener<T = any>(name: AnimationEventName, callback: AnimationEventCallback<T>): () => void;
	removeEventListener<T = any>(name: AnimationEventName, callback?: AnimationEventCallback<T>): void;
};
