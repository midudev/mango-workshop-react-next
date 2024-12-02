"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const TreeWalker_js_1 = __importDefault(require("./TreeWalker.cjs"));
/**
 * The NodeIterator object represents the nodes of a document subtree and a position within them.
 *
 * Reference:
 * https://developer.mozilla.org/en-US/docs/Web/API/NodeIterator
 */
class NodeIterator {
    root = null;
    whatToShow = -1;
    filter = null;
    #walker;
    /**
     * Constructor.
     *
     * @param root Root.
     * @param [whatToShow] What to show.
     * @param [filter] Filter.
     */
    constructor(root, whatToShow = -1, filter = null) {
        this.root = root;
        this.whatToShow = whatToShow;
        this.filter = filter;
        this.#walker = new TreeWalker_js_1.default(root, whatToShow, filter);
    }
    /**
     * Moves the current Node to the next visible node in the document order.
     *
     * @returns Current node.
     */
    nextNode() {
        return this.#walker.nextNode();
    }
    /**
     * Moves the current Node to the previous visible node in the document order, and returns the found node. It also moves the current node to this one. If no such node exists, or if it is before that the root node defined at the object construction, returns null and the current node is not changed.
     *
     * @returns Current node.
     */
    previousNode() {
        return this.#walker.previousNode();
    }
}
exports.default = NodeIterator;
//# sourceMappingURL=NodeIterator.cjs.map