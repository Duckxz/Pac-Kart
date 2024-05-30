import { BinaryReader } from "../util/BinaryReader";
import { IReleasable } from "../util/IReleasable";
import { Model } from "./Model";

export class XArchiveAudio extends Model implements IReleasable
{
  public dataOffset: number = 0;
  public length: number = 0;
  public unk1: number = 0;
  public sampleRate: number = 0;
  public unk2: number = 0;
  public maybeVolume: number = 0;
  public unk3: number = 0;
  public unk4: number = 0;
  public unk5: number = 0;

  public static ReadFrom(offset: number, reader: BinaryReader): XArchiveAudio {
    let audio = new XArchiveAudio();
    audio.dataOffset = reader.u32(offset);
    audio.length = reader.u32(offset + 4);
    audio.unk1 = reader.u32(offset + 8)
    audio.sampleRate = reader.u32(offset + 12)
    audio.unk2 = reader.u32(offset + 16)
    audio.maybeVolume = reader.u16(offset + 20)
    audio.unk3 = reader.u16(offset + 22)
    audio.unk4 = reader.u32(offset + 24)
    audio.unk5 = reader.u32(offset + 28)
    return audio;
  }

  public Release(): void {

  }
}