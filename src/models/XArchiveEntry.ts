import { XArchiveFileType } from "../enums/XArchiveFileType";
import { XArchiveVersion } from "../enums/XArchiveVersion";
import { BinaryReader } from "../util/BinaryReader";
import { IReleasable } from "../util/IReleasable";
import { Model } from "./Model";
import { XArchiveFile } from "./XArchiveFile";

export class XArchiveEntry extends Model implements IReleasable
{
  public version: XArchiveVersion = -1;
  public fileType: XArchiveFileType = -1;
  public index: number = -1;
  public someOffset: number = -1;
  public size: number = -1;
  public fileOffset: number = -1;
  public file?: XArchiveFile;

  public static ReadFrom(offset: number, reader: BinaryReader, archiveOffset: number): XArchiveEntry {
    let entry = new XArchiveEntry();
    entry.version = reader.u32(offset);
    entry.fileType = reader.u32(offset + 4);
    entry.index = reader.u32(offset + 8);
    entry.someOffset = reader.u32(offset + 12);
    entry.size = reader.u32(offset + 16);
    entry.fileOffset = reader.u32(offset + 20);

    // archive header + fileCount * sizeof(archive entry)
    let fileBaseAddress = 16 + reader.u32(archiveOffset + 12) * 24;
    entry.file = XArchiveFile.ReadFrom(fileBaseAddress + entry.fileOffset, reader);

    return entry;
  }

  public Release(): void
  {
    this.file = undefined;
  }
}