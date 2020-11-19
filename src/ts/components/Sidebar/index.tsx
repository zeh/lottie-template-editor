import * as React from "react";
import cx from "classnames";

import * as s from "./styles.scss";

interface IProps {
	className?: string;
}

const Sidebar = ({ className }: IProps): JSX.Element => {
	return (
		<div className={cx(className, s.main)}>
			<div className={s.content}>Ok</div>
		</div>
	);
};

export default Sidebar;
