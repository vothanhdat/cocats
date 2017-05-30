import * as $protobuf from "protobufjs";

type Any$Properties = {
    typeUrl?: string;
    value?: Uint8Array;
};

/**
 * Constructs a new Any.
 * @exports Any
 * @constructor
 * @param {Any$Properties=} [properties] Properties to set
 */
export class Any {

    /**
     * Constructs a new Any.
     * @exports Any
     * @constructor
     * @param {Any$Properties=} [properties] Properties to set
     */
    constructor(properties?: Any$Properties);

    /**
     * Any typeUrl.
     * @type {string}
     */
    public typeUrl: string;

    /**
     * Any value.
     * @type {Uint8Array}
     */
    public value: Uint8Array;

    /**
     * Creates a new Any instance using the specified properties.
     * @param {Any$Properties=} [properties] Properties to set
     * @returns {Any} Any instance
     */
    public static create(properties?: Any$Properties): Any;

    /**
     * Encodes the specified Any message. Does not implicitly {@link Any.verify|verify} messages.
     * @param {Any$Properties} message Any message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    public static encode(message: Any$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified Any message, length delimited. Does not implicitly {@link Any.verify|verify} messages.
     * @param {Any$Properties} message Any message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    public static encodeDelimited(message: Any$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes an Any message from the specified reader or buffer.
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {Any} Any
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Any;

    /**
     * Decodes an Any message from the specified reader or buffer, length delimited.
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {Any} Any
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Any;

    /**
     * Verifies an Any message.
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {?string} `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): string;

    /**
     * Creates an Any message from a plain object. Also converts values to their respective internal types.
     * @param {Object.<string,*>} object Plain object
     * @returns {Any} Any
     */
    public static fromObject(object: { [k: string]: any }): Any;

    /**
     * Creates an Any message from a plain object. Also converts values to their respective internal types.
     * This is an alias of {@link Any.fromObject}.
     * @function
     * @param {Object.<string,*>} object Plain object
     * @returns {Any} Any
     */
    public static from(object: { [k: string]: any }): Any;

    /**
     * Creates a plain object from an Any message. Also converts values to other types if specified.
     * @param {Any} message Any
     * @param {$protobuf.ConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    public static toObject(message: Any, options?: $protobuf.ConversionOptions): { [k: string]: any };

    /**
     * Creates a plain object from this Any message. Also converts values to other types if specified.
     * @param {$protobuf.ConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    public toObject(options?: $protobuf.ConversionOptions): { [k: string]: any };

    /**
     * Converts this Any to JSON.
     * @returns {Object.<string,*>} JSON object
     */
    public toJSON(): { [k: string]: any };
}

type Root$Properties = {
    playerid?: number;
    type?: string;
    id?: number;
    listObject?: { [k: string]: GameObject$Properties };
};

/**
 * Constructs a new Root.
 * @exports Root
 * @constructor
 * @param {Root$Properties=} [properties] Properties to set
 */
export class Root {

    /**
     * Constructs a new Root.
     * @exports Root
     * @constructor
     * @param {Root$Properties=} [properties] Properties to set
     */
    constructor(properties?: Root$Properties);

    /**
     * Root playerid.
     * @type {number}
     */
    public playerid: number;

    /**
     * Root type.
     * @type {string}
     */
    public type: string;

    /**
     * Root id.
     * @type {number}
     */
    public id: number;

    /**
     * Root listObject.
     * @type {Object.<string,GameObject$Properties>}
     */
    public listObject: { [k: string]: GameObject$Properties };

    /**
     * Creates a new Root instance using the specified properties.
     * @param {Root$Properties=} [properties] Properties to set
     * @returns {Root} Root instance
     */
    public static create(properties?: Root$Properties): Root;

    /**
     * Encodes the specified Root message. Does not implicitly {@link Root.verify|verify} messages.
     * @param {Root$Properties} message Root message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    public static encode(message: Root$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified Root message, length delimited. Does not implicitly {@link Root.verify|verify} messages.
     * @param {Root$Properties} message Root message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    public static encodeDelimited(message: Root$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a Root message from the specified reader or buffer.
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {Root} Root
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Root;

    /**
     * Decodes a Root message from the specified reader or buffer, length delimited.
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {Root} Root
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Root;

    /**
     * Verifies a Root message.
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {?string} `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): string;

    /**
     * Creates a Root message from a plain object. Also converts values to their respective internal types.
     * @param {Object.<string,*>} object Plain object
     * @returns {Root} Root
     */
    public static fromObject(object: { [k: string]: any }): Root;

    /**
     * Creates a Root message from a plain object. Also converts values to their respective internal types.
     * This is an alias of {@link Root.fromObject}.
     * @function
     * @param {Object.<string,*>} object Plain object
     * @returns {Root} Root
     */
    public static from(object: { [k: string]: any }): Root;

    /**
     * Creates a plain object from a Root message. Also converts values to other types if specified.
     * @param {Root} message Root
     * @param {$protobuf.ConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    public static toObject(message: Root, options?: $protobuf.ConversionOptions): { [k: string]: any };

    /**
     * Creates a plain object from this Root message. Also converts values to other types if specified.
     * @param {$protobuf.ConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    public toObject(options?: $protobuf.ConversionOptions): { [k: string]: any };

    /**
     * Converts this Root to JSON.
     * @returns {Object.<string,*>} JSON object
     */
    public toJSON(): { [k: string]: any };
}

type GameObject$Properties = {
    id?: number;
    type?: string;
    x?: number;
    y?: number;
    speed?: number;
};

/**
 * Constructs a new GameObject.
 * @exports GameObject
 * @constructor
 * @param {GameObject$Properties=} [properties] Properties to set
 */
export class GameObject {

    /**
     * Constructs a new GameObject.
     * @exports GameObject
     * @constructor
     * @param {GameObject$Properties=} [properties] Properties to set
     */
    constructor(properties?: GameObject$Properties);

    /**
     * GameObject id.
     * @type {number}
     */
    public id: number;

    /**
     * GameObject type.
     * @type {string}
     */
    public type: string;

    /**
     * GameObject x.
     * @type {number}
     */
    public x: number;

    /**
     * GameObject y.
     * @type {number}
     */
    public y: number;

    /**
     * GameObject speed.
     * @type {number}
     */
    public speed: number;

    /**
     * Creates a new GameObject instance using the specified properties.
     * @param {GameObject$Properties=} [properties] Properties to set
     * @returns {GameObject} GameObject instance
     */
    public static create(properties?: GameObject$Properties): GameObject;

    /**
     * Encodes the specified GameObject message. Does not implicitly {@link GameObject.verify|verify} messages.
     * @param {GameObject$Properties} message GameObject message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    public static encode(message: GameObject$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified GameObject message, length delimited. Does not implicitly {@link GameObject.verify|verify} messages.
     * @param {GameObject$Properties} message GameObject message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    public static encodeDelimited(message: GameObject$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a GameObject message from the specified reader or buffer.
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {GameObject} GameObject
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): GameObject;

    /**
     * Decodes a GameObject message from the specified reader or buffer, length delimited.
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {GameObject} GameObject
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): GameObject;

    /**
     * Verifies a GameObject message.
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {?string} `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): string;

    /**
     * Creates a GameObject message from a plain object. Also converts values to their respective internal types.
     * @param {Object.<string,*>} object Plain object
     * @returns {GameObject} GameObject
     */
    public static fromObject(object: { [k: string]: any }): GameObject;

    /**
     * Creates a GameObject message from a plain object. Also converts values to their respective internal types.
     * This is an alias of {@link GameObject.fromObject}.
     * @function
     * @param {Object.<string,*>} object Plain object
     * @returns {GameObject} GameObject
     */
    public static from(object: { [k: string]: any }): GameObject;

    /**
     * Creates a plain object from a GameObject message. Also converts values to other types if specified.
     * @param {GameObject} message GameObject
     * @param {$protobuf.ConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    public static toObject(message: GameObject, options?: $protobuf.ConversionOptions): { [k: string]: any };

    /**
     * Creates a plain object from this GameObject message. Also converts values to other types if specified.
     * @param {$protobuf.ConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    public toObject(options?: $protobuf.ConversionOptions): { [k: string]: any };

    /**
     * Converts this GameObject to JSON.
     * @returns {Object.<string,*>} JSON object
     */
    public toJSON(): { [k: string]: any };
}
