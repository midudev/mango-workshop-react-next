"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const PropertySymbol = __importStar(require("../../PropertySymbol.cjs"));
const DOMException_js_1 = __importDefault(require("../../exception/DOMException.cjs"));
const DOMExceptionNameEnum_js_1 = __importDefault(require("../../exception/DOMExceptionNameEnum.cjs"));
const NamespaceURI_js_1 = __importDefault(require("../../config/NamespaceURI.cjs"));
/**
 * Named Node Map.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/NamedNodeMap
 */
class NamedNodeMap {
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
            throw new DOMException_js_1.default(`Failed to execute 'removeNamedItem' on 'NamedNodeMap': No item with name '${name}' was found.`, DOMExceptionNameEnum_js_1.default.notFoundError);
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
            throw new DOMException_js_1.default(`Failed to execute 'removeNamedItemNS' on 'NamedNodeMap': No item with name '${localName}' in namespace '${namespace}' was found.`, DOMExceptionNameEnum_js_1.default.notFoundError);
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
                replacedNamedItem[PropertySymbol.namespaceURI] !== NamespaceURI_js_1.default.html) ||
            !item[PropertySymbol.namespaceURI] ||
            item[PropertySymbol.namespaceURI] === NamespaceURI_js_1.default.html) &&
            // Only lower case names should be stored in the namedItems map
            (this[PropertySymbol.ownerElement][PropertySymbol.namespaceURI] !== NamespaceURI_js_1.default.html ||
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
        if (!namespaceURI || namespaceURI === NamespaceURI_js_1.default.html) {
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
            item[PropertySymbol.namespaceURI] === NamespaceURI_js_1.default.html) {
            return item[PropertySymbol.name].toLowerCase();
        }
        return `${item[PropertySymbol.namespaceURI] || ''}:${item[PropertySymbol.name]}`;
    }
}
exports.default = NamedNodeMap;
//# sourceMappingURL=NamedNodeMap.cjs.map