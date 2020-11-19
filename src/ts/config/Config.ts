declare let __BUILD_DEV_MODE__: boolean;
declare let __BUILD_DATE__: string;

export default {
	App: {
		BUILD_DATE: __BUILD_DATE__,
	},
	Env: {
		DEV_MODE: __BUILD_DEV_MODE__,
		USING_TEST_DOMAIN:
			location.hostname.includes("localhost") ||
			location.hostname.includes("0.0.0.0") ||
			location.hostname.includes("netlify"),
	},
	Platform: {
		CPU_SCALE: /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) ? 0.5 : 1,
		IS_MOBILE: /iPhone|iPad|iPod|Android/i.test(navigator.userAgent),
		SUPPORTS_HOVER: matchMedia("(hover:hover)").matches,
		SUPPORTS_HOVER_AND_MOUSE: matchMedia("(hover:hover)").matches && matchMedia("(pointer:fine)").matches,
		SUPPORTS_MOUSE: matchMedia("(pointer:fine)").matches,
		SUPPORTS_TOUCH: Boolean("ontouchstart" in document.documentElement),
	},
};
