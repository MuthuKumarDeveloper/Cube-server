import { flatbuffers } from 'flatbuffers';
/**
 * @enum {number}
 */
export declare enum HttpCommand {
    NONE = 0,
    HttpQuery = 1,
    HttpResultSet = 2,
    HttpError = 3
}
/**
 * @constructor
 */
export declare class HttpMessage {
    bb: flatbuffers.ByteBuffer | null;
    bb_pos: number;
    /**
     * @param number i
     * @param flatbuffers.ByteBuffer bb
     * @returns HttpMessage
     */
    __init(i: number, bb: flatbuffers.ByteBuffer): HttpMessage;
    /**
     * @param flatbuffers.ByteBuffer bb
     * @param HttpMessage= obj
     * @returns HttpMessage
     */
    static getRootAsHttpMessage(bb: flatbuffers.ByteBuffer, obj?: HttpMessage): HttpMessage;
    /**
     * @param flatbuffers.ByteBuffer bb
     * @param HttpMessage= obj
     * @returns HttpMessage
     */
    static getSizePrefixedRootAsHttpMessage(bb: flatbuffers.ByteBuffer, obj?: HttpMessage): HttpMessage;
    /**
     * @returns number
     */
    messageId(): number;
    /**
     * @returns HttpCommand
     */
    commandType(): HttpCommand;
    /**
     * @param flatbuffers.Table obj
     * @returns ?flatbuffers.Table
     */
    command<T extends flatbuffers.Table>(obj: T): T | null;
    /**
     * @param flatbuffers.Builder builder
     */
    static startHttpMessage(builder: flatbuffers.Builder): void;
    /**
     * @param flatbuffers.Builder builder
     * @param number messageId
     */
    static addMessageId(builder: flatbuffers.Builder, messageId: number): void;
    /**
     * @param flatbuffers.Builder builder
     * @param HttpCommand commandType
     */
    static addCommandType(builder: flatbuffers.Builder, commandType: HttpCommand): void;
    /**
     * @param flatbuffers.Builder builder
     * @param flatbuffers.Offset commandOffset
     */
    static addCommand(builder: flatbuffers.Builder, commandOffset: flatbuffers.Offset): void;
    /**
     * @param flatbuffers.Builder builder
     * @returns flatbuffers.Offset
     */
    static endHttpMessage(builder: flatbuffers.Builder): flatbuffers.Offset;
    /**
     * @param flatbuffers.Builder builder
     * @param flatbuffers.Offset offset
     */
    static finishHttpMessageBuffer(builder: flatbuffers.Builder, offset: flatbuffers.Offset): void;
    /**
     * @param flatbuffers.Builder builder
     * @param flatbuffers.Offset offset
     */
    static finishSizePrefixedHttpMessageBuffer(builder: flatbuffers.Builder, offset: flatbuffers.Offset): void;
    static createHttpMessage(builder: flatbuffers.Builder, messageId: number, commandType: HttpCommand, commandOffset: flatbuffers.Offset): flatbuffers.Offset;
}
/**
 * @constructor
 */
export declare class HttpQuery {
    bb: flatbuffers.ByteBuffer | null;
    bb_pos: number;
    /**
     * @param number i
     * @param flatbuffers.ByteBuffer bb
     * @returns HttpQuery
     */
    __init(i: number, bb: flatbuffers.ByteBuffer): HttpQuery;
    /**
     * @param flatbuffers.ByteBuffer bb
     * @param HttpQuery= obj
     * @returns HttpQuery
     */
    static getRootAsHttpQuery(bb: flatbuffers.ByteBuffer, obj?: HttpQuery): HttpQuery;
    /**
     * @param flatbuffers.ByteBuffer bb
     * @param HttpQuery= obj
     * @returns HttpQuery
     */
    static getSizePrefixedRootAsHttpQuery(bb: flatbuffers.ByteBuffer, obj?: HttpQuery): HttpQuery;
    /**
     * @param flatbuffers.Encoding= optionalEncoding
     * @returns string|Uint8Array|null
     */
    query(): string | null;
    query(optionalEncoding: flatbuffers.Encoding): string | Uint8Array | null;
    /**
     * @param flatbuffers.Builder builder
     */
    static startHttpQuery(builder: flatbuffers.Builder): void;
    /**
     * @param flatbuffers.Builder builder
     * @param flatbuffers.Offset queryOffset
     */
    static addQuery(builder: flatbuffers.Builder, queryOffset: flatbuffers.Offset): void;
    /**
     * @param flatbuffers.Builder builder
     * @returns flatbuffers.Offset
     */
    static endHttpQuery(builder: flatbuffers.Builder): flatbuffers.Offset;
    static createHttpQuery(builder: flatbuffers.Builder, queryOffset: flatbuffers.Offset): flatbuffers.Offset;
}
/**
 * @constructor
 */
export declare class HttpError {
    bb: flatbuffers.ByteBuffer | null;
    bb_pos: number;
    /**
     * @param number i
     * @param flatbuffers.ByteBuffer bb
     * @returns HttpError
     */
    __init(i: number, bb: flatbuffers.ByteBuffer): HttpError;
    /**
     * @param flatbuffers.ByteBuffer bb
     * @param HttpError= obj
     * @returns HttpError
     */
    static getRootAsHttpError(bb: flatbuffers.ByteBuffer, obj?: HttpError): HttpError;
    /**
     * @param flatbuffers.ByteBuffer bb
     * @param HttpError= obj
     * @returns HttpError
     */
    static getSizePrefixedRootAsHttpError(bb: flatbuffers.ByteBuffer, obj?: HttpError): HttpError;
    /**
     * @param flatbuffers.Encoding= optionalEncoding
     * @returns string|Uint8Array|null
     */
    error(): string | null;
    error(optionalEncoding: flatbuffers.Encoding): string | Uint8Array | null;
    /**
     * @param flatbuffers.Builder builder
     */
    static startHttpError(builder: flatbuffers.Builder): void;
    /**
     * @param flatbuffers.Builder builder
     * @param flatbuffers.Offset errorOffset
     */
    static addError(builder: flatbuffers.Builder, errorOffset: flatbuffers.Offset): void;
    /**
     * @param flatbuffers.Builder builder
     * @returns flatbuffers.Offset
     */
    static endHttpError(builder: flatbuffers.Builder): flatbuffers.Offset;
    static createHttpError(builder: flatbuffers.Builder, errorOffset: flatbuffers.Offset): flatbuffers.Offset;
}
/**
 * @constructor
 */
export declare class HttpResultSet {
    bb: flatbuffers.ByteBuffer | null;
    bb_pos: number;
    /**
     * @param number i
     * @param flatbuffers.ByteBuffer bb
     * @returns HttpResultSet
     */
    __init(i: number, bb: flatbuffers.ByteBuffer): HttpResultSet;
    /**
     * @param flatbuffers.ByteBuffer bb
     * @param HttpResultSet= obj
     * @returns HttpResultSet
     */
    static getRootAsHttpResultSet(bb: flatbuffers.ByteBuffer, obj?: HttpResultSet): HttpResultSet;
    /**
     * @param flatbuffers.ByteBuffer bb
     * @param HttpResultSet= obj
     * @returns HttpResultSet
     */
    static getSizePrefixedRootAsHttpResultSet(bb: flatbuffers.ByteBuffer, obj?: HttpResultSet): HttpResultSet;
    /**
     * @param number index
     * @param flatbuffers.Encoding= optionalEncoding
     * @returns string|Uint8Array
     */
    columns(index: number): string;
    columns(index: number, optionalEncoding: flatbuffers.Encoding): string | Uint8Array;
    /**
     * @returns number
     */
    columnsLength(): number;
    /**
     * @param number index
     * @param HttpRow= obj
     * @returns HttpRow
     */
    rows(index: number, obj?: HttpRow): HttpRow | null;
    /**
     * @returns number
     */
    rowsLength(): number;
    /**
     * @param flatbuffers.Builder builder
     */
    static startHttpResultSet(builder: flatbuffers.Builder): void;
    /**
     * @param flatbuffers.Builder builder
     * @param flatbuffers.Offset columnsOffset
     */
    static addColumns(builder: flatbuffers.Builder, columnsOffset: flatbuffers.Offset): void;
    /**
     * @param flatbuffers.Builder builder
     * @param Array.<flatbuffers.Offset> data
     * @returns flatbuffers.Offset
     */
    static createColumnsVector(builder: flatbuffers.Builder, data: flatbuffers.Offset[]): flatbuffers.Offset;
    /**
     * @param flatbuffers.Builder builder
     * @param number numElems
     */
    static startColumnsVector(builder: flatbuffers.Builder, numElems: number): void;
    /**
     * @param flatbuffers.Builder builder
     * @param flatbuffers.Offset rowsOffset
     */
    static addRows(builder: flatbuffers.Builder, rowsOffset: flatbuffers.Offset): void;
    /**
     * @param flatbuffers.Builder builder
     * @param Array.<flatbuffers.Offset> data
     * @returns flatbuffers.Offset
     */
    static createRowsVector(builder: flatbuffers.Builder, data: flatbuffers.Offset[]): flatbuffers.Offset;
    /**
     * @param flatbuffers.Builder builder
     * @param number numElems
     */
    static startRowsVector(builder: flatbuffers.Builder, numElems: number): void;
    /**
     * @param flatbuffers.Builder builder
     * @returns flatbuffers.Offset
     */
    static endHttpResultSet(builder: flatbuffers.Builder): flatbuffers.Offset;
    static createHttpResultSet(builder: flatbuffers.Builder, columnsOffset: flatbuffers.Offset, rowsOffset: flatbuffers.Offset): flatbuffers.Offset;
}
/**
 * @constructor
 */
export declare class HttpRow {
    bb: flatbuffers.ByteBuffer | null;
    bb_pos: number;
    /**
     * @param number i
     * @param flatbuffers.ByteBuffer bb
     * @returns HttpRow
     */
    __init(i: number, bb: flatbuffers.ByteBuffer): HttpRow;
    /**
     * @param flatbuffers.ByteBuffer bb
     * @param HttpRow= obj
     * @returns HttpRow
     */
    static getRootAsHttpRow(bb: flatbuffers.ByteBuffer, obj?: HttpRow): HttpRow;
    /**
     * @param flatbuffers.ByteBuffer bb
     * @param HttpRow= obj
     * @returns HttpRow
     */
    static getSizePrefixedRootAsHttpRow(bb: flatbuffers.ByteBuffer, obj?: HttpRow): HttpRow;
    /**
     * @param number index
     * @param HttpColumnValue= obj
     * @returns HttpColumnValue
     */
    values(index: number, obj?: HttpColumnValue): HttpColumnValue | null;
    /**
     * @returns number
     */
    valuesLength(): number;
    /**
     * @param flatbuffers.Builder builder
     */
    static startHttpRow(builder: flatbuffers.Builder): void;
    /**
     * @param flatbuffers.Builder builder
     * @param flatbuffers.Offset valuesOffset
     */
    static addValues(builder: flatbuffers.Builder, valuesOffset: flatbuffers.Offset): void;
    /**
     * @param flatbuffers.Builder builder
     * @param Array.<flatbuffers.Offset> data
     * @returns flatbuffers.Offset
     */
    static createValuesVector(builder: flatbuffers.Builder, data: flatbuffers.Offset[]): flatbuffers.Offset;
    /**
     * @param flatbuffers.Builder builder
     * @param number numElems
     */
    static startValuesVector(builder: flatbuffers.Builder, numElems: number): void;
    /**
     * @param flatbuffers.Builder builder
     * @returns flatbuffers.Offset
     */
    static endHttpRow(builder: flatbuffers.Builder): flatbuffers.Offset;
    static createHttpRow(builder: flatbuffers.Builder, valuesOffset: flatbuffers.Offset): flatbuffers.Offset;
}
/**
 * @constructor
 */
export declare class HttpColumnValue {
    bb: flatbuffers.ByteBuffer | null;
    bb_pos: number;
    /**
     * @param number i
     * @param flatbuffers.ByteBuffer bb
     * @returns HttpColumnValue
     */
    __init(i: number, bb: flatbuffers.ByteBuffer): HttpColumnValue;
    /**
     * @param flatbuffers.ByteBuffer bb
     * @param HttpColumnValue= obj
     * @returns HttpColumnValue
     */
    static getRootAsHttpColumnValue(bb: flatbuffers.ByteBuffer, obj?: HttpColumnValue): HttpColumnValue;
    /**
     * @param flatbuffers.ByteBuffer bb
     * @param HttpColumnValue= obj
     * @returns HttpColumnValue
     */
    static getSizePrefixedRootAsHttpColumnValue(bb: flatbuffers.ByteBuffer, obj?: HttpColumnValue): HttpColumnValue;
    /**
     * @param flatbuffers.Encoding= optionalEncoding
     * @returns string|Uint8Array|null
     */
    stringValue(): string | null;
    stringValue(optionalEncoding: flatbuffers.Encoding): string | Uint8Array | null;
    /**
     * @param flatbuffers.Builder builder
     */
    static startHttpColumnValue(builder: flatbuffers.Builder): void;
    /**
     * @param flatbuffers.Builder builder
     * @param flatbuffers.Offset stringValueOffset
     */
    static addStringValue(builder: flatbuffers.Builder, stringValueOffset: flatbuffers.Offset): void;
    /**
     * @param flatbuffers.Builder builder
     * @returns flatbuffers.Offset
     */
    static endHttpColumnValue(builder: flatbuffers.Builder): flatbuffers.Offset;
    static createHttpColumnValue(builder: flatbuffers.Builder, stringValueOffset: flatbuffers.Offset): flatbuffers.Offset;
}
//# sourceMappingURL=HttpMessage.d.ts.map