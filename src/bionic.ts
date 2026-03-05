const SKIP_TAGS = new Set(["CODE", "PRE", "STYLE", "SCRIPT", "SVG", "MATH"]);

function resetExistingBionicSpans(el: HTMLElement): void {
	for (const span of Array.from(el.querySelectorAll("span.bionic-bold"))) {
		span.replaceWith(document.createTextNode(span.textContent ?? ""));
	}
	// Merge adjacent text nodes after unwrapping previous bionic spans.
	el.normalize();
}

function shouldSkip(node: Node): boolean {
	let current = node.parentElement;
	while (current) {
		if (SKIP_TAGS.has(current.tagName)) {
			return true;
		}
		current = current.parentElement;
	}
	return false;
}

function getBoldLength(wordLength: number, fixation: number): number {
	if (wordLength <= 0) return 0;
	if (wordLength <= 3) return 1;
	if (wordLength === 4) return 2;
	return Math.ceil(wordLength * fixation);
}

/**
 * Walks all text nodes inside `el` and wraps the first portion
 * of each word in a <span class="bionic-bold"> element.
 *
 * @param el - The container HTML element to process
 * @param fixation - A number between 0.0 and 1.0 controlling how
 *                   many characters per word are bolded (default 0.5)
 */
export function bionicifyElement(el: HTMLElement, fixation: number): void {
	resetExistingBionicSpans(el);

	const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
	const textNodes: Text[] = [];

	let node: Node | null;
	while ((node = walker.nextNode())) {
		textNodes.push(node as Text);
	}

	for (const textNode of textNodes) {
		if (shouldSkip(textNode)) continue;

		const text = textNode.textContent;
		if (!text || !text.trim()) continue;

		const fragment = document.createDocumentFragment();
		// Split into Latin words vs everything else (CJK, punctuation, whitespace)
		const tokens = text.match(/[a-zA-Z\u00C0-\u024F']+|[^a-zA-Z\u00C0-\u024F']+/g);

		if (!tokens) continue;

		for (const token of tokens) {
			const isLatinWord = /[a-zA-Z\u00C0-\u024F]/.test(token);

			if (!isLatinWord) {
				fragment.appendChild(document.createTextNode(token));
				continue;
			}

			const boldLen = getBoldLength(token.length, fixation);
			const boldPart = token.slice(0, boldLen);
			const restPart = token.slice(boldLen);

			const boldSpan = document.createElement("span");
			boldSpan.className = "bionic-bold";
			boldSpan.textContent = boldPart;
			fragment.appendChild(boldSpan);

			if (restPart) {
				fragment.appendChild(document.createTextNode(restPart));
			}
		}

		textNode.parentNode?.replaceChild(fragment, textNode);
	}
}
