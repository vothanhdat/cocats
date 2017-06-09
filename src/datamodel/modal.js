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
     * @typedef Root$Properties
     * @type {Object}
     * @property {number} [playerid] Root playerid.
     * @property {Object.<string,GameObjectBase$Properties>} [listObject] Root listObject.
     * @property {Array.<EffectBase$Properties>} [effectQueue] Root effectQueue.
     */

    /**
     * Constructs a new Root.
     * @exports Root
     * @constructor
     * @param {Root$Properties=} [properties] Properties to set
     */
    function Root(properties) {
        this.listObject = {};
        this.effectQueue = [];
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * Root playerid.
     * @type {number}
     */
    Root.prototype.playerid = 0;

    /**
     * Root listObject.
     * @type {Object.<string,GameObjectBase$Properties>}
     */
    Root.prototype.listObject = $util.emptyObject;

    /**
     * Root effectQueue.
     * @type {Array.<EffectBase$Properties>}
     */
    Root.prototype.effectQueue = $util.emptyArray;

    /**
     * Creates a new Root instance using the specified properties.
     * @param {Root$Properties=} [properties] Properties to set
     * @returns {Root} Root instance
     */
    Root.create = function create(properties) {
        return new Root(properties);
    };

    /**
     * Encodes the specified Root message. Does not implicitly {@link Root.verify|verify} messages.
     * @param {Root$Properties} message Root message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Root.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.playerid != null && message.hasOwnProperty("playerid"))
            writer.uint32(/* id 1, wireType 5 =*/13).float(message.playerid);
        if (message.listObject != null && message.hasOwnProperty("listObject"))
            for (var keys = Object.keys(message.listObject), i = 0; i < keys.length; ++i) {
                writer.uint32(/* id 2, wireType 2 =*/18).fork().uint32(/* id 1, wireType 0 =*/8).uint32(keys[i]);
                $root.GameObjectBase.encode(message.listObject[keys[i]], writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim().ldelim();
            }
        if (message.effectQueue != null && message.effectQueue.length)
            for (var i = 0; i < message.effectQueue.length; ++i)
                $root.EffectBase.encode(message.effectQueue[i], writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
        return writer;
    };

    /**
     * Encodes the specified Root message, length delimited. Does not implicitly {@link Root.verify|verify} messages.
     * @param {Root$Properties} message Root message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Root.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a Root message from the specified reader or buffer.
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
                message.playerid = reader.float();
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
                if (!(message.effectQueue && message.effectQueue.length))
                    message.effectQueue = [];
                message.effectQueue.push($root.EffectBase.decode(reader, reader.uint32()));
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
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {Root} Root
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Root.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a Root message.
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {?string} `null` if valid, otherwise the reason why it is not
     */
    Root.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.playerid != null && message.hasOwnProperty("playerid"))
            if (typeof message.playerid !== "number")
                return "playerid: number expected";
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
        if (message.effectQueue != null && message.hasOwnProperty("effectQueue")) {
            if (!Array.isArray(message.effectQueue))
                return "effectQueue: array expected";
            for (var i = 0; i < message.effectQueue.length; ++i) {
                var error = $root.EffectBase.verify(message.effectQueue[i]);
                if (error)
                    return "effectQueue." + error;
            }
        }
        return null;
    };

    /**
     * Creates a Root message from a plain object. Also converts values to their respective internal types.
     * @param {Object.<string,*>} object Plain object
     * @returns {Root} Root
     */
    Root.fromObject = function fromObject(object) {
        if (object instanceof $root.Root)
            return object;
        var message = new $root.Root();
        if (object.playerid != null)
            message.playerid = Number(object.playerid);
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
        if (object.effectQueue) {
            if (!Array.isArray(object.effectQueue))
                throw TypeError(".Root.effectQueue: array expected");
            message.effectQueue = [];
            for (var i = 0; i < object.effectQueue.length; ++i) {
                if (typeof object.effectQueue[i] !== "object")
                    throw TypeError(".Root.effectQueue: object expected");
                message.effectQueue[i] = $root.EffectBase.fromObject(object.effectQueue[i]);
            }
        }
        return message;
    };

    /**
     * Creates a Root message from a plain object. Also converts values to their respective internal types.
     * This is an alias of {@link Root.fromObject}.
     * @function
     * @param {Object.<string,*>} object Plain object
     * @returns {Root} Root
     */
    Root.from = Root.fromObject;

    /**
     * Creates a plain object from a Root message. Also converts values to other types if specified.
     * @param {Root} message Root
     * @param {$protobuf.ConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    Root.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.arrays || options.defaults)
            object.effectQueue = [];
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
        if (message.effectQueue && message.effectQueue.length) {
            object.effectQueue = [];
            for (var j = 0; j < message.effectQueue.length; ++j)
                object.effectQueue[j] = $root.EffectBase.toObject(message.effectQueue[j], options);
        }
        return object;
    };

    /**
     * Creates a plain object from this Root message. Also converts values to other types if specified.
     * @param {$protobuf.ConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    Root.prototype.toObject = function toObject(options) {
        return this.constructor.toObject(this, options);
    };

    /**
     * Converts this Root to JSON.
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
     * @typedef GameObjectBase$Properties
     * @type {Object}
     * @property {string} [type] GameObjectBase type.
     * @property {number} [id] GameObjectBase id.
     * @property {number} [x] GameObjectBase x.
     * @property {number} [y] GameObjectBase y.
     * @property {number} [speed] GameObjectBase speed.
     */

    /**
     * Constructs a new GameObjectBase.
     * @exports GameObjectBase
     * @constructor
     * @param {GameObjectBase$Properties=} [properties] Properties to set
     */
    function GameObjectBase(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * GameObjectBase type.
     * @type {string}
     */
    GameObjectBase.prototype.type = "";

    /**
     * GameObjectBase id.
     * @type {number}
     */
    GameObjectBase.prototype.id = 0;

    /**
     * GameObjectBase x.
     * @type {number}
     */
    GameObjectBase.prototype.x = 0;

    /**
     * GameObjectBase y.
     * @type {number}
     */
    GameObjectBase.prototype.y = 0;

    /**
     * GameObjectBase speed.
     * @type {number}
     */
    GameObjectBase.prototype.speed = 0;

    /**
     * Creates a new GameObjectBase instance using the specified properties.
     * @param {GameObjectBase$Properties=} [properties] Properties to set
     * @returns {GameObjectBase} GameObjectBase instance
     */
    GameObjectBase.create = function create(properties) {
        return new GameObjectBase(properties);
    };

    /**
     * Encodes the specified GameObjectBase message. Does not implicitly {@link GameObjectBase.verify|verify} messages.
     * @param {GameObjectBase$Properties} message GameObjectBase message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    GameObjectBase.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.type != null && message.hasOwnProperty("type"))
            writer.uint32(/* id 1, wireType 2 =*/10).string(message.type);
        if (message.id != null && message.hasOwnProperty("id"))
            writer.uint32(/* id 2, wireType 5 =*/21).float(message.id);
        if (message.x != null && message.hasOwnProperty("x"))
            writer.uint32(/* id 3, wireType 5 =*/29).float(message.x);
        if (message.y != null && message.hasOwnProperty("y"))
            writer.uint32(/* id 4, wireType 5 =*/37).float(message.y);
        if (message.speed != null && message.hasOwnProperty("speed"))
            writer.uint32(/* id 5, wireType 5 =*/45).float(message.speed);
        return writer;
    };

    /**
     * Encodes the specified GameObjectBase message, length delimited. Does not implicitly {@link GameObjectBase.verify|verify} messages.
     * @param {GameObjectBase$Properties} message GameObjectBase message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    GameObjectBase.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a GameObjectBase message from the specified reader or buffer.
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
                message.type = reader.string();
                break;
            case 2:
                message.id = reader.float();
                break;
            case 3:
                message.x = reader.float();
                break;
            case 4:
                message.y = reader.float();
                break;
            case 5:
                message.speed = reader.float();
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
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {GameObjectBase} GameObjectBase
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    GameObjectBase.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a GameObjectBase message.
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {?string} `null` if valid, otherwise the reason why it is not
     */
    GameObjectBase.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.type != null && message.hasOwnProperty("type"))
            if (!$util.isString(message.type))
                return "type: string expected";
        if (message.id != null && message.hasOwnProperty("id"))
            if (typeof message.id !== "number")
                return "id: number expected";
        if (message.x != null && message.hasOwnProperty("x"))
            if (typeof message.x !== "number")
                return "x: number expected";
        if (message.y != null && message.hasOwnProperty("y"))
            if (typeof message.y !== "number")
                return "y: number expected";
        if (message.speed != null && message.hasOwnProperty("speed"))
            if (typeof message.speed !== "number")
                return "speed: number expected";
        return null;
    };

    /**
     * Creates a GameObjectBase message from a plain object. Also converts values to their respective internal types.
     * @param {Object.<string,*>} object Plain object
     * @returns {GameObjectBase} GameObjectBase
     */
    GameObjectBase.fromObject = function fromObject(object) {
        if (object instanceof $root.GameObjectBase)
            return object;
        var message = new $root.GameObjectBase();
        if (object.type != null)
            message.type = String(object.type);
        if (object.id != null)
            message.id = Number(object.id);
        if (object.x != null)
            message.x = Number(object.x);
        if (object.y != null)
            message.y = Number(object.y);
        if (object.speed != null)
            message.speed = Number(object.speed);
        return message;
    };

    /**
     * Creates a GameObjectBase message from a plain object. Also converts values to their respective internal types.
     * This is an alias of {@link GameObjectBase.fromObject}.
     * @function
     * @param {Object.<string,*>} object Plain object
     * @returns {GameObjectBase} GameObjectBase
     */
    GameObjectBase.from = GameObjectBase.fromObject;

    /**
     * Creates a plain object from a GameObjectBase message. Also converts values to other types if specified.
     * @param {GameObjectBase} message GameObjectBase
     * @param {$protobuf.ConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    GameObjectBase.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults) {
            object.type = "";
            object.id = 0;
            object.x = 0;
            object.y = 0;
            object.speed = 0;
        }
        if (message.type != null && message.hasOwnProperty("type"))
            object.type = message.type;
        if (message.id != null && message.hasOwnProperty("id"))
            object.id = message.id;
        if (message.x != null && message.hasOwnProperty("x"))
            object.x = message.x;
        if (message.y != null && message.hasOwnProperty("y"))
            object.y = message.y;
        if (message.speed != null && message.hasOwnProperty("speed"))
            object.speed = message.speed;
        return object;
    };

    /**
     * Creates a plain object from this GameObjectBase message. Also converts values to other types if specified.
     * @param {$protobuf.ConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    GameObjectBase.prototype.toObject = function toObject(options) {
        return this.constructor.toObject(this, options);
    };

    /**
     * Converts this GameObjectBase to JSON.
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
     * @typedef EffectBase$Properties
     * @type {Object}
     * @property {string} [type] EffectBase type.
     * @property {number} [x] EffectBase x.
     * @property {number} [y] EffectBase y.
     */

    /**
     * Constructs a new EffectBase.
     * @exports EffectBase
     * @constructor
     * @param {EffectBase$Properties=} [properties] Properties to set
     */
    function EffectBase(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * EffectBase type.
     * @type {string}
     */
    EffectBase.prototype.type = "";

    /**
     * EffectBase x.
     * @type {number}
     */
    EffectBase.prototype.x = 0;

    /**
     * EffectBase y.
     * @type {number}
     */
    EffectBase.prototype.y = 0;

    /**
     * Creates a new EffectBase instance using the specified properties.
     * @param {EffectBase$Properties=} [properties] Properties to set
     * @returns {EffectBase} EffectBase instance
     */
    EffectBase.create = function create(properties) {
        return new EffectBase(properties);
    };

    /**
     * Encodes the specified EffectBase message. Does not implicitly {@link EffectBase.verify|verify} messages.
     * @param {EffectBase$Properties} message EffectBase message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    EffectBase.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.type != null && message.hasOwnProperty("type"))
            writer.uint32(/* id 1, wireType 2 =*/10).string(message.type);
        if (message.x != null && message.hasOwnProperty("x"))
            writer.uint32(/* id 2, wireType 5 =*/21).float(message.x);
        if (message.y != null && message.hasOwnProperty("y"))
            writer.uint32(/* id 3, wireType 5 =*/29).float(message.y);
        return writer;
    };

    /**
     * Encodes the specified EffectBase message, length delimited. Does not implicitly {@link EffectBase.verify|verify} messages.
     * @param {EffectBase$Properties} message EffectBase message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    EffectBase.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes an EffectBase message from the specified reader or buffer.
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
                message.type = reader.string();
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
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {EffectBase} EffectBase
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    EffectBase.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies an EffectBase message.
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {?string} `null` if valid, otherwise the reason why it is not
     */
    EffectBase.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.type != null && message.hasOwnProperty("type"))
            if (!$util.isString(message.type))
                return "type: string expected";
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
     * @param {Object.<string,*>} object Plain object
     * @returns {EffectBase} EffectBase
     */
    EffectBase.fromObject = function fromObject(object) {
        if (object instanceof $root.EffectBase)
            return object;
        var message = new $root.EffectBase();
        if (object.type != null)
            message.type = String(object.type);
        if (object.x != null)
            message.x = Number(object.x);
        if (object.y != null)
            message.y = Number(object.y);
        return message;
    };

    /**
     * Creates an EffectBase message from a plain object. Also converts values to their respective internal types.
     * This is an alias of {@link EffectBase.fromObject}.
     * @function
     * @param {Object.<string,*>} object Plain object
     * @returns {EffectBase} EffectBase
     */
    EffectBase.from = EffectBase.fromObject;

    /**
     * Creates a plain object from an EffectBase message. Also converts values to other types if specified.
     * @param {EffectBase} message EffectBase
     * @param {$protobuf.ConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    EffectBase.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults) {
            object.type = "";
            object.x = 0;
            object.y = 0;
        }
        if (message.type != null && message.hasOwnProperty("type"))
            object.type = message.type;
        if (message.x != null && message.hasOwnProperty("x"))
            object.x = message.x;
        if (message.y != null && message.hasOwnProperty("y"))
            object.y = message.y;
        return object;
    };

    /**
     * Creates a plain object from this EffectBase message. Also converts values to other types if specified.
     * @param {$protobuf.ConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    EffectBase.prototype.toObject = function toObject(options) {
        return this.constructor.toObject(this, options);
    };

    /**
     * Converts this EffectBase to JSON.
     * @returns {Object.<string,*>} JSON object
     */
    EffectBase.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return EffectBase;
})();

module.exports = $root;
