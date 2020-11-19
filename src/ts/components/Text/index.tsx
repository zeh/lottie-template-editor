import * as React from "react";
import cx from "classnames";

import * as s from "./styles.scss";

interface IProps {
	children?: React.ReactNode;
	className?: string;
}

const template = (baseClassName: string) => {
	// eslint-disable-next-line react/display-name
	return ({ className, children }: IProps): JSX.Element => {
		return <div className={cx(baseClassName, className)}>{children}</div>;
	};
};

export default {
	H1: template(s.h1),
	H2: template(s.h2),
	H3: template(s.h3),
	H4: template(s.h4),
	P: template(s.p),
};
