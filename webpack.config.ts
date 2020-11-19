import * as path from "path";
import * as Webpack from "webpack";
import * as WebpackDevServer from "webpack-dev-server";
import * as HtmlWebpackPlugin from "html-webpack-plugin";
import { CleanWebpackPlugin } from "clean-webpack-plugin";
import * as MiniCssExtractPlugin from "mini-css-extract-plugin";
import * as TerserPlugin from "terser-webpack-plugin";

declare let process: NodeJS.Process;
declare let __dirname: string;

const PRODUCTION = process.env.NODE_ENV === "production";
const NOW = new Date();

const fnum = (num: number): string => {
	return ("00" + num.toString(10)).substr(-2);
};

const basePlugins = [
	new Webpack.DefinePlugin({
		__BUILD_DEV_MODE__: JSON.stringify(!PRODUCTION),
		__BUILD_DATE__: JSON.stringify(`${NOW.getFullYear()}-${fnum(NOW.getMonth() + 1)}-${fnum(NOW.getDate())}`),
	}),
	new MiniCssExtractPlugin({
		filename: "[name].css", // Could also use: "[name]-[chunkhash:6].css"
	}),
	new HtmlWebpackPlugin({
		cacheBuster: PRODUCTION ? `?d=${NOW.getTime()}` : "",
		template: "./src/index.html",
		filename: "index.html",
		inject: false,
		minify: false,
	}),
];

const prodPluginsBefore = [
	new CleanWebpackPlugin({
		dry: false,
	}),
];

const plugins = [...(PRODUCTION ? prodPluginsBefore : []), ...basePlugins];

const config: Webpack.Configuration & WebpackDevServer.Configuration = {
	entry: {
		app: ["./src/ts/main.tsx", "./src/scss/main.scss"],
	},

	// Fix for https://github.com/webpack/webpack-dev-server/issues/2758
	...(PRODUCTION
		? {}
		: {
				target: "web",
		  }),

	optimization: {
		moduleIds: "named",
		minimize: PRODUCTION,
		minimizer: [
			new TerserPlugin({
				parallel: true,
				terserOptions: {
					ecma: 2015,
					output: {
						beautify: !PRODUCTION,
						comments: false,
					},
				},
			}),
		],
		splitChunks: {
			chunks: "all",
			cacheGroups: {
				defaultVendors: {
					test: /[\\/]node_modules[\\/](.(?!.*\.s?css$))*$/,
					name: "vendor",
					chunks: "all",
				},
				data: {
					test: /.*(yaml|json)$/,
					name: "data",
					chunks: "all",
				},
			},
		},
	},

	output: {
		path: path.join(__dirname, "dist"),
		filename: "[name].js",
		publicPath: "/",
	},

	devtool: PRODUCTION ? undefined : "source-map",

	plugins: plugins,

	devServer: {
		contentBase: false,
		compress: true,
		host: "0.0.0.0",
		port: parseInt(process.env.PORT ?? "") ?? 8080,
		hot: false,
		inline: true,
		historyApiFallback: true,
	},

	externals: {
		"react/addons": true,
		"react/lib/ExecutionEnvironment": true,
		"react/lib/ReactContext": true,
	},

	resolve: {
		extensions: [".ts", ".tsx", ".js"],
		modules: ["node_modules", "src/ts"],
	},

	module: {
		rules: [
			{
				test: /\.scss$/,
				exclude: /node_modules/,
				use: [
					// Alternative: "style-loader"
					{
						loader: MiniCssExtractPlugin.loader,
						options: {
							publicPath: "../",
							modules: {
								namedExport: true,
							},
						},
					},
					{
						loader: "dts-css-modules-loader",
						options: {
							namedExport: true,
							banner: "// This file is generated automatically; do not edit",
						},
					},
					{
						loader: "css-loader",
						options: {
							modules: {
								namedExport: true,
								mode: "local",
								localIdentName: PRODUCTION ? "[sha1:contenthash:base64:8]" : "[folder]__[name]__[local]",
								exportLocalsConvention: "camelCaseOnly",
							},
							importLoaders: 1,
						},
					},
					"postcss-loader",
					{
						loader: "sass-loader",
					},
				],
			},
			{
				test: /\.json$/,
				type: "javascript/auto",
				exclude: /node_modules/,
				use: ["json-loader", "webpack-comment-remover-loader"],
			},
			{
				test: /\.tsx?$/,
				exclude: /node_modules/,
				use: [
					{
						loader: "babel-loader",
						options: {
							babelrc: true,
						},
					},
					"ts-loader",
				],
			},
			{
				test: /\.js$/,
				use: [
					{
						loader: "babel-loader",
						options: {
							babelrc: true,
						},
					},
				],
			},
			{
				test: /assets.+\.(png|jpg|jpeg|gif|svg)$/,
				use: [
					{
						loader: "url-loader",
						options: {
							name: "assets/[path][name].[ext]",
							context: "./src/assets",
							limit: 200,
						},
					},
					{
						loader: "image-webpack-loader",
						options: {
							disable: !PRODUCTION,
							mozjpeg: {
								quality: 85,
							},
							pngquant: {
								quality: [0.75, 1],
								speed: 1, // 1 (brute-force) to 11 (fastest); default 4
								strip: true,
							},
							svgo: {
								plugins: [
									{
										removeTitle: true,
									},
								],
							},
							optipng: {
								optimizationLevel: 3,
							},
						},
					},
				],
			},
		],
	},

	performance: {
		maxEntrypointSize: 512000,
		maxAssetSize: 512000,
	},
};

export default config;
