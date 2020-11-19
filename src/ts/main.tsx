console.info("Starting...");

import "core-js/stable";

import * as React from "react";
import * as ReactDOM from "react-dom";

import App from "components/App";
import Config from "config/Config";
import { initializeCSSHeightVariableHelper } from "utils/PageUtils";
import { showFPS } from "./utils/FPSCounter";

initializeCSSHeightVariableHelper();

if (Config.Env.DEV_MODE) showFPS();

ReactDOM.render(<App />, document.getElementById("content"));

console.info(`Started; app built in ${Config.App.BUILD_DATE}, dev mode is ${Config.Env.DEV_MODE ? "ON" : "OFF"}.`);
