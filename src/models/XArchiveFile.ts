import { BinaryReader } from "../util/BinaryReader";
import { IReleasable } from "../util/IReleasable";
import { Model } from "./Model";

export class XArchiveFile extends Model implements IReleasable
{
  public offsetPatchListOffset: number = -1;
  public indexPatchListOffset: number = -1;
  public soundCount: number = -1;
  public oplSection1Count: number = -1;
  public oplSection2Count: number = -1;
  public iplSection1Count: number = -1;
  public iplSection2Count: number = -1;
  public iplSection3Count: number = -1;
  public textureCount: number = -1;
  public texturesOffset: number = -1;
  public soundCount2: number = -1;
  public unk1: number = -1;
  public unk2: number = -1;
  public clutOffset: number = -1;
  public textureAnimationSectionCount: number = -1;
  public textureAnimationsOffset: number = -1;
  public fileIndex1: number = -1;
  public fileIndex2: number = -1;
  public unk3: number = -1;

  public static ReadFrom(offset: number, reader: BinaryReader): XArchiveFile {
    let file = new XArchiveFile();
    file.offsetPatchListOffset = reader.u32(offset);
    file.indexPatchListOffset = reader.u32(offset + 4);
    file.soundCount = reader.u32(offset + 8);
    file.oplSection2Count = reader.u32(offset + 12);
    file.iplSection1Count = reader.u32(offset + 16);
    file.textureCount = reader.u32(offset + 20);
    file.texturesOffset = reader.u32(offset + 24);
    file.iplSection3Count = reader.u32(offset + 28);
    file.soundCount2 = reader.u32(offset + 32);
    file.unk1 = reader.u32(offset + 36);
    file.unk2 = reader.u32(offset + 40);
    file.clutOffset = reader.u32(offset + 44);
    file.textureAnimationSectionCount = reader.u32(offset + 48);
    file.iplSection2Count = reader.u32(offset + 52);
    file.oplSection1Count = reader.u32(offset + 56);
    file.textureAnimationsOffset = reader.u32(offset + 60);
    file.fileIndex1 = reader.u32(offset + 92);
    file.fileIndex2 = reader.u32(offset + 112);
    file.unk3 = reader.u32(offset + 116);
    return file;
  }

  public Release(): void
  {
    
  }
}