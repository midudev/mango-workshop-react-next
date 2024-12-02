import HTMLElement from '../html-element/HTMLElement.cjs';
import * as PropertySymbol from '../../PropertySymbol.cjs';
import DOMTokenList from '../../dom/DOMTokenList.cjs';
/**
 * HTMLTableCellElement
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLTableCellElement
 */
export default class HTMLTableCellElement extends HTMLElement {
    [PropertySymbol.headers]: DOMTokenList | null;
    /**
     * Returns abbr.
     *
     * @returns Abbr.
     */
    get abbr(): string;
    /**
     * Sets abbr.
     *
     * @param value Abbr.
     */
    set abbr(value: string);
    /**
     * A number representing the cell's position in the cells collection of the <tr> the cell is contained within. If the cell doesn't belong to a <tr>, it returns -1.
     *
     * @returns Cell index.
     */
    get cellIndex(): number;
    /**
     * Returns colspan.
     *
     * @returns Colspan.
     */
    get colSpan(): number;
    /**
     * Sets colspan.
     *
     * @param value Colspan.
     */
    set colSpan(value: number);
    /**
     * A DOMTokenList describing a list of id of <th> elements that represent headers associated with the cell. It reflects the headers attribute.
     *
     * @returns Headers.
     */
    get headers(): DOMTokenList;
    /**
     * Returns rowspan.
     *
     * @returns Rowspan.
     */
    get rowSpan(): number;
    /**
     * Sets rowspan.
     *
     * @param value Rowspan.
     */
    set rowSpan(value: number);
    /**
     * Returns scope.
     *
     * @returns Scope.
     */
    get scope(): string;
    /**
     * Sets scope.
     *
     * @param value Scope.
     */
    set scope(value: string);
}
//# sourceMappingURL=HTMLTableCellElement.d.ts.map