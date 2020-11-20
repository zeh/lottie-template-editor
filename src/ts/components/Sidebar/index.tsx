import * as React from "react";
import { Fragment, useCallback, useMemo, useState } from "react";
import cx from "classnames";

import Text from "components/Text";
import InputText from "components/InputText";
import { FieldTypes, IFieldImage, IFieldShape, IFieldText, extractFields } from "utils/AnimationUtils";

import * as s from "./styles.scss";

interface IProps {
	animation: unknown | null;
	className?: string;
}

const colorToHex = (c: number[]): string => {
	return (
		"#" +
		c
			.slice(0, 3)
			.map((c) => ("00" + Math.round(c * 255).toString(16)).substr(-2, 2))
			.join("")
	);
};

interface IFieldTextProps {
	field: IFieldText;
	onChangeText?: (value: string, keyframeIndex: number) => void;
}

const FieldTextCell = ({ onChangeText, field }: IFieldTextProps): JSX.Element => {
	return (
		<div className={s.fieldCell}>
			<div className={s.fieldTitle}>{"Text"}</div>
			<div className={s.fieldName}>{`Name: ${field.name}`}</div>
			{field.keyframes.map((k, ki) => (
				<Fragment key={ki}>
					<div className={s.fieldKeyframe}>{`Keyframe: ${ki + 1}`}</div>
					<InputText value={k.value} onChange={(value) => onChangeText?.(value, ki)} />
					<div className={s.fieldValue}>{colorToHex(k.color)}</div>
				</Fragment>
			))}
		</div>
	);
};

const FieldImageCell = ({ field }: { field: IFieldImage }): JSX.Element => {
	return (
		<div className={s.fieldCell}>
			<div className={s.fieldTitle}>{"Image"}</div>
			<div className={s.fieldName}>{`Name: ${field.name}`}</div>
			<div className={s.fieldDetail}>{`${field.width}x${field.height}px`}</div>
			<div className={s.fieldValue}>{field.assetName}</div>
		</div>
	);
};

const FieldShapeCell = ({ field }: { field: IFieldShape }): JSX.Element => {
	return (
		<div className={s.fieldCell}>
			<div className={s.fieldTitle}>{"Shape"}</div>
			<div className={s.fieldName}>{`Name: ${field.name}`}</div>
			<div className={s.fieldValue}>{colorToHex(field.color)}</div>
		</div>
	);
};

const Sidebar = ({ animation, className }: IProps): JSX.Element => {
	const fields = useMemo(() => extractFields(animation), [animation]);

	const [changes, setChanges] = useState<any>({});

	const handleChangeText = useCallback(
		(f: IFieldText, value: string, keyframeIndex: number) => {
			// TODO: add to list of changes
			console.log(">>> change", f, value, keyframeIndex);
		},
		[animation],
	);

	return (
		<div className={cx(className, s.main)}>
			{animation ? (
				<div className={s.fields}>
					<div className={s.fieldsContainer}>
						{fields.map((f, i) => {
							if (f.type === FieldTypes.Text) {
								return (
									<FieldTextCell
										key={i}
										field={f}
										onChangeText={(value, keyframeIndex) => handleChangeText(f, value, keyframeIndex)}
									></FieldTextCell>
								);
							} else if (f.type === FieldTypes.Image) {
								return <FieldImageCell key={i} field={f}></FieldImageCell>;
							} else if (f.type === FieldTypes.Shape) {
								return <FieldShapeCell key={i} field={f}></FieldShapeCell>;
							} else {
								return null;
							}
						})}
					</div>
				</div>
			) : (
				<div className={s.placeholderMessage}>
					<Text.P>{"No elements found"}</Text.P>
				</div>
			)}
		</div>
	);
};

export default Sidebar;
