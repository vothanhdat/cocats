/*eslint-disable block-scoped-var, no-redeclare, no-control-regex, no-prototype-builtins*/
"use strict";

var $protobuf = require("protobufjs/minimal");

// Common aliases
var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

$root.Root = (function() {

    /**
     * Properties of a Root.
     * @exports IRoot
     * @interface IRoot
     * @property {number} [playerid] Root playerid
     * @property {Object.<string,IGameObjectBase>} [listObject] Root listObject
     * @property {Array.<IEffectBase>} [listEffect] Root listEffect
     */

    /**
     * Constructs a new Root.
     * @exports Root
     * @classdesc Represents a Root.
     * @constructor
     * @param {IRoot=} [properties] Properties to set
     */
    function Root(properties) {
        this.listObject = {};
        this.listEffect = [];
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * Root playerid.
     * @member {number}playerid
     * @memberof Root
     * @instance
     */
    Root.prototype.playerid = 0;

    /**
     * Root listObject.
     * @member {Object.<string,IGameObjectBase>}listObject
     * @memberof Root
     * @instance
     */
    Root.prototype.listObject = $util.emptyObject;

    /**
     * Root listEffect.
     * @member {Array.<IEffectBase>}listEffect
     * @memberof Root
     * @instance
     */
    Root.prototype.listEffect = $util.emptyArray;

    /**
     * Creates a new Root instance using the specified properties.
     * @function create
     * @memberof Root
     * @static
     * @param {IRoot=} [properties] Properties to set
     * @returns {Root} Root instance
     */
    Root.create = function create(properties) {
        return new Root(properties);
    };

    /**
     * Encodes the specified Root message. Does not implicitly {@link Root.verify|verify} messages.
     * @function encode
     * @memberof Root
     * @static
     * @param {IRoot} message Root message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Root.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.playerid != null && message.hasOwnProperty("playerid"))
            writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.playerid);
        if (message.listObject != null && message.hasOwnProperty("listObject"))
            for (var keys = Object.keys(message.listObject), i = 0; i < keys.length; ++i) {
                writer.uint32(/* id 2, wireType 2 =*/18).fork().uint32(/* id 1, wireType 0 =*/8).uint32(keys[i]);
                $root.GameObjectBase.encode(message.listObject[keys[i]], writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim().ldelim();
            }
        if (message.listEffect != null && message.listEffect.length)
            for (var i = 0; i < message.listEffect.length; ++i)
                $root.EffectBase.encode(message.listEffect[i], writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
        return writer;
    };

    /**
     * Encodes the specified Root message, length delimited. Does not implicitly {@link Root.verify|verify} messages.
     * @function encodeDelimited
     * @memberof Root
     * @static
     * @param {IRoot} message Root message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Root.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a Root message from the specified reader or buffer.
     * @function decode
     * @memberof Root
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {Root} Root
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Root.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Root(), key;
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.playerid = reader.uint32();
                break;
            case 2:
                reader.skip().pos++;
                if (message.listObject === $util.emptyObject)
                    message.listObject = {};
                key = reader.uint32();
                reader.pos++;
                message.listObject[key] = $root.GameObjectBase.decode(reader, reader.uint32());
                break;
            case 3:
                if (!(message.listEffect && message.listEffect.length))
                    message.listEffect = [];
                message.listEffect.push($root.EffectBase.decode(reader, reader.uint32()));
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a Root message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof Root
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {Root} Root
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Root.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a Root message.
     * @function verify
     * @memberof Root
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    Root.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.playerid != null && message.hasOwnProperty("playerid"))
            if (!$util.isInteger(message.playerid))
                return "playerid: integer expected";
        if (message.listObject != null && message.hasOwnProperty("listObject")) {
            if (!$util.isObject(message.listObject))
                return "listObject: object expected";
            var key = Object.keys(message.listObject);
            for (var i = 0; i < key.length; ++i) {
                if (!$util.key32Re.test(key[i]))
                    return "listObject: integer key{k:uint32} expected";
                var error = $root.GameObjectBase.verify(message.listObject[key[i]]);
                if (error)
                    return "listObject." + error;
            }
        }
        if (message.listEffect != null && message.hasOwnProperty("listEffect")) {
            if (!Array.isArray(message.listEffect))
                return "listEffect: array expected";
            for (var i = 0; i < message.listEffect.length; ++i) {
                error = $root.EffectBase.verify(message.listEffect[i]);
                if (error)
                    return "listEffect." + error;
            }
        }
        return null;
    };

    /**
     * Creates a Root message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof Root
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {Root} Root
     */
    Root.fromObject = function fromObject(object) {
        if (object instanceof $root.Root)
            return object;
        var message = new $root.Root();
        if (object.playerid != null)
            message.playerid = object.playerid >>> 0;
        if (object.listObject) {
            if (typeof object.listObject !== "object")
                throw TypeError(".Root.listObject: object expected");
            message.listObject = {};
            for (var keys = Object.keys(object.listObject), i = 0; i < keys.length; ++i) {
                if (typeof object.listObject[keys[i]] !== "object")
                    throw TypeError(".Root.listObject: object expected");
                message.listObject[keys[i]] = $root.GameObjectBase.fromObject(object.listObject[keys[i]]);
            }
        }
        if (object.listEffect) {
            if (!Array.isArray(object.listEffect))
                throw TypeError(".Root.listEffect: array expected");
            message.listEffect = [];
            for (var i = 0; i < object.listEffect.length; ++i) {
                if (typeof object.listEffect[i] !== "object")
                    throw TypeError(".Root.listEffect: object expected");
                message.listEffect[i] = $root.EffectBase.fromObject(object.listEffect[i]);
            }
        }
        return message;
    };

    /**
     * Creates a plain object from a Root message. Also converts values to other types if specified.
     * @function toObject
     * @memberof Root
     * @static
     * @param {Root} message Root
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    Root.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.arrays || options.defaults)
            object.listEffect = [];
        if (options.objects || options.defaults)
            object.listObject = {};
        if (options.defaults)
            object.playerid = 0;
        if (message.playerid != null && message.hasOwnProperty("playerid"))
            object.playerid = message.playerid;
        var keys2;
        if (message.listObject && (keys2 = Object.keys(message.listObject)).length) {
            object.listObject = {};
            for (var j = 0; j < keys2.length; ++j)
                object.listObject[keys2[j]] = $root.GameObjectBase.toObject(message.listObject[keys2[j]], options);
        }
        if (message.listEffect && message.listEffect.length) {
            object.listEffect = [];
            for (var j = 0; j < message.listEffect.length; ++j)
                object.listEffect[j] = $root.EffectBase.toObject(message.listEffect[j], options);
        }
        return object;
    };

    /**
     * Converts this Root to JSON.
     * @function toJSON
     * @memberof Root
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    Root.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return Root;
})();

$root.GameObjectBase = (function() {

    /**
     * Properties of a GameObjectBase.
     * @exports IGameObjectBase
     * @interface IGameObjectBase
     * @property {Type} [type] GameObjectBase type
     * @property {number} [id] GameObjectBase id
     * @property {number} [x] GameObjectBase x
     * @property {number} [y] GameObjectBase y
     * @property {number} [vx] GameObjectBase vx
     * @property {number} [vy] GameObjectBase vy
     */

    /**
     * Constructs a new GameObjectBase.
     * @exports GameObjectBase
     * @classdesc Represents a GameObjectBase.
     * @constructor
     * @param {IGameObjectBase=} [properties] Properties to set
     */
    function GameObjectBase(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * GameObjectBase type.
     * @member {Type}type
     * @memberof GameObjectBase
     * @instance
     */
    GameObjectBase.prototype.type = 1;

    /**
     * GameObjectBase id.
     * @member {number}id
     * @memberof GameObjectBase
     * @instance
     */
    GameObjectBase.prototype.id = 0;

    /**
     * GameObjectBase x.
     * @member {number}x
     * @memberof GameObjectBase
     * @instance
     */
    GameObjectBase.prototype.x = 0;

    /**
     * GameObjectBase y.
     * @member {number}y
     * @memberof GameObjectBase
     * @instance
     */
    GameObjectBase.prototype.y = 0;

    /**
     * GameObjectBase vx.
     * @member {number}vx
     * @memberof GameObjectBase
     * @instance
     */
    GameObjectBase.prototype.vx = 0;

    /**
     * GameObjectBase vy.
     * @member {number}vy
     * @memberof GameObjectBase
     * @instance
     */
    GameObjectBase.prototype.vy = 0;

    /**
     * Creates a new GameObjectBase instance using the specified properties.
     * @function create
     * @memberof GameObjectBase
     * @static
     * @param {IGameObjectBase=} [properties] Properties to set
     * @returns {GameObjectBase} GameObjectBase instance
     */
    GameObjectBase.create = function create(properties) {
        return new GameObjectBase(properties);
    };

    /**
     * Encodes the specified GameObjectBase message. Does not implicitly {@link GameObjectBase.verify|verify} messages.
     * @function encode
     * @memberof GameObjectBase
     * @static
     * @param {IGameObjectBase} message GameObjectBase message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    GameObjectBase.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.type != null && message.hasOwnProperty("type"))
            writer.uint32(/* id 1, wireType 0 =*/8).int32(message.type);
        if (message.id != null && message.hasOwnProperty("id"))
            writer.uint32(/* id 2, wireType 0 =*/16).uint32(message.id);
        if (message.x != null && message.hasOwnProperty("x"))
            writer.uint32(/* id 3, wireType 5 =*/29).float(message.x);
        if (message.y != null && message.hasOwnProperty("y"))
            writer.uint32(/* id 4, wireType 5 =*/37).float(message.y);
        if (message.vx != null && message.hasOwnProperty("vx"))
            writer.uint32(/* id 5, wireType 5 =*/45).float(message.vx);
        if (message.vy != null && message.hasOwnProperty("vy"))
            writer.uint32(/* id 6, wireType 5 =*/53).float(message.vy);
        return writer;
    };

    /**
     * Encodes the specified GameObjectBase message, length delimited. Does not implicitly {@link GameObjectBase.verify|verify} messages.
     * @function encodeDelimited
     * @memberof GameObjectBase
     * @static
     * @param {IGameObjectBase} message GameObjectBase message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    GameObjectBase.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a GameObjectBase message from the specified reader or buffer.
     * @function decode
     * @memberof GameObjectBase
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {GameObjectBase} GameObjectBase
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    GameObjectBase.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.GameObjectBase();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.type = reader.int32();
                break;
            case 2:
                message.id = reader.uint32();
                break;
            case 3:
                message.x = reader.float();
                break;
            case 4:
                message.y = reader.float();
                break;
            case 5:
                message.vx = reader.float();
                break;
            case 6:
                message.vy = reader.float();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a GameObjectBase message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof GameObjectBase
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {GameObjectBase} GameObjectBase
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    GameObjectBase.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a GameObjectBase message.
     * @function verify
     * @memberof GameObjectBase
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    GameObjectBase.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.type != null && message.hasOwnProperty("type"))
            switch (message.type) {
            default:
                return "type: enum value expected";
            case 1:
            case 2:
            case 3:
            case 4:
            case 5:
            case 6:
            case 7:
            case 8:
            case 9:
            case 10:
            case 11:
            case 12:
                break;
            }
        if (message.id != null && message.hasOwnProperty("id"))
            if (!$util.isInteger(message.id))
                return "id: integer expected";
        if (message.x != null && message.hasOwnProperty("x"))
            if (typeof message.x !== "number")
                return "x: number expected";
        if (message.y != null && message.hasOwnProperty("y"))
            if (typeof message.y !== "number")
                return "y: number expected";
        if (message.vx != null && message.hasOwnProperty("vx"))
            if (typeof message.vx !== "number")
                return "vx: number expected";
        if (message.vy != null && message.hasOwnProperty("vy"))
            if (typeof message.vy !== "number")
                return "vy: number expected";
        return null;
    };

    /**
     * Creates a GameObjectBase message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof GameObjectBase
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {GameObjectBase} GameObjectBase
     */
    GameObjectBase.fromObject = function fromObject(object) {
        if (object instanceof $root.GameObjectBase)
            return object;
        var message = new $root.GameObjectBase();
        switch (object.type) {
        case "Scene":
        case 1:
            message.type = 1;
            break;
        case "GameObjectBase":
        case 2:
            message.type = 2;
            break;
        case "StaticOb":
        case 3:
            message.type = 3;
            break;
        case "Tree":
        case 4:
            message.type = 4;
            break;
        case "Stone":
        case 5:
            message.type = 5;
            break;
        case "Bomb":
        case 6:
            message.type = 6;
            break;
        case "MoveUnit":
        case 7:
            message.type = 7;
            break;
        case "Player":
        case 8:
            message.type = 8;
            break;
        case "Zombie":
        case 9:
            message.type = 9;
            break;
        case "EffectBase":
        case 10:
            message.type = 10;
            break;
        case "Exploition":
        case 11:
            message.type = 11;
            break;
        case "default":
        case 12:
            message.type = 12;
            break;
        }
        if (object.id != null)
            message.id = object.id >>> 0;
        if (object.x != null)
            message.x = Number(object.x);
        if (object.y != null)
            message.y = Number(object.y);
        if (object.vx != null)
            message.vx = Number(object.vx);
        if (object.vy != null)
            message.vy = Number(object.vy);
        return message;
    };

    /**
     * Creates a plain object from a GameObjectBase message. Also converts values to other types if specified.
     * @function toObject
     * @memberof GameObjectBase
     * @static
     * @param {GameObjectBase} message GameObjectBase
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    GameObjectBase.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults) {
            object.type = options.enums === String ? "Scene" : 1;
            object.id = 0;
            object.x = 0;
            object.y = 0;
            object.vx = 0;
            object.vy = 0;
        }
        if (message.type != null && message.hasOwnProperty("type"))
            object.type = options.enums === String ? $root.Type[message.type] : message.type;
        if (message.id != null && message.hasOwnProperty("id"))
            object.id = message.id;
        if (message.x != null && message.hasOwnProperty("x"))
            object.x = options.json && !isFinite(message.x) ? String(message.x) : message.x;
        if (message.y != null && message.hasOwnProperty("y"))
            object.y = options.json && !isFinite(message.y) ? String(message.y) : message.y;
        if (message.vx != null && message.hasOwnProperty("vx"))
            object.vx = options.json && !isFinite(message.vx) ? String(message.vx) : message.vx;
        if (message.vy != null && message.hasOwnProperty("vy"))
            object.vy = options.json && !isFinite(message.vy) ? String(message.vy) : message.vy;
        return object;
    };

    /**
     * Converts this GameObjectBase to JSON.
     * @function toJSON
     * @memberof GameObjectBase
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    GameObjectBase.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return GameObjectBase;
})();

$root.EffectBase = (function() {

    /**
     * Properties of an EffectBase.
     * @exports IEffectBase
     * @interface IEffectBase
     * @property {Type} [type] EffectBase type
     * @property {number} [x] EffectBase x
     * @property {number} [y] EffectBase y
     */

    /**
     * Constructs a new EffectBase.
     * @exports EffectBase
     * @classdesc Represents an EffectBase.
     * @constructor
     * @param {IEffectBase=} [properties] Properties to set
     */
    function EffectBase(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * EffectBase type.
     * @member {Type}type
     * @memberof EffectBase
     * @instance
     */
    EffectBase.prototype.type = 1;

    /**
     * EffectBase x.
     * @member {number}x
     * @memberof EffectBase
     * @instance
     */
    EffectBase.prototype.x = 0;

    /**
     * EffectBase y.
     * @member {number}y
     * @memberof EffectBase
     * @instance
     */
    EffectBase.prototype.y = 0;

    /**
     * Creates a new EffectBase instance using the specified properties.
     * @function create
     * @memberof EffectBase
     * @static
     * @param {IEffectBase=} [properties] Properties to set
     * @returns {EffectBase} EffectBase instance
     */
    EffectBase.create = function create(properties) {
        return new EffectBase(properties);
    };

    /**
     * Encodes the specified EffectBase message. Does not implicitly {@link EffectBase.verify|verify} messages.
     * @function encode
     * @memberof EffectBase
     * @static
     * @param {IEffectBase} message EffectBase message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    EffectBase.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.type != null && message.hasOwnProperty("type"))
            writer.uint32(/* id 1, wireType 0 =*/8).int32(message.type);
        if (message.x != null && message.hasOwnProperty("x"))
            writer.uint32(/* id 2, wireType 5 =*/21).float(message.x);
        if (message.y != null && message.hasOwnProperty("y"))
            writer.uint32(/* id 3, wireType 5 =*/29).float(message.y);
        return writer;
    };

    /**
     * Encodes the specified EffectBase message, length delimited. Does not implicitly {@link EffectBase.verify|verify} messages.
     * @function encodeDelimited
     * @memberof EffectBase
     * @static
     * @param {IEffectBase} message EffectBase message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    EffectBase.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes an EffectBase message from the specified reader or buffer.
     * @function decode
     * @memberof EffectBase
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {EffectBase} EffectBase
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    EffectBase.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.EffectBase();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.type = reader.int32();
                break;
            case 2:
                message.x = reader.float();
                break;
            case 3:
                message.y = reader.float();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes an EffectBase message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof EffectBase
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {EffectBase} EffectBase
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    EffectBase.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies an EffectBase message.
     * @function verify
     * @memberof EffectBase
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    EffectBase.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.type != null && message.hasOwnProperty("type"))
            switch (message.type) {
            default:
                return "type: enum value expected";
            case 1:
            case 2:
            case 3:
            case 4:
            case 5:
            case 6:
            case 7:
            case 8:
            case 9:
            case 10:
            case 11:
            case 12:
                break;
            }
        if (message.x != null && message.hasOwnProperty("x"))
            if (typeof message.x !== "number")
                return "x: number expected";
        if (message.y != null && message.hasOwnProperty("y"))
            if (typeof message.y !== "number")
                return "y: number expected";
        return null;
    };

    /**
     * Creates an EffectBase message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof EffectBase
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {EffectBase} EffectBase
     */
    EffectBase.fromObject = function fromObject(object) {
        if (object instanceof $root.EffectBase)
            return object;
        var message = new $root.EffectBase();
        switch (object.type) {
        case "Scene":
        case 1:
            message.type = 1;
            break;
        case "GameObjectBase":
        case 2:
            message.type = 2;
            break;
        case "StaticOb":
        case 3:
            message.type = 3;
            break;
        case "Tree":
        case 4:
            message.type = 4;
            break;
        case "Stone":
        case 5:
            message.type = 5;
            break;
        case "Bomb":
        case 6:
            message.type = 6;
            break;
        case "MoveUnit":
        case 7:
            message.type = 7;
            break;
        case "Player":
        case 8:
            message.type = 8;
            break;
        case "Zombie":
        case 9:
            message.type = 9;
            break;
        case "EffectBase":
        case 10:
            message.type = 10;
            break;
        case "Exploition":
        case 11:
            message.type = 11;
            break;
        case "default":
        case 12:
            message.type = 12;
            break;
        }
        if (object.x != null)
            message.x = Number(object.x);
        if (object.y != null)
            message.y = Number(object.y);
        return message;
    };

    /**
     * Creates a plain object from an EffectBase message. Also converts values to other types if specified.
     * @function toObject
     * @memberof EffectBase
     * @static
     * @param {EffectBase} message EffectBase
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    EffectBase.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults) {
            object.type = options.enums === String ? "Scene" : 1;
            object.x = 0;
            object.y = 0;
        }
        if (message.type != null && message.hasOwnProperty("type"))
            object.type = options.enums === String ? $root.Type[message.type] : message.type;
        if (message.x != null && message.hasOwnProperty("x"))
            object.x = options.json && !isFinite(message.x) ? String(message.x) : message.x;
        if (message.y != null && message.hasOwnProperty("y"))
            object.y = options.json && !isFinite(message.y) ? String(message.y) : message.y;
        return object;
    };

    /**
     * Converts this EffectBase to JSON.
     * @function toJSON
     * @memberof EffectBase
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    EffectBase.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return EffectBase;
})();

/**
 * Type enum.
 * @exports Type
 * @enum {string}
 * @property {number} Scene=1 Scene value
 * @property {number} GameObjectBase=2 GameObjectBase value
 * @property {number} StaticOb=3 StaticOb value
 * @property {number} Tree=4 Tree value
 * @property {number} Stone=5 Stone value
 * @property {number} Bomb=6 Bomb value
 * @property {number} MoveUnit=7 MoveUnit value
 * @property {number} Player=8 Player value
 * @property {number} Zombie=9 Zombie value
 * @property {number} EffectBase=10 EffectBase value
 * @property {number} Exploition=11 Exploition value
 * @property {number} default=12 default value
 */
$root.Type = (function() {
    var valuesById = {}, values = Object.create(valuesById);
    values[valuesById[1] = "Scene"] = 1;
    values[valuesById[2] = "GameObjectBase"] = 2;
    values[valuesById[3] = "StaticOb"] = 3;
    values[valuesById[4] = "Tree"] = 4;
    values[valuesById[5] = "Stone"] = 5;
    values[valuesById[6] = "Bomb"] = 6;
    values[valuesById[7] = "MoveUnit"] = 7;
    values[valuesById[8] = "Player"] = 8;
    values[valuesById[9] = "Zombie"] = 9;
    values[valuesById[10] = "EffectBase"] = 10;
    values[valuesById[11] = "Exploition"] = 11;
    values[valuesById[12] = "default"] = 12;
    return values;
})();

module.exports = $root;
