// Code generated by protoc-gen-ts_proto. DO NOT EDIT.
// versions:
//   protoc-gen-ts_proto  v2.3.0
//   protoc               unknown
// source: proto/pet/resist.proto

/* eslint-disable */
import { BinaryReader, BinaryWriter } from "@bufbuild/protobuf/wire";

export interface HurtResist {
  crit: number;
  regular: number;
  precent: number;
}

export interface StateResistItem {
  stateID: number;
  stateName: string;
  percent: number;
}

export interface ResistanceInfo {
  hurt: HurtResist | undefined;
  ctl: StateResistItem[];
  weak: StateResistItem[];
}

function createBaseHurtResist(): HurtResist {
  return { crit: 0, regular: 0, precent: 0 };
}

export const HurtResist: MessageFns<HurtResist> = {
  encode(message: HurtResist, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    if (message.crit !== 0) {
      writer.uint32(8).int32(message.crit);
    }
    if (message.regular !== 0) {
      writer.uint32(16).int32(message.regular);
    }
    if (message.precent !== 0) {
      writer.uint32(24).int32(message.precent);
    }
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): HurtResist {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseHurtResist();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 8) {
            break;
          }

          message.crit = reader.int32();
          continue;
        }
        case 2: {
          if (tag !== 16) {
            break;
          }

          message.regular = reader.int32();
          continue;
        }
        case 3: {
          if (tag !== 24) {
            break;
          }

          message.precent = reader.int32();
          continue;
        }
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): HurtResist {
    return {
      crit: isSet(object.crit) ? globalThis.Number(object.crit) : 0,
      regular: isSet(object.regular) ? globalThis.Number(object.regular) : 0,
      precent: isSet(object.precent) ? globalThis.Number(object.precent) : 0,
    };
  },

  toJSON(message: HurtResist): unknown {
    const obj: any = {};
    if (message.crit !== 0) {
      obj.crit = Math.round(message.crit);
    }
    if (message.regular !== 0) {
      obj.regular = Math.round(message.regular);
    }
    if (message.precent !== 0) {
      obj.precent = Math.round(message.precent);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<HurtResist>, I>>(base?: I): HurtResist {
    return HurtResist.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<HurtResist>, I>>(object: I): HurtResist {
    const message = createBaseHurtResist();
    message.crit = object.crit ?? 0;
    message.regular = object.regular ?? 0;
    message.precent = object.precent ?? 0;
    return message;
  },
};

function createBaseStateResistItem(): StateResistItem {
  return { stateID: 0, stateName: "", percent: 0 };
}

export const StateResistItem: MessageFns<StateResistItem> = {
  encode(message: StateResistItem, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    if (message.stateID !== 0) {
      writer.uint32(8).int32(message.stateID);
    }
    if (message.stateName !== "") {
      writer.uint32(18).string(message.stateName);
    }
    if (message.percent !== 0) {
      writer.uint32(24).int32(message.percent);
    }
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): StateResistItem {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStateResistItem();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 8) {
            break;
          }

          message.stateID = reader.int32();
          continue;
        }
        case 2: {
          if (tag !== 18) {
            break;
          }

          message.stateName = reader.string();
          continue;
        }
        case 3: {
          if (tag !== 24) {
            break;
          }

          message.percent = reader.int32();
          continue;
        }
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): StateResistItem {
    return {
      stateID: isSet(object.stateID) ? globalThis.Number(object.stateID) : 0,
      stateName: isSet(object.stateName) ? globalThis.String(object.stateName) : "",
      percent: isSet(object.percent) ? globalThis.Number(object.percent) : 0,
    };
  },

  toJSON(message: StateResistItem): unknown {
    const obj: any = {};
    if (message.stateID !== 0) {
      obj.stateID = Math.round(message.stateID);
    }
    if (message.stateName !== "") {
      obj.stateName = message.stateName;
    }
    if (message.percent !== 0) {
      obj.percent = Math.round(message.percent);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<StateResistItem>, I>>(base?: I): StateResistItem {
    return StateResistItem.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<StateResistItem>, I>>(object: I): StateResistItem {
    const message = createBaseStateResistItem();
    message.stateID = object.stateID ?? 0;
    message.stateName = object.stateName ?? "";
    message.percent = object.percent ?? 0;
    return message;
  },
};

function createBaseResistanceInfo(): ResistanceInfo {
  return { hurt: undefined, ctl: [], weak: [] };
}

export const ResistanceInfo: MessageFns<ResistanceInfo> = {
  encode(message: ResistanceInfo, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    if (message.hurt !== undefined) {
      HurtResist.encode(message.hurt, writer.uint32(10).fork()).join();
    }
    for (const v of message.ctl) {
      StateResistItem.encode(v!, writer.uint32(18).fork()).join();
    }
    for (const v of message.weak) {
      StateResistItem.encode(v!, writer.uint32(26).fork()).join();
    }
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): ResistanceInfo {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseResistanceInfo();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 10) {
            break;
          }

          message.hurt = HurtResist.decode(reader, reader.uint32());
          continue;
        }
        case 2: {
          if (tag !== 18) {
            break;
          }

          message.ctl.push(StateResistItem.decode(reader, reader.uint32()));
          continue;
        }
        case 3: {
          if (tag !== 26) {
            break;
          }

          message.weak.push(StateResistItem.decode(reader, reader.uint32()));
          continue;
        }
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ResistanceInfo {
    return {
      hurt: isSet(object.hurt) ? HurtResist.fromJSON(object.hurt) : undefined,
      ctl: globalThis.Array.isArray(object?.ctl) ? object.ctl.map((e: any) => StateResistItem.fromJSON(e)) : [],
      weak: globalThis.Array.isArray(object?.weak) ? object.weak.map((e: any) => StateResistItem.fromJSON(e)) : [],
    };
  },

  toJSON(message: ResistanceInfo): unknown {
    const obj: any = {};
    if (message.hurt !== undefined) {
      obj.hurt = HurtResist.toJSON(message.hurt);
    }
    if (message.ctl?.length) {
      obj.ctl = message.ctl.map((e) => StateResistItem.toJSON(e));
    }
    if (message.weak?.length) {
      obj.weak = message.weak.map((e) => StateResistItem.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ResistanceInfo>, I>>(base?: I): ResistanceInfo {
    return ResistanceInfo.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ResistanceInfo>, I>>(object: I): ResistanceInfo {
    const message = createBaseResistanceInfo();
    message.hurt = (object.hurt !== undefined && object.hurt !== null)
      ? HurtResist.fromPartial(object.hurt)
      : undefined;
    message.ctl = object.ctl?.map((e) => StateResistItem.fromPartial(e)) || [];
    message.weak = object.weak?.map((e) => StateResistItem.fromPartial(e)) || [];
    return message;
  },
};

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

type DeepPartial<T> = T extends Builtin ? T
  : T extends globalThis.Array<infer U> ? globalThis.Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends { $case: string; value: unknown } ? { $case: T["$case"]; value?: DeepPartial<T["value"]> }
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
type Exact<P, I extends P> = P extends Builtin ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P>>]: never };

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}

interface MessageFns<T> {
  encode(message: T, writer?: BinaryWriter): BinaryWriter;
  decode(input: BinaryReader | Uint8Array, length?: number): T;
  fromJSON(object: any): T;
  toJSON(message: T): unknown;
  create<I extends Exact<DeepPartial<T>, I>>(base?: I): T;
  fromPartial<I extends Exact<DeepPartial<T>, I>>(object: I): T;
}
