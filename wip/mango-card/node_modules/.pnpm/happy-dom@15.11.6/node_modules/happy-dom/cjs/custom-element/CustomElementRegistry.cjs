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
const NamespaceURI_js_1 = __importDefault(require("../config/NamespaceURI.cjs"));
/**
 * Custom elements registry.
 */
class CustomElementRegistry {
    [PropertySymbol.registry] = {};
    [PropertySymbol.classRegistry] = new Map();
    [PropertySymbol.callbacks] = new Map();
    [PropertySymbol.destroyed] = false;
    #window;
    /**
     * Constructor.
     *
     * @param window Window.
     */
    constructor(window) {
        if (!window) {
            throw new TypeError('Illegal constructor');
        }
        this.#window = window;
    }
    /**
     * Defines a custom element class.
     *
     * @param name Tag name of element.
     * @param elementClass Element class.
     * @param [options] Options.
     * @param [options.extends] Extends tag name.
     */
    define(name, elementClass, options) {
        if (this[PropertySymbol.destroyed]) {
            return;
        }
        if (!this.#isValidCustomElementName(name)) {
            throw new this.#window.DOMException(`Failed to execute 'define' on 'CustomElementRegistry': "${name}" is not a valid custom element name`);
        }
        if (this[PropertySymbol.registry][name]) {
            throw new this.#window.DOMException(`Failed to execute 'define' on 'CustomElementRegistry': the name "${name}" has already been used with this registry`);
        }
        if (this[PropertySymbol.classRegistry].has(elementClass)) {
            throw new this.#window.DOMException("Failed to execute 'define' on 'CustomElementRegistry': this constructor has already been used with this registry");
        }
        const tagName = name.toUpperCase();
        elementClass.prototype[PropertySymbol.window] = this.#window;
        elementClass.prototype[PropertySymbol.ownerDocument] = this.#window.document;
        elementClass.prototype[PropertySymbol.tagName] = tagName;
        elementClass.prototype[PropertySymbol.localName] = name;
        elementClass.prototype[PropertySymbol.namespaceURI] = NamespaceURI_js_1.default.html;
        this[PropertySymbol.registry][name] = {
            elementClass,
            extends: options && options.extends ? options.extends.toLowerCase() : null
        };
        this[PropertySymbol.classRegistry].set(elementClass, name);
        // ObservedAttributes should only be called once by CustomElementRegistry (see #117)
        elementClass[PropertySymbol.observedAttributes] = (elementClass.observedAttributes || []).map((name) => String(name).toLowerCase());
        const callbacks = this[PropertySymbol.callbacks].get(name);
        if (callbacks) {
            this[PropertySymbol.callbacks].delete(name);
            for (const callback of callbacks) {
                callback();
            }
        }
    }
    /**
     * Returns a defined element class.
     *
     * @param name Tag name of element.
     * @returns HTMLElement Class defined or undefined.
     */
    get(name) {
        return this[PropertySymbol.registry][name]?.elementClass;
    }
    /**
     * Upgrades a custom element directly, even before it is connected to its shadow root.
     *
     * Not implemented yet.
     *
     * @param _root Root node.
     */
    upgrade(_root) {
        // Do nothing
    }
    /**
     * When defined.
     *
     * @param name Tag name of element.
     */
    whenDefined(name) {
        if (this[PropertySymbol.destroyed]) {
            return Promise.reject(new this.#window.DOMException(`Failed to execute 'whenDefined' on 'CustomElementRegistry': The custom element registry has been destroyed.`));
        }
        if (!this.#isValidCustomElementName(name)) {
            return Promise.reject(new this.#window.DOMException(`Failed to execute 'whenDefined' on 'CustomElementRegistry': Invalid custom element name: "${name}"`));
        }
        if (this.get(name)) {
            return Promise.resolve();
        }
        return new Promise((resolve) => {
            const callbacks = this[PropertySymbol.callbacks].get(name);
            if (callbacks) {
                callbacks.push(resolve);
            }
            else {
                this[PropertySymbol.callbacks].set(name, [resolve]);
            }
        });
    }
    /**
     * Reverse lookup searching for name by given element class.
     *
     * @param elementClass Class constructor.
     * @returns Found tag name or `null`.
     */
    getName(elementClass) {
        return this[PropertySymbol.classRegistry].get(elementClass) || null;
    }
    /**
     * Destroys the registry.
     */
    [PropertySymbol.destroy]() {
        this[PropertySymbol.destroyed] = true;
        for (const entity of Object.values(this[PropertySymbol.registry])) {
            entity.elementClass.prototype[PropertySymbol.window] = null;
            entity.elementClass.prototype[PropertySymbol.ownerDocument] = null;
            entity.elementClass.prototype[PropertySymbol.tagName] = null;
            entity.elementClass.prototype[PropertySymbol.localName] = null;
            entity.elementClass.prototype[PropertySymbol.namespaceURI] = null;
        }
        this[PropertySymbol.registry] = {};
        this[PropertySymbol.classRegistry] = new Map();
        this[PropertySymbol.callbacks] = new Map();
    }
    /**
     * Validates the correctness of custom element tag names.
     *
     * @param name Custom element tag name.
     * @returns True, if tag name is standard compliant.
     */
    #isValidCustomElementName(name) {
        // Validation criteria based on:
        // https://html.spec.whatwg.org/multipage/custom-elements.html#valid-custom-element-name
        const PCENChar = '[-_.]|[0-9]|[a-z]|\u{B7}|[\u{C0}-\u{D6}]|[\u{D8}-\u{F6}]' +
            '|[\u{F8}-\u{37D}]|[\u{37F}-\u{1FFF}]' +
            '|[\u{200C}-\u{200D}]|[\u{203F}-\u{2040}]|[\u{2070}-\u{218F}]' +
            '|[\u{2C00}-\u{2FEF}]|[\u{3001}-\u{D7FF}]' +
            '|[\u{F900}-\u{FDCF}]|[\u{FDF0}-\u{FFFD}]|[\u{10000}-\u{EFFFF}]';
        const PCEN = new RegExp(`^[a-z](${PCENChar})*-(${PCENChar})*$`, 'u');
        const reservedNames = [
            'annotation-xml',
            'color-profile',
            'font-face',
            'font-face-src',
            'font-face-uri',
            'font-face-format',
            'font-face-name',
            'missing-glyph'
        ];
        return PCEN.test(name) && !reservedNames.includes(name);
    }
}
exports.default = CustomElementRegistry;
//# sourceMappingURL=CustomElementRegistry.cjs.map