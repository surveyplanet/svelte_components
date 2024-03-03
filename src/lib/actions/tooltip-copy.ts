export interface ToolTipOptions {
	content: string;
	position?: 'top' | 'right' | 'bottom' | 'left';
}

/**
 * Attaches a tooltip to the given HTML element.
 * @param {HTMLElement} node - The HTML element to attach the tooltip to.
 * @param {ToolTipOptions} options - The parameters for the tooltip.
 * @param {ToolTipOptions['content']} [options.content=''] - Text content of the tooltip.
 * @param {ToolTipOptions['position']} [options.position='top'] - The position of the tooltip.
 * @example
 * ```html
 * <button use:tooltip={{ content: 'Click me', position="left" }}>Click me</button>
 * ```
 */
export function tooltip(node: HTMLElement, options: ToolTipOptions) {
	let tipEl: HTMLSpanElement | undefined;
	const { position = 'top' } = options;

	const mouseOverHandler = () => {
		console.log('--> mouseOverHandler');

		// There should only ever be one tip element on the page at a time.
		// let tipEl = document.querySelector('.sp-tooltip');
		if (!tipEl) {
			tipEl = document.createElement('span');
		}

		tipEl.className = `sp-tooltip ${position}`;
		document.body.appendChild(tipEl);

		tipEl.textContent = options.content;
	};

	const mouseMoveHandler = (event: MouseEvent) => {
		console.log('--> <-- mouseMoveHandler');
		if (tipEl) {
			const rect = tipEl.getBoundingClientRect();
			tipEl.style.left = `${event.pageX - rect.width / 2}px`;
			tipEl.style.top = `${event.pageY + 15}px`;
		}
	};

	const mouseLeaveHandler = () => {
		console.log('<-- mouseLeaveHandler');
		if (tipEl) {
			document.body.removeChild(tipEl);
		}
	};

	node.addEventListener('mouseover', mouseOverHandler);
	node.addEventListener('mouseleave', mouseLeaveHandler);
	node.addEventListener('mousemove', mouseMoveHandler);

	return {
		destroy() {
			node.removeEventListener('mouseover', mouseOverHandler);
			node.removeEventListener('mouseleave', mouseLeaveHandler);
			node.removeEventListener('mousemove', mouseMoveHandler);
		},
	};
}
