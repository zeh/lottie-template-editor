import Config from "config/Config";

let lastHeight = NaN;
let lastWidth = NaN;

const setCSSHeightVariable = (): void => {
	if (Config.Platform.IS_MOBILE && (window.innerWidth !== lastWidth || isNaN(lastHeight))) {
		const vh = window.innerHeight / 100;
		lastHeight = window.innerHeight;
		lastWidth = window.innerWidth;
		document.documentElement.style.setProperty("--vh", `${vh}px`);
	}
};

export const initializeCSSHeightVariableHelper = (): void => {
	window.addEventListener("resize", setCSSHeightVariable);
	setCSSHeightVariable();
};
