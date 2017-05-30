/*eslint-disable block-scoped-var, no-redeclare, no-control-regex, no-prototype-builtins*/
"use strict";

var $protobuf = require("protobufjs/minimal");

// Common aliases
var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

$root.Any = (function() {

    /**
     * Properties of an Any.
     * @typedef Any$Properties
     * @type {Object}
     * @property {string} [typeUrl] Any typeUrl.
     * @property {Uint8Array} [value] Any value.
     */

    /**
     * Constructs a new Any.
     * @exports Any
     * @constructor
     * @param {Any$Properties=} [properties] Properties to set
     */
    function Any(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * Any typeUrl.
     * @type {string}
     */
    Any.prototype.typeUrl = "";

    /**
     * Any value.
     * @type {Uint8Array}
     */
    Any.prototype.value = $util.newBuffer([]);

    /**
     * Creates a new Any instance using the specified properties.
     * @param {Any$Properties=} [properties] Properties to set
     * @returns {Any} Any instance
     */
    Any.create = function create(properties) {
        return new Any(properties);
    };

    /**
     * Encodes the specified Any message. Does not implicitly {@link Any.verify|verify} messages.
     * @param {Any$Properties} message Any message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Any.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.typeUrl != null && message.hasOwnProperty("typeUrl"))
            writer.uint32(/* id 1, wireType 2 =*/10).string(message.typeUrl);
        if (message.value != null && message.hasOwnProperty("value"))
            writer.uint32(/* id 2, wireType 2 =*/18).bytes(message.value);
        return writer;
    };

    /**
     * Encodes the specified Any message, length delimited. Does not implicitly {@link Any.verify|verify} messages.
     * @param {Any$Properties} message Any message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Any.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes an Any message from the specified reader or buffer.
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {Any} Any
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Any.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Any();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.typeUrl = reader.string();
                break;
            case 2:
                message.value = reader.bytes();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes an Any message from the specified reader or buffer, length delimited.
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {Any} Any
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Any.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies an Any message.
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {?string} `null` if valid, otherwise the reason why it is not
     */
    Any.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.typeUrl != null && message.hasOwnProperty("typeUrl"))
            if (!$util.isString(message.typeUrl))
                return "typeUrl: string expected";
        if (message.value != null && message.hasOwnProperty("value"))
            if (!(message.value && typeof message.value.length === "number" || $util.isString(message.value)))
                return "value: buffer expected";
        return null;
    };

    /**
     * Creates an Any message from a plain object. Also converts values to their respective internal types.
     * @param {Object.<string,*>} object Plain object
     * @returns {Any} Any
     */
    Any.fromObject = function fromObject(object) {
        if (object instanceof $root.Any)
            return object;
        var message = new $root.Any();
        if (object.typeUrl != null)
            message.typeUrl = String(object.typeUrl);
        if (object.value != null)
            if (typeof object.value === "string")
                $util.base64.decode(object.value, message.value = $util.newBuffer($util.base64.length(object.value)), 0);
            else if (object.value.length)
                message.value = object.value;
        return message;
    };

    /**
     * Creates an Any message from a plain object. Also converts values to their respective internal types.
     * This is an alias of {@link Any.fromObject}.
     * @function
     * @param {Object.<string,*>} object Plain object
     * @returns {Any} Any
     */
    Any.from = Any.fromObject;

    /**
     * Creates a plain object from an Any message. Also converts values to other types if specified.
     * @param {Any} message Any
     * @param {$protobuf.ConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    Any.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults) {
            object.typeUrl = "";
            object.value = options.bytes === String ? "" : [];
        }
        if (message.typeUrl != null && message.hasOwnProperty("typeUrl"))
            object.typeUrl = message.typeUrl;
        if (message.value != null && message.hasOwnProperty("value"))
            object.value = options.bytes === String ? $util.base64.encode(message.value, 0, message.value.length) : options.bytes === Array ? Array.prototype.slice.call(message.value) : message.value;
        return object;
    };

    /**
     * Creates a plain object from this Any message. Also converts values to other types if specified.
     * @param {$protobuf.ConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    Any.prototype.toObject = function toObject(options) {
        return this.constructor.toObject(this, options);
    };

    /**
     * Converts this Any to JSON.
     * @returns {Object.<string,*>} JSON object
     */
    Any.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return Any;
})();

$root.Root = (function() {

    /**
     * Properties of a Root.
     * @typedef Root$Properties
     * @type {Object}
     * @property {number} [playerid] Root playerid.
     * @property {string} [type] Root type.
     * @property {number} [id] Root id.
     * @property {Object.<string,GameObject$Properties>} [listObject] Root listObject.
     */

    /**
     * Constructs a new Root.
     * @exports Root
     * @constructor
     * @param {Root$Properties=} [properties] Properties to set
     */
    function Root(properties) {
        this.listObject = {};
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
     * Root type.
     * @type {string}
     */
    Root.prototype.type = "";

    /**
     * Root id.
     * @type {number}
     */
    Root.prototype.id = 0;

    /**
     * Root listObject.
     * @type {Object.<string,GameObject$Properties>}
     */
    Root.prototype.listObject = $util.emptyObject;

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
            writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.playerid);
        if (message.type != null && message.hasOwnProperty("type"))
            writer.uint32(/* id 2, wireType 2 =*/18).string(message.type);
        if (message.id != null && message.hasOwnProperty("id"))
            writer.uint32(/* id 3, wireType 0 =*/24).uint32(message.id);
        if (message.listObject != null && message.hasOwnProperty("listObject"))
            for (var keys = Object.keys(message.listObject), i = 0; i < keys.length; ++i) {
                writer.uint32(/* id 4, wireType 2 =*/34).fork().uint32(/* id 1, wireType 0 =*/8).uint32(keys[i]);
                $root.GameObject.encode(message.listObject[keys[i]], writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim().ldelim();
            }
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
                message.playerid = reader.uint32();
                break;
            case 2:
                message.type = reader.string();
                break;
            case 3:
                message.id = reader.uint32();
                break;
            case 4:
                reader.skip().pos++;
                if (message.listObject === $util.emptyObject)
                    message.listObject = {};
                key = reader.uint32();
                reader.pos++;
                message.listObject[key] = $root.GameObject.decode(reader, reader.uint32());
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
            if (!$util.isInteger(message.playerid))
                return "playerid: integer expected";
        if (message.type != null && message.hasOwnProperty("type"))
            if (!$util.isString(message.type))
                return "type: string expected";
        if (message.id != null && message.hasOwnProperty("id"))
            if (!$util.isInteger(message.id))
                return "id: integer expected";
        if (message.listObject != null && message.hasOwnProperty("listObject")) {
            if (!$util.isObject(message.listObject))
                return "listObject: object expected";
            var key = Object.keys(message.listObject);
            for (var i = 0; i < key.length; ++i) {
                if (!$util.key32Re.test(key[i]))
                    return "listObject: integer key{k:uint32} expected";
                var error = $root.GameObject.verify(message.listObject[key[i]]);
                if (error)
                    return "listObject." + error;
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
            message.playerid = object.playerid >>> 0;
        if (object.type != null)
            message.type = String(object.type);
        if (object.id != null)
            message.id = object.id >>> 0;
        if (object.listObject) {
            if (typeof object.listObject !== "object")
                throw TypeError(".Root.listObject: object expected");
            message.listObject = {};
            for (var keys = Object.keys(object.listObject), i = 0; i < keys.length; ++i) {
                if (typeof object.listObject[keys[i]] !== "object")
                    throw TypeError(".Root.listObject: object expected");
                message.listObject[keys[i]] = $root.GameObject.fromObject(object.listObject[keys[i]]);
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
        if (options.objects || options.defaults)
            object.listObject = {};
        if (options.defaults) {
            object.playerid = 0;
            object.type = "";
            object.id = 0;
        }
        if (message.playerid != null && message.hasOwnProperty("playerid"))
            object.playerid = message.playerid;
        if (message.type != null && message.hasOwnProperty("type"))
            object.type = message.type;
        if (message.id != null && message.hasOwnProperty("id"))
            object.id = message.id;
        var keys2;
        if (message.listObject && (keys2 = Object.keys(message.listObject)).length) {
            object.listObject = {};
            for (var j = 0; j < keys2.length; ++j)
                object.listObject[keys2[j]] = $root.GameObject.toObject(message.listObject[keys2[j]], options);
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

$root.GameObject = (function() {

    /**
     * Properties of a GameObject.
     * @typedef GameObject$Properties
     * @type {Object}
     * @property {number} [id] GameObject id.
     * @property {string} [type] GameObject type.
     * @property {number} [x] GameObject x.
     * @property {number} [y] GameObject y.
     * @property {number} [speed] GameObject speed.
     */

    /**
     * Constructs a new GameObject.
     * @exports GameObject
     * @constructor
     * @param {GameObject$Properties=} [properties] Properties to set
     */
    function GameObject(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * GameObject id.
     * @type {number}
     */
    GameObject.prototype.id = 0;

    /**
     * GameObject type.
     * @type {string}
     */
    GameObject.prototype.type = "";

    /**
     * GameObject x.
     * @type {number}
     */
    GameObject.prototype.x = 0;

    /**
     * GameObject y.
     * @type {number}
     */
    GameObject.prototype.y = 0;

    /**
     * GameObject speed.
     * @type {number}
     */
    GameObject.prototype.speed = 0;

    /**
     * Creates a new GameObject instance using the specified properties.
     * @param {GameObject$Properties=} [properties] Properties to set
     * @returns {GameObject} GameObject instance
     */
    GameObject.create = function create(properties) {
        return new GameObject(properties);
    };

    /**
     * Encodes the specified GameObject message. Does not implicitly {@link GameObject.verify|verify} messages.
     * @param {GameObject$Properties} message GameObject message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    GameObject.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.id != null && message.hasOwnProperty("id"))
            writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.id);
        if (message.type != null && message.hasOwnProperty("type"))
            writer.uint32(/* id 2, wireType 2 =*/18).string(message.type);
        if (message.x != null && message.hasOwnProperty("x"))
            writer.uint32(/* id 3, wireType 5 =*/29).float(message.x);
        if (message.y != null && message.hasOwnProperty("y"))
            writer.uint32(/* id 4, wireType 5 =*/37).float(message.y);
        if (message.speed != null && message.hasOwnProperty("speed"))
            writer.uint32(/* id 5, wireType 5 =*/45).float(message.speed);
        return writer;
    };

    /**
     * Encodes the specified GameObject message, length delimited. Does not implicitly {@link GameObject.verify|verify} messages.
     * @param {GameObject$Properties} message GameObject message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    GameObject.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a GameObject message from the specified reader or buffer.
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {GameObject} GameObject
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    GameObject.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.GameObject();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.id = reader.uint32();
                break;
            case 2:
                message.type = reader.string();
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
     * Decodes a GameObject message from the specified reader or buffer, length delimited.
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {GameObject} GameObject
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    GameObject.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a GameObject message.
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {?string} `null` if valid, otherwise the reason why it is not
     */
    GameObject.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.id != null && message.hasOwnProperty("id"))
            if (!$util.isInteger(message.id))
                return "id: integer expected";
        if (message.type != null && message.hasOwnProperty("type"))
            if (!$util.isString(message.type))
                return "type: string expected";
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
     * Creates a GameObject message from a plain object. Also converts values to their respective internal types.
     * @param {Object.<string,*>} object Plain object
     * @returns {GameObject} GameObject
     */
    GameObject.fromObject = function fromObject(object) {
        if (object instanceof $root.GameObject)
            return object;
        var message = new $root.GameObject();
        if (object.id != null)
            message.id = object.id >>> 0;
        if (object.type != null)
            message.type = String(object.type);
        if (object.x != null)
            message.x = Number(object.x);
        if (object.y != null)
            message.y = Number(object.y);
        if (object.speed != null)
            message.speed = Number(object.speed);
        return message;
    };

    /**
     * Creates a GameObject message from a plain object. Also converts values to their respective internal types.
     * This is an alias of {@link GameObject.fromObject}.
     * @function
     * @param {Object.<string,*>} object Plain object
     * @returns {GameObject} GameObject
     */
    GameObject.from = GameObject.fromObject;

    /**
     * Creates a plain object from a GameObject message. Also converts values to other types if specified.
     * @param {GameObject} message GameObject
     * @param {$protobuf.ConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    GameObject.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults) {
            object.id = 0;
            object.type = "";
            object.x = 0;
            object.y = 0;
            object.speed = 0;
        }
        if (message.id != null && message.hasOwnProperty("id"))
            object.id = message.id;
        if (message.type != null && message.hasOwnProperty("type"))
            object.type = message.type;
        if (message.x != null && message.hasOwnProperty("x"))
            object.x = message.x;
        if (message.y != null && message.hasOwnProperty("y"))
            object.y = message.y;
        if (message.speed != null && message.hasOwnProperty("speed"))
            object.speed = message.speed;
        return object;
    };

    /**
     * Creates a plain object from this GameObject message. Also converts values to other types if specified.
     * @param {$protobuf.ConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    GameObject.prototype.toObject = function toObject(options) {
        return this.constructor.toObject(this, options);
    };

    /**
     * Converts this GameObject to JSON.
     * @returns {Object.<string,*>} JSON object
     */
    GameObject.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return GameObject;
})();

module.exports = $root;
