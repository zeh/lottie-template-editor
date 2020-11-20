import * as React from "react";
import cx from "classnames";

import Text from "components/Text";

import * as s from "./styles.scss";

interface IProps {
	animation: unknown | null;
	className?: string;
}

const Sidebar = ({ className }: IProps): JSX.Element => {
	return (
		<div className={cx(className, s.main)}>
			<Text.H1>H1</Text.H1>
			<Text.H2>H2</Text.H2>
			<Text.H3>H3</Text.H3>
			<Text.H4>H4</Text.H4>
			<Text.P>This is a paragraph.</Text.P>
		</div>
	);
};

export default Sidebar;
