import * as PropertySymbol from '../../PropertySymbol.js';
import DOMException from '../../exception/DOMException.js';
import DOMExceptionNameEnum from '../../exception/DOMExceptionNameEnum.js';
import NamespaceURI from '../../config/NamespaceURI.js';
/**
 * Named Node Map.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/NamedNodeMap
 */
export default class NamedNodeMap {
    // All items with the namespaceURI as prefix
    [PropertySymbol.namespaceItems] = new Map();
    // Items without namespaceURI as prefix, where the HTML namespace is the default namespace
    [PropertySymbol.namedItems] = new Map();
    /**
     * Constructor.
     *
     * @param ownerElement Owner element.
     */
    constructor(ownerElement) {
        this[PropertySymbol.ownerElement] = ownerElement;
    }
    /**
     * Returns length.
     *
     * @returns Length.
     */
    get length() {
        return this[PropertySymbol.namespaceItems].size;
    }
    /**
     * Returns string.
     *
     * @returns string.
     */
    get [Symbol.toStringTag]() {
        return 'NamedNodeMap';
    }
    /**
     * Returns string.
     *
     * @returns string.
     */
    toString() {
        return '[object NamedNodeMap]';
    }
    /**
     * Iterator.
     *
     * @returns Iterator.
     */
    [Symbol.iterator]() {
        return this[PropertySymbol.namespaceItems].values();
    }
    /**
     * Returns item by index.
     *
     * @param index Index.
     */
    item(index) {
        const items = Array.from(this[PropertySymbol.namespaceItems].values());
        return index >= 0 && items[index] ? items[index] : null;
    }
    /**
     * Returns named item.
     *
     * @param name Name.
     * @returns Item.
     */
    getNamedItem(name) {
        return (this[PropertySymbol.namedItems].get(this[PropertySymbol.getNamedItemKey](this[PropertySymbol.ownerElement][PropertySymbol.namespaceURI], name)) || null);
    }
    /**
     * Returns item by name and namespace.
     *
     * @param namespace Namespace.
     * @param localName Local name of the attribute.
     * @returns Item.
     */
    getNamedItemNS(namespace, localName) {
        for (const item of this[PropertySymbol.namespaceItems].values()) {
            if (item[PropertySymbol.namespaceURI] === namespace &&
                item[PropertySymbol.localName] === localName) {
                return item;
            }
        }
        return null;
    }
    /**
     * Sets named item.
     *
     * @param item Item.
     * @returns Replaced item.
     */
    setNamedItem(item) {
        return this[PropertySymbol.setNamedItem](item);
    }
    /**
     * Adds a new namespaced item.
     *
     * @alias setNamedItem()
     * @param item Item.
     * @returns Replaced item.
     */
    setNamedItemNS(item) {
        return this[PropertySymbol.setNamedItem](item);
    }
    /**
     * Removes an item.
     *
     * @throws DOMException
     * @param name Name of item.
     * @returns Removed item.
     */
    removeNamedItem(name) {
        const item = this.getNamedItem(name);
        if (!item) {
            throw new DOMException(`Failed to execute 'removeNamedItem' on 'NamedNodeMap': No item with name '${name}' was found.`, DOMExceptionNameEnum.notFoundError);
        }
        this[PropertySymbol.removeNamedItem](item);
        return item;
    }
    /**
     * Removes a namespaced item.
     *
     * @param namespace Namespace.
     * @param localName Local name of the item.
     * @returns Removed item.
     */
    removeNamedItemNS(namespace, localName) {
        const item = this.getNamedItemNS(namespace, localName);
        if (!item) {
            throw new DOMException(`Failed to execute 'removeNamedItemNS' on 'NamedNodeMap': No item with name '${localName}' in namespace '${namespace}' was found.`, DOMExceptionNameEnum.notFoundError);
        }
        this[PropertySymbol.removeNamedItem](item);
        return item;
    }
    /**
     * Sets named item.
     *
     * @param item Item.
     * @param [ignoreListeners] Ignore listeners.
     * @returns Replaced item.
     */
    [PropertySymbol.setNamedItem](item, ignoreListeners = false) {
        if (!item[PropertySymbol.name]) {
            return null;
        }
        item[PropertySymbol.ownerElement] = this[PropertySymbol.ownerElement];
        const namespaceItemKey = this[PropertySymbol.getNamespaceItemKey](item);
        const replacedItem = this[PropertySymbol.namespaceItems].get(namespaceItemKey) || null;
        const replacedNamedItem = this[PropertySymbol.namedItems].get(item[PropertySymbol.name]) || null;
        this[PropertySymbol.namespaceItems].set(namespaceItemKey, item);
        // The HTML namespace should be prioritized over other namespaces in the namedItems map
        // The HTML namespace is the default namespace
        if ((!replacedNamedItem ||
            (replacedNamedItem[PropertySymbol.namespaceURI] &&
                replacedNamedItem[PropertySymbol.namespaceURI] !== NamespaceURI.html) ||
            !item[PropertySymbol.namespaceURI] ||
            item[PropertySymbol.namespaceURI] === NamespaceURI.html) &&
            // Only lower case names should be stored in the namedItems map
            (this[PropertySymbol.ownerElement][PropertySymbol.namespaceURI] !== NamespaceURI.html ||
                item[PropertySymbol.name].toLowerCase() === item[PropertySymbol.name])) {
            this[PropertySymbol.namedItems].set(item[PropertySymbol.name], item);
        }
        if (!ignoreListeners) {
            this[PropertySymbol.ownerElement][PropertySymbol.onSetAttribute](item, replacedItem);
        }
        return replacedItem;
    }
    /**
     * Removes named item.
     *
     * @param item Item.
     * @param ignoreListeners
     */
    [PropertySymbol.removeNamedItem](item, ignoreListeners = false) {
        item[PropertySymbol.ownerElement] = null;
        this[PropertySymbol.namespaceItems].delete(this[PropertySymbol.getNamespaceItemKey](item));
        this[PropertySymbol.namedItems].delete(this[PropertySymbol.getNamedItemKey](this[PropertySymbol.ownerElement][PropertySymbol.namespaceURI], item[PropertySymbol.name]));
        if (!ignoreListeners) {
            this[PropertySymbol.ownerElement][PropertySymbol.onRemoveAttribute](item);
        }
    }
    /**
     * Returns item name based on namespace.
     *
     * @param namespaceURI Namespace.
     * @param name Name.
     * @returns Item name based on namespace.
     */
    [PropertySymbol.getNamedItemKey](namespaceURI, name) {
        if (!namespaceURI || namespaceURI === NamespaceURI.html) {
            return name.toLowerCase();
        }
        return name;
    }
    /**
     * Returns item key.
     *
     * @param item Item.
     * @returns Key.
     */
    [PropertySymbol.getNamespaceItemKey](item) {
        if (!item[PropertySymbol.namespaceURI] ||
            item[PropertySymbol.namespaceURI] === NamespaceURI.html) {
            return item[PropertySymbol.name].toLowerCase();
        }
        return `${item[PropertySymbol.namespaceURI] || ''}:${item[PropertySymbol.name]}`;
    }
}
//# sourceMappingURL=NamedNodeMap.js.map