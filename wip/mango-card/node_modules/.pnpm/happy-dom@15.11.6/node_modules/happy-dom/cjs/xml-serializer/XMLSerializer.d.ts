import * as PropertySymbol from '../PropertySymbol.cjs';
import Node from '../nodes/node/Node.cjs';
import ShadowRoot from '../nodes/shadow-root/ShadowRoot.cjs';
/**
 * Utility for converting an element to string.
 */
export default class XMLSerializer {
    [PropertySymbol.options]: {
        serializableShadowRoots: boolean;
        shadowRoots: ShadowRoot[] | null;
        allShadowRoots: boolean;
    };
    /**
     * Renders an element as HTML.
     *
     * @param root Root element.
     * @returns Result.
     */
    serializeToString(root: Node): string;
    /**
     * Returns attributes as a string.
     *
     * @param element Element.
     * @returns Attributes.
     */
    private getAttributes;
}
//# sourceMappingURL=XMLSerializer.d.ts.map