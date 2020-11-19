import * as React from "react";
import { useCallback, useEffect, useState } from "react";
import cx from "classnames";

import * as s from "./styles.scss";

interface IProps {
	className?: string;
	onDropFiles?: (files: File[]) => void;
}

const DropTarget = ({ className, onDropFiles }: IProps): JSX.Element => {
	const [isDraggingOverWindow, setIsDraggingOverWindow] = useState(false);

	const handleWindowDragEnter = useCallback(() => {
		if (!isDraggingOverWindow) {
			setIsDraggingOverWindow(true);
		}
	}, [setIsDraggingOverWindow]);

	const handleWindowDrop = useCallback(
		(e: DragEvent) => {
			setIsDraggingOverWindow(false);
			e.preventDefault();
		},
		[setIsDraggingOverWindow],
	);

	const handleDragLeave = useCallback(() => {
		setIsDraggingOverWindow(false);
	}, [setIsDraggingOverWindow]);

	const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
	}, []);

	const handleFilesDrop = useCallback(
		(files: File[]) => {
			if (files.length > 0 && onDropFiles) {
				onDropFiles(files);
			}
		},
		[onDropFiles],
	);

	const handleDrop = useCallback(
		(e: React.DragEvent<HTMLDivElement>) => {
			// Prevent default behavior (Prevent file from being opened)
			e.preventDefault();

			if (e.dataTransfer.items) {
				// Use DataTransferItemList interface to access the file(s)
				const files: File[] = [];
				for (let i = 0; i < e.dataTransfer.items.length; i++) {
					// If dropped items aren't files, reject them
					if (e.dataTransfer.items[i].kind === "file") {
						const file = e.dataTransfer.items[i].getAsFile();
						if (file) files.push(file);
					}
				}
				handleFilesDrop(files);
			} else {
				// Use DataTransfer interface to access the file(s)
				const files: File[] = [];
				for (let i = 0; i < e.dataTransfer.files.length; i++) {
					const file = e.dataTransfer.files[i];
					if (file) files.push(file);
				}
				handleFilesDrop(files);
			}
			// TODO: Maybe read with https://developer.mozilla.org/en-US/docs/Web/API/File
		},
		[handleFilesDrop],
	);

	useEffect(() => {
		window.addEventListener("dragenter", handleWindowDragEnter);
		window.addEventListener("drop", handleWindowDrop);

		return () => {
			window.removeEventListener("dragenter", handleWindowDragEnter);
			window.removeEventListener("drop", handleWindowDrop);
		};
	}, [handleWindowDragEnter, handleWindowDrop]);

	const classes = [s.main, isDraggingOverWindow ? undefined : s.hidden, className];

	return <div className={cx(classes)} onDrop={handleDrop} onDragOver={handleDragOver} onDragLeave={handleDragLeave} />;
};

export default DropTarget;
