import QuerySelector from '../../query-selector/QuerySelector.js';
import HTMLElement from '../html-element/HTMLElement.js';
import * as PropertySymbol from '../../PropertySymbol.js';
import DOMTokenList from '../../dom/DOMTokenList.js';
/**
 * HTMLTableCellElement
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLTableCellElement
 */
export default class HTMLTableCellElement extends HTMLElement {
    [PropertySymbol.headers] = null;
    /**
     * Returns abbr.
     *
     * @returns Abbr.
     */
    get abbr() {
        return this.getAttribute('abbr') || '';
    }
    /**
     * Sets abbr.
     *
     * @param value Abbr.
     */
    set abbr(value) {
        this.setAttribute('abbr', value);
    }
    /**
     * A number representing the cell's position in the cells collection of the <tr> the cell is contained within. If the cell doesn't belong to a <tr>, it returns -1.
     *
     * @returns Cell index.
     */
    get cellIndex() {
        let parent = this.parentNode;
        while (parent) {
            if (parent[PropertySymbol.tagName] === 'TR') {
                const cells = QuerySelector.querySelectorAll(parent, 'td,th')[PropertySymbol.items];
                return cells.indexOf(this);
            }
            parent = parent.parentNode;
        }
        return -1;
    }
    /**
     * Returns colspan.
     *
     * @returns Colspan.
     */
    get colSpan() {
        const value = Number(this.getAttribute('colspan'));
        return isNaN(value) || value < 1 ? 1 : value;
    }
    /**
     * Sets colspan.
     *
     * @param value Colspan.
     */
    set colSpan(value) {
        const parsedValue = Number(value);
        this.setAttribute('colspan', isNaN(parsedValue) || parsedValue < 1 ? '1' : String(parsedValue));
    }
    /**
     * A DOMTokenList describing a list of id of <th> elements that represent headers associated with the cell. It reflects the headers attribute.
     *
     * @returns Headers.
     */
    get headers() {
        if (!this[PropertySymbol.headers]) {
            this[PropertySymbol.headers] = new DOMTokenList(PropertySymbol.illegalConstructor, this, 'headers');
        }
        return this[PropertySymbol.headers];
    }
    /**
     * Returns rowspan.
     *
     * @returns Rowspan.
     */
    get rowSpan() {
        const value = Number(this.getAttribute('rowspan'));
        return isNaN(value) || value < 1 ? 1 : value;
    }
    /**
     * Sets rowspan.
     *
     * @param value Rowspan.
     */
    set rowSpan(value) {
        const parsedValue = Number(value);
        this.setAttribute('rowspan', isNaN(parsedValue) || parsedValue < 1 ? '1' : String(parsedValue));
    }
    /**
     * Returns scope.
     *
     * @returns Scope.
     */
    get scope() {
        return this.getAttribute('scope') || '';
    }
    /**
     * Sets scope.
     *
     * @param value Scope.
     */
    set scope(value) {
        this.setAttribute('scope', value);
    }
}
//# sourceMappingURL=HTMLTableCellElement.js.map