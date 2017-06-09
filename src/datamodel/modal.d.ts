import * as $protobuf from "protobufjs";

type Root$Properties = {
    playerid?: number;
    listObject?: { [k: string]: GameObjectBase$Properties };
    effectQueue?: EffectBase$Properties[];
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
     * Root listObject.
     * @type {Object.<string,GameObjectBase$Properties>}
     */
    public listObject: { [k: string]: GameObjectBase$Properties };

    /**
     * Root effectQueue.
     * @type {Array.<EffectBase$Properties>}
     */
    public effectQueue: EffectBase$Properties[];

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

type GameObjectBase$Properties = {
    type?: string;
    id?: number;
    x?: number;
    y?: number;
    speed?: number;
};

/**
 * Constructs a new GameObjectBase.
 * @exports GameObjectBase
 * @constructor
 * @param {GameObjectBase$Properties=} [properties] Properties to set
 */
export class GameObjectBase {

    /**
     * Constructs a new GameObjectBase.
     * @exports GameObjectBase
     * @constructor
     * @param {GameObjectBase$Properties=} [properties] Properties to set
     */
    constructor(properties?: GameObjectBase$Properties);

    /**
     * GameObjectBase type.
     * @type {string}
     */
    public type: string;

    /**
     * GameObjectBase id.
     * @type {number}
     */
    public id: number;

    /**
     * GameObjectBase x.
     * @type {number}
     */
    public x: number;

    /**
     * GameObjectBase y.
     * @type {number}
     */
    public y: number;

    /**
     * GameObjectBase speed.
     * @type {number}
     */
    public speed: number;

    /**
     * Creates a new GameObjectBase instance using the specified properties.
     * @param {GameObjectBase$Properties=} [properties] Properties to set
     * @returns {GameObjectBase} GameObjectBase instance
     */
    public static create(properties?: GameObjectBase$Properties): GameObjectBase;

    /**
     * Encodes the specified GameObjectBase message. Does not implicitly {@link GameObjectBase.verify|verify} messages.
     * @param {GameObjectBase$Properties} message GameObjectBase message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    public static encode(message: GameObjectBase$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified GameObjectBase message, length delimited. Does not implicitly {@link GameObjectBase.verify|verify} messages.
     * @param {GameObjectBase$Properties} message GameObjectBase message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    public static encodeDelimited(message: GameObjectBase$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a GameObjectBase message from the specified reader or buffer.
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {GameObjectBase} GameObjectBase
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): GameObjectBase;

    /**
     * Decodes a GameObjectBase message from the specified reader or buffer, length delimited.
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {GameObjectBase} GameObjectBase
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): GameObjectBase;

    /**
     * Verifies a GameObjectBase message.
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {?string} `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): string;

    /**
     * Creates a GameObjectBase message from a plain object. Also converts values to their respective internal types.
     * @param {Object.<string,*>} object Plain object
     * @returns {GameObjectBase} GameObjectBase
     */
    public static fromObject(object: { [k: string]: any }): GameObjectBase;

    /**
     * Creates a GameObjectBase message from a plain object. Also converts values to their respective internal types.
     * This is an alias of {@link GameObjectBase.fromObject}.
     * @function
     * @param {Object.<string,*>} object Plain object
     * @returns {GameObjectBase} GameObjectBase
     */
    public static from(object: { [k: string]: any }): GameObjectBase;

    /**
     * Creates a plain object from a GameObjectBase message. Also converts values to other types if specified.
     * @param {GameObjectBase} message GameObjectBase
     * @param {$protobuf.ConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    public static toObject(message: GameObjectBase, options?: $protobuf.ConversionOptions): { [k: string]: any };

    /**
     * Creates a plain object from this GameObjectBase message. Also converts values to other types if specified.
     * @param {$protobuf.ConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    public toObject(options?: $protobuf.ConversionOptions): { [k: string]: any };

    /**
     * Converts this GameObjectBase to JSON.
     * @returns {Object.<string,*>} JSON object
     */
    public toJSON(): { [k: string]: any };
}

type EffectBase$Properties = {
    type?: string;
    x?: number;
    y?: number;
};

/**
 * Constructs a new EffectBase.
 * @exports EffectBase
 * @constructor
 * @param {EffectBase$Properties=} [properties] Properties to set
 */
export class EffectBase {

    /**
     * Constructs a new EffectBase.
     * @exports EffectBase
     * @constructor
     * @param {EffectBase$Properties=} [properties] Properties to set
     */
    constructor(properties?: EffectBase$Properties);

    /**
     * EffectBase type.
     * @type {string}
     */
    public type: string;

    /**
     * EffectBase x.
     * @type {number}
     */
    public x: number;

    /**
     * EffectBase y.
     * @type {number}
     */
    public y: number;

    /**
     * Creates a new EffectBase instance using the specified properties.
     * @param {EffectBase$Properties=} [properties] Properties to set
     * @returns {EffectBase} EffectBase instance
     */
    public static create(properties?: EffectBase$Properties): EffectBase;

    /**
     * Encodes the specified EffectBase message. Does not implicitly {@link EffectBase.verify|verify} messages.
     * @param {EffectBase$Properties} message EffectBase message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    public static encode(message: EffectBase$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified EffectBase message, length delimited. Does not implicitly {@link EffectBase.verify|verify} messages.
     * @param {EffectBase$Properties} message EffectBase message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    public static encodeDelimited(message: EffectBase$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes an EffectBase message from the specified reader or buffer.
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {EffectBase} EffectBase
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): EffectBase;

    /**
     * Decodes an EffectBase message from the specified reader or buffer, length delimited.
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {EffectBase} EffectBase
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): EffectBase;

    /**
     * Verifies an EffectBase message.
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {?string} `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): string;

    /**
     * Creates an EffectBase message from a plain object. Also converts values to their respective internal types.
     * @param {Object.<string,*>} object Plain object
     * @returns {EffectBase} EffectBase
     */
    public static fromObject(object: { [k: string]: any }): EffectBase;

    /**
     * Creates an EffectBase message from a plain object. Also converts values to their respective internal types.
     * This is an alias of {@link EffectBase.fromObject}.
     * @function
     * @param {Object.<string,*>} object Plain object
     * @returns {EffectBase} EffectBase
     */
    public static from(object: { [k: string]: any }): EffectBase;

    /**
     * Creates a plain object from an EffectBase message. Also converts values to other types if specified.
     * @param {EffectBase} message EffectBase
     * @param {$protobuf.ConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    public static toObject(message: EffectBase, options?: $protobuf.ConversionOptions): { [k: string]: any };

    /**
     * Creates a plain object from this EffectBase message. Also converts values to other types if specified.
     * @param {$protobuf.ConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    public toObject(options?: $protobuf.ConversionOptions): { [k: string]: any };

    /**
     * Converts this EffectBase to JSON.
     * @returns {Object.<string,*>} JSON object
     */
    public toJSON(): { [k: string]: any };
}
