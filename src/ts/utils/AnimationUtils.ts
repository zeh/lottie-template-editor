export enum FieldTypes {
	Text = "text",
	Image = "image",
	Shape = "shape",
}

interface IFieldBase {
	name: string;
}

export type IFieldText = IFieldBase & {
	type: FieldTypes.Text;
	value: string;
	color: [number, number, number];
	path: [ind: number, kIndex: number];
};

export type IFieldImage = IFieldBase & {
	type: FieldTypes.Image;
	width: number;
	height: number;
	path: [assetId: string];
};

export type IFieldShape = IFieldBase & {
	type: FieldTypes.Shape;
	color: [number, number, number, number];
	path: number[]; // ind, then shape/shape.it array indexes
};

export type IField = IFieldText | IFieldImage | IFieldShape;

/**
 * Given a Lottie animation, extracts all possible fields (images, text, colors)
 */
export const extractFields = (animation: any): IField[] => {
	const layers = animation?.layers;
	const assets = animation?.assets;
	const fields: IField[] = [];
	if (layers && assets) {
		// nm: name
		// ind: index
		// parent: index of parent
		// ty: type (3 = text parent container?)
		// for type 4:
		// .shapes[] -> shape[]
		layers.forEach((l: any) => {
			if (l.ty === 5) {
				// Text
				l.t.d.k.forEach((k: any, ki: number) => {
					fields.push({
						type: FieldTypes.Text,
						name: l.nm,
						value: k.s.t,
						color: k.s.fc,
						path: [l.ind, ki],
					});
				});
			} else if (l.ty === 4) {
				// Shape
				fields.push(...extractShapes([l.ind], l.shapes));
			} else if (l.ty === 0) {
				// Comp
				// TODO: might have to do this recursively
				const compAsset = assets.find((a: any) => a.id === l.refId);
				compAsset?.layers.forEach((cl: any) => {
					if (cl.ty === 2) {
						// Image
						const imageAsset = assets.find((a: any) => a.id === cl.refId);
						fields.push({
							type: FieldTypes.Image,
							name: cl.nm,
							width: imageAsset.w,
							height: imageAsset.h,
							path: [cl.refId],
						});
					}
				});
			}
		});
	}
	return fields;
};

/**
 * On a {ty: 4}.shapes, extract all field shapes.
 * This is needed for recursiveness.
 */
const extractShapes = (path: number[], shapes: any[]): IFieldShape[] => {
	const newShapes: IFieldShape[] = [];
	shapes.forEach((s, si) => {
		// .shape.ty = gr (group), rc (rectangle mask?), fl (fill? has color), tr (transform)
		if (s.ty === "gr") {
			// Group
			// .shape.it = children shape[]
			newShapes.push(...extractShapes([...path, si], s.it));
		} else if (s.ty === "fl") {
			// .shape.c.k => color
			newShapes.push({
				type: FieldTypes.Shape,
				name: s.nm,
				color: s.c.k,
				path: [...path, si],
			});
		} else {
			// Ignored
		}
	});
	return newShapes;
};
