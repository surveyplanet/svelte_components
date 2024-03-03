import {
	type Side,
	type Placement,
	computePosition,
	flip,
	shift,
	offset,
	arrow,
} from '@floating-ui/dom';

// To ensure the floating element remains anchored to its reference element,
// such as when scrolling and resizing the screen: https://floating-ui.com/docs/autoUpdate
// autoUpdate

export interface ToolTipOptions {
	content: string;
	placement?: Placement;
	padding?: number;
}

/**
 * Attaches a tooltip to the given HTML element.
 * @param {HTMLElement} node - The HTML element to attach the tooltip to.
 * @param {ToolTipOptions} options - The parameters for the tooltip.
 * @param {ToolTipOptions['content']} [options.content=''] - Text content of the tooltip.
 * @param {ToolTipOptions['placement']} [options.placement='top'] - The placement of the tooltip.
 * @example
 * ```html
 * <button use:tooltip={{ content: 'Click me', placement="left" }}>Click me</button>
 * ```
 */
export function tooltip(node: HTMLElement, options: ToolTipOptions) {
	let tipEl: HTMLSpanElement | undefined;
	let arrowEl: HTMLSpanElement | undefined;
	const { placement = 'top', padding = 5 } = options;

	const update = () => {
		if (!tipEl) return;

		const middleware = [flip(), shift({ padding }), offset(padding)];

		if (arrowEl) {
			middleware.push(arrow({ element: arrowEl, padding }));
		}

		computePosition(node, tipEl, {
			placement,
			middleware,
		}).then(({ x, y, placement, middlewareData }) => {
			Object.assign(tipEl!.style, {
				left: `${x}px`,
				top: `${y}px`,
			});

			if (!arrowEl || !middlewareData.arrow) return;

			const arrowStyles = {
				left:
					middlewareData.arrow.x != null
						? `${middlewareData.arrow.x}px`
						: '',
				top:
					middlewareData.arrow.y != null
						? `${middlewareData.arrow.y}px`
						: '',
				right: '',
				bottom: '',
			};

			const side = placement.split('-')[0];

			const staticSide = {
				top: 'bottom',
				right: 'left',
				bottom: 'top',
				left: 'right',
			}[side] as Side;

			arrowStyles[staticSide] = `-3px`; // arrow is 8px

			Object.assign(arrowEl.style, arrowStyles);
		});
	};

	const createElement = () => {
		if (!tipEl) {
			tipEl = document.createElement('div');
		}

		tipEl.className = `sp-tooltip ${placement}`;
		tipEl.textContent = options.content;

		if (!arrowEl) {
			arrowEl = document.createElement('span');
		}
		arrowEl.className = 'sp-tooltip--arrow';
		tipEl.appendChild(arrowEl);

		document.body.appendChild(tipEl);
	};

	const mouseOverHandler = () => {
		createElement();
		update();
	};

	const mouseLeaveHandler = () => {
		if (tipEl) {
			document.body.removeChild(tipEl);
		}
	};

	// If you want an event to fire every time the mouse pointer enters the element or any of its children, use mouseover.
	// If you want an event to fire only when the mouse pointer enters the element itself and not its children, use mouseenter.
	node.addEventListener('mouseenter', mouseOverHandler);
	node.addEventListener('mouseleave', mouseLeaveHandler);

	return {
		destroy() {
			node.removeEventListener('mouseenter', mouseOverHandler);
			node.removeEventListener('mouseleave', mouseLeaveHandler);
		},
	};
}
