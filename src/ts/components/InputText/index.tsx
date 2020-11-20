import * as React from "react";
import { ChangeEvent, useCallback } from "react";

import * as s from "./styles.scss";

interface IProps {
	value: string;
	onChange?: (value: string) => void;
}

const InputText = ({ value, onChange }: IProps): JSX.Element => {
	const handleChange = useCallback(
		(event: ChangeEvent<HTMLInputElement>) => {
			onChange?.(event.target.value);
		},
		[onChange],
	);
	return (
		<div className={s.main}>
			<input className={s.input} type={"text"} value={value} onChange={handleChange} />
		</div>
	);
};

export default InputText;
