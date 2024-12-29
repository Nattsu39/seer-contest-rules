// Code generated by protoc-gen-ts_proto. DO NOT EDIT.
// versions:
//   protoc-gen-ts_proto  v2.3.0
//   protoc               unknown
// source: proto/api/pet.proto

/* eslint-disable */
import { BinaryReader, BinaryWriter } from "@bufbuild/protobuf/wire";
import { PetInfo } from "../pet/petinfo.pb.js";
import { UserSet } from "../user/user_set.pb.js";

export enum PetMessageTypeEnum {
  UNSPECIFIED = "UNSPECIFIED",
  OFFICIAL = "OFFICIAL",
  CLASSIC = "CLASSIC",
  TEST = "TEST",
  TAIWAN = "TAIWAN",
  CLASSIC_XIN = "CLASSIC_XIN",
  UNRECOGNIZED = "UNRECOGNIZED",
}

export function petMessageTypeEnumFromJSON(object: any): PetMessageTypeEnum {
  switch (object) {
    case 0:
    case "UNSPECIFIED":
      return PetMessageTypeEnum.UNSPECIFIED;
    case 1:
    case "OFFICIAL":
      return PetMessageTypeEnum.OFFICIAL;
    case 2:
    case "CLASSIC":
      return PetMessageTypeEnum.CLASSIC;
    case 3:
    case "TEST":
      return PetMessageTypeEnum.TEST;
    case 4:
    case "TAIWAN":
      return PetMessageTypeEnum.TAIWAN;
    case 10:
    case "CLASSIC_XIN":
      return PetMessageTypeEnum.CLASSIC_XIN;
    case -1:
    case "UNRECOGNIZED":
    default:
      return PetMessageTypeEnum.UNRECOGNIZED;
  }
}

export function petMessageTypeEnumToJSON(object: PetMessageTypeEnum): string {
  switch (object) {
    case PetMessageTypeEnum.UNSPECIFIED:
      return "UNSPECIFIED";
    case PetMessageTypeEnum.OFFICIAL:
      return "OFFICIAL";
    case PetMessageTypeEnum.CLASSIC:
      return "CLASSIC";
    case PetMessageTypeEnum.TEST:
      return "TEST";
    case PetMessageTypeEnum.TAIWAN:
      return "TAIWAN";
    case PetMessageTypeEnum.CLASSIC_XIN:
      return "CLASSIC_XIN";
    case PetMessageTypeEnum.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export function petMessageTypeEnumToNumber(object: PetMessageTypeEnum): number {
  switch (object) {
    case PetMessageTypeEnum.UNSPECIFIED:
      return 0;
    case PetMessageTypeEnum.OFFICIAL:
      return 1;
    case PetMessageTypeEnum.CLASSIC:
      return 2;
    case PetMessageTypeEnum.TEST:
      return 3;
    case PetMessageTypeEnum.TAIWAN:
      return 4;
    case PetMessageTypeEnum.CLASSIC_XIN:
      return 10;
    case PetMessageTypeEnum.UNRECOGNIZED:
    default:
      return -1;
  }
}

export interface PetMessage {
  version: number;
  type: PetMessageTypeEnum;
  userSet: UserSet | undefined;
  petInfo: PetInfo[];
}

function createBasePetMessage(): PetMessage {
  return { version: 0, type: PetMessageTypeEnum.UNSPECIFIED, userSet: undefined, petInfo: [] };
}

export const PetMessage: MessageFns<PetMessage> = {
  encode(message: PetMessage, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    if (message.version !== 0) {
      writer.uint32(8).int32(message.version);
    }
    if (message.type !== PetMessageTypeEnum.UNSPECIFIED) {
      writer.uint32(16).int32(petMessageTypeEnumToNumber(message.type));
    }
    if (message.userSet !== undefined) {
      UserSet.encode(message.userSet, writer.uint32(26).fork()).join();
    }
    for (const v of message.petInfo) {
      PetInfo.encode(v!, writer.uint32(74).fork()).join();
    }
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): PetMessage {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePetMessage();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 8) {
            break;
          }

          message.version = reader.int32();
          continue;
        }
        case 2: {
          if (tag !== 16) {
            break;
          }

          message.type = petMessageTypeEnumFromJSON(reader.int32());
          continue;
        }
        case 3: {
          if (tag !== 26) {
            break;
          }

          message.userSet = UserSet.decode(reader, reader.uint32());
          continue;
        }
        case 9: {
          if (tag !== 74) {
            break;
          }

          message.petInfo.push(PetInfo.decode(reader, reader.uint32()));
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

  fromJSON(object: any): PetMessage {
    return {
      version: isSet(object.version) ? globalThis.Number(object.version) : 0,
      type: isSet(object.type) ? petMessageTypeEnumFromJSON(object.type) : PetMessageTypeEnum.UNSPECIFIED,
      userSet: isSet(object.userSet) ? UserSet.fromJSON(object.userSet) : undefined,
      petInfo: globalThis.Array.isArray(object?.petInfo) ? object.petInfo.map((e: any) => PetInfo.fromJSON(e)) : [],
    };
  },

  toJSON(message: PetMessage): unknown {
    const obj: any = {};
    if (message.version !== 0) {
      obj.version = Math.round(message.version);
    }
    if (message.type !== PetMessageTypeEnum.UNSPECIFIED) {
      obj.type = petMessageTypeEnumToJSON(message.type);
    }
    if (message.userSet !== undefined) {
      obj.userSet = UserSet.toJSON(message.userSet);
    }
    if (message.petInfo?.length) {
      obj.petInfo = message.petInfo.map((e) => PetInfo.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<PetMessage>, I>>(base?: I): PetMessage {
    return PetMessage.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<PetMessage>, I>>(object: I): PetMessage {
    const message = createBasePetMessage();
    message.version = object.version ?? 0;
    message.type = object.type ?? PetMessageTypeEnum.UNSPECIFIED;
    message.userSet = (object.userSet !== undefined && object.userSet !== null)
      ? UserSet.fromPartial(object.userSet)
      : undefined;
    message.petInfo = object.petInfo?.map((e) => PetInfo.fromPartial(e)) || [];
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
