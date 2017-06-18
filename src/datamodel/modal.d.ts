import * as $protobuf from "protobufjs";

/** Properties of a Root. */
export interface IRoot {

    /** Root playerid */
    playerid?: number;

    /** Root listObject */
    listObject?: { [k: string]: IGameObjectBase };

    /** Root listEffect */
    listEffect?: IEffectBase[];
}

/** Represents a Root. */
export class Root {

    /**
     * Constructs a new Root.
     * @param [properties] Properties to set
     */
    constructor(properties?: IRoot);

    /** Root playerid. */
    public playerid: number;

    /** Root listObject. */
    public listObject: { [k: string]: IGameObjectBase };

    /** Root listEffect. */
    public listEffect: IEffectBase[];

    /**
     * Creates a new Root instance using the specified properties.
     * @param [properties] Properties to set
     * @returns Root instance
     */
    public static create(properties?: IRoot): Root;

    /**
     * Encodes the specified Root message. Does not implicitly {@link Root.verify|verify} messages.
     * @param message Root message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IRoot, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified Root message, length delimited. Does not implicitly {@link Root.verify|verify} messages.
     * @param message Root message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IRoot, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a Root message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns Root
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Root;

    /**
     * Decodes a Root message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns Root
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Root;

    /**
     * Verifies a Root message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a Root message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns Root
     */
    public static fromObject(object: { [k: string]: any }): Root;

    /**
     * Creates a plain object from a Root message. Also converts values to other types if specified.
     * @param message Root
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: Root, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this Root to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Properties of a GameObjectBase. */
export interface IGameObjectBase {

    /** GameObjectBase type */
    type?: Type;

    /** GameObjectBase id */
    id?: number;

    /** GameObjectBase x */
    x?: number;

    /** GameObjectBase y */
    y?: number;

    /** GameObjectBase vx */
    vx?: number;

    /** GameObjectBase vy */
    vy?: number;
}

/** Represents a GameObjectBase. */
export class GameObjectBase {

    /**
     * Constructs a new GameObjectBase.
     * @param [properties] Properties to set
     */
    constructor(properties?: IGameObjectBase);

    /** GameObjectBase type. */
    public type: Type;

    /** GameObjectBase id. */
    public id: number;

    /** GameObjectBase x. */
    public x: number;

    /** GameObjectBase y. */
    public y: number;

    /** GameObjectBase vx. */
    public vx: number;

    /** GameObjectBase vy. */
    public vy: number;

    /**
     * Creates a new GameObjectBase instance using the specified properties.
     * @param [properties] Properties to set
     * @returns GameObjectBase instance
     */
    public static create(properties?: IGameObjectBase): GameObjectBase;

    /**
     * Encodes the specified GameObjectBase message. Does not implicitly {@link GameObjectBase.verify|verify} messages.
     * @param message GameObjectBase message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IGameObjectBase, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified GameObjectBase message, length delimited. Does not implicitly {@link GameObjectBase.verify|verify} messages.
     * @param message GameObjectBase message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IGameObjectBase, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a GameObjectBase message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns GameObjectBase
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): GameObjectBase;

    /**
     * Decodes a GameObjectBase message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns GameObjectBase
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): GameObjectBase;

    /**
     * Verifies a GameObjectBase message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a GameObjectBase message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns GameObjectBase
     */
    public static fromObject(object: { [k: string]: any }): GameObjectBase;

    /**
     * Creates a plain object from a GameObjectBase message. Also converts values to other types if specified.
     * @param message GameObjectBase
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: GameObjectBase, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this GameObjectBase to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Properties of an EffectBase. */
export interface IEffectBase {

    /** EffectBase type */
    type?: Type;

    /** EffectBase x */
    x?: number;

    /** EffectBase y */
    y?: number;
}

/** Represents an EffectBase. */
export class EffectBase {

    /**
     * Constructs a new EffectBase.
     * @param [properties] Properties to set
     */
    constructor(properties?: IEffectBase);

    /** EffectBase type. */
    public type: Type;

    /** EffectBase x. */
    public x: number;

    /** EffectBase y. */
    public y: number;

    /**
     * Creates a new EffectBase instance using the specified properties.
     * @param [properties] Properties to set
     * @returns EffectBase instance
     */
    public static create(properties?: IEffectBase): EffectBase;

    /**
     * Encodes the specified EffectBase message. Does not implicitly {@link EffectBase.verify|verify} messages.
     * @param message EffectBase message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IEffectBase, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified EffectBase message, length delimited. Does not implicitly {@link EffectBase.verify|verify} messages.
     * @param message EffectBase message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IEffectBase, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes an EffectBase message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns EffectBase
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): EffectBase;

    /**
     * Decodes an EffectBase message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns EffectBase
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): EffectBase;

    /**
     * Verifies an EffectBase message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates an EffectBase message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns EffectBase
     */
    public static fromObject(object: { [k: string]: any }): EffectBase;

    /**
     * Creates a plain object from an EffectBase message. Also converts values to other types if specified.
     * @param message EffectBase
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: EffectBase, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this EffectBase to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Type enum. */
export enum Type {
    Scene = 1,
    GameObjectBase = 2,
    StaticOb = 3,
    Tree = 4,
    Stone = 5,
    Bomb = 6,
    MoveUnit = 7,
    Player = 8,
    Zombie = 9,
    EffectBase = 10,
    Exploition = 11,
    default = 12
}
