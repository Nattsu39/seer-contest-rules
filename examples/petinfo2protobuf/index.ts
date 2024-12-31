import { PetInfo, MintmarkInfo } from "seer-interfaces/pet/index.js";
import { ProtoPetMessage } from "seer-interfaces/proto/api/pet.pb.js";
import { ProtoMintmarkInfo } from "seer-interfaces/proto/pet/mintmark.pb.js";
import { ProtoResistanceInfo } from "seer-interfaces/proto/pet/resist.pb.js";

export function PetInfoToProtobuf(...pets: PetInfo[]): ProtoPetMessage {
  const mintmarkconvert = (mintmark: MintmarkInfo): ProtoMintmarkInfo => (
    { mintmark: { $case: mintmark.type, value: mintmark as any } }
  )

  const message = ProtoPetMessage.fromPartial(
    {
      petInfo: pets.map(
        pet => {
          return {
            ...pet,
            mintmarks: pet.mintmarks.map(mintmarkconvert),
            resistance: pet.resistance as ProtoResistanceInfo
          }
        }
      )
    }
  )

  return message;
}

export function ProtobufToPetInfo(message: ProtoPetMessage): PetInfo[] {
  const mintmarkConvert = (mintmark: ProtoMintmarkInfo): MintmarkInfo => (
    mintmark.mintmark.value as any
  )

  return message.petInfo.map(
    pet => {
      return {
        ...pet,
        mintmarks: pet.mintmarks.map(mintmarkConvert),
      }
    }
  ) as PetInfo[];
}
