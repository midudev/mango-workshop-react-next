import Document from '../nodes/document/Document.cjs';
import Element from '../nodes/element/Element.cjs';
import DocumentFragment from '../nodes/document-fragment/DocumentFragment.cjs';
/**
 * XML parser.
 *
 * @see https://html.spec.whatwg.org/multipage/indices.html
 */
export default class XMLParser {
    /**
     * Parses XML/HTML and returns a root element.
     *
     * @param document Document.
     * @param xml XML/HTML string.
     * @param [options] Options.
     * @param [options.rootNode] Node to append elements to. Otherwise a new DocumentFragment is created.
     * @param [options.evaluateScripts = false] Set to "true" to enable script execution.
     * @returns Root node.
     */
    static parse(document: Document, xml: string, options?: {
        rootNode?: Element | DocumentFragment | Document;
        evaluateScripts?: boolean;
    }): Element | DocumentFragment | Document;
    /**
     * Returns document type node.
     *
     * @param document Document.
     * @param value Value.
     * @returns Document type node.
     */
    private static getDocumentTypeNode;
}
//# sourceMappingURL=XMLParser.d.ts.map