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
const PropertySymbol = __importStar(require("../PropertySymbol.cjs"));
const Node_js_1 = __importDefault(require("../nodes/node/Node.cjs"));
const NodeTypeEnum_js_1 = __importDefault(require("../nodes/node/NodeTypeEnum.cjs"));
const Entities = __importStar(require("entities"));
const HTMLElementConfig_js_1 = __importDefault(require("../config/HTMLElementConfig.cjs"));
const HTMLElementConfigContentModelEnum_js_1 = __importDefault(require("../config/HTMLElementConfigContentModelEnum.cjs"));
/**
 * Utility for converting an element to string.
 */
class XMLSerializer {
    [PropertySymbol.options] = {
        serializableShadowRoots: false,
        shadowRoots: null,
        allShadowRoots: false
    };
    /**
     * Renders an element as HTML.
     *
     * @param root Root element.
     * @returns Result.
     */
    serializeToString(root) {
        const options = this[PropertySymbol.options];
        switch (root[PropertySymbol.nodeType]) {
            case NodeTypeEnum_js_1.default.elementNode:
                const element = root;
                const localName = element[PropertySymbol.localName];
                const config = HTMLElementConfig_js_1.default[element[PropertySymbol.localName]];
                if (config?.contentModel === HTMLElementConfigContentModelEnum_js_1.default.noDescendants) {
                    return `<${localName}${this.getAttributes(element)}>`;
                }
                let innerHTML = '';
                // TODO: Should we include closed shadow roots? We are currently only including open shadow roots.
                if (element.shadowRoot &&
                    (options.allShadowRoots ||
                        (options.serializableShadowRoots && element.shadowRoot[PropertySymbol.serializable]) ||
                        options.shadowRoots?.includes(element.shadowRoot))) {
                    innerHTML += `<template shadowrootmode="${element.shadowRoot[PropertySymbol.mode]}"${element.shadowRoot[PropertySymbol.serializable] ? ' shadowrootserializable=""' : ''}>`;
                    for (const node of element.shadowRoot[PropertySymbol.nodeArray]) {
                        innerHTML += this.serializeToString(node);
                    }
                    innerHTML += '</template>';
                }
                const childNodes = localName === 'template'
                    ? root.content[PropertySymbol.nodeArray]
                    : root[PropertySymbol.nodeArray];
                for (const node of childNodes) {
                    innerHTML += this.serializeToString(node);
                }
                return `<${localName}${this.getAttributes(element)}>${innerHTML}</${localName}>`;
            case Node_js_1.default.DOCUMENT_FRAGMENT_NODE:
            case Node_js_1.default.DOCUMENT_NODE:
                let html = '';
                for (const node of root[PropertySymbol.nodeArray]) {
                    html += this.serializeToString(node);
                }
                return html;
            case NodeTypeEnum_js_1.default.commentNode:
                return `<!--${root.textContent}-->`;
            case NodeTypeEnum_js_1.default.processingInstructionNode:
                // TODO: Add support for processing instructions.
                return `<!--?${root.target} ${root.textContent}?-->`;
            case NodeTypeEnum_js_1.default.textNode:
                const parentElement = root.parentElement;
                if (parentElement) {
                    const parentConfig = HTMLElementConfig_js_1.default[parentElement[PropertySymbol.localName]];
                    if (parentConfig?.contentModel === HTMLElementConfigContentModelEnum_js_1.default.rawText) {
                        return root.textContent;
                    }
                }
                return Entities.escapeText(root.textContent);
            case NodeTypeEnum_js_1.default.documentTypeNode:
                const doctype = root;
                const identifier = doctype.publicId ? ' PUBLIC' : doctype.systemId ? ' SYSTEM' : '';
                const publicId = doctype.publicId ? ` "${doctype.publicId}"` : '';
                const systemId = doctype.systemId ? ` "${doctype.systemId}"` : '';
                return `<!DOCTYPE ${doctype.name}${identifier}${publicId}${systemId}>`;
        }
        return '';
    }
    /**
     * Returns attributes as a string.
     *
     * @param element Element.
     * @returns Attributes.
     */
    getAttributes(element) {
        let attributeString = '';
        if (!element[PropertySymbol.attributes].getNamedItem('is') &&
            element[PropertySymbol.isValue]) {
            attributeString += ' is="' + element[PropertySymbol.isValue] + '"';
        }
        for (const attribute of element[PropertySymbol.attributes][PropertySymbol.namedItems].values()) {
            const escapedValue = Entities.escapeAttribute(attribute[PropertySymbol.value]);
            attributeString += ' ' + attribute[PropertySymbol.name] + '="' + escapedValue + '"';
        }
        return attributeString;
    }
}
exports.default = XMLSerializer;
//# sourceMappingURL=XMLSerializer.cjs.map