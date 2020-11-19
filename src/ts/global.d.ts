declare module "*.json";
declare module "*.svg";
declare module "*.jpg";
declare module "*.png";

// Avoid errors on unprocessed type files
// https://github.com/Megaputer/dts-css-modules-loader#usage-in-typescript
declare module "*.scss" {
	const classes: Record<string, string>;
	export = classes;
}
