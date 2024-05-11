import { XArchiveConsole } from "../enums/XArchiveConsole";
import { XArchiveGame } from "../enums/XArchiveGame";
import { XArchiveVersion } from "../enums/XArchiveVersion";
import { BinaryReader } from "../util/BinaryReader";
import { IReleasable } from "../util/IReleasable";
import { Model } from "./Model";
import { XArchiveEntry } from "./XArchiveEntry";

export class XArchive extends Model implements IReleasable {
  public extension: string;
  public game: XArchiveGame;
  public console: XArchiveConsole;
  public magic1: number;
  public magic2: number;
  public version: XArchiveVersion;
  public fileCount: number;
  public entries: XArchiveEntry[] = new Array<XArchiveEntry>;

  public DetermineArchiveTarget(): void {
    switch (this.extension.toUpperCase()) {
      case "XPC":
        this.console = XArchiveConsole.PC;
        break;
      case "XGC":
        this.console = XArchiveConsole.GameCube;
        break;
      case "XPS":
        this.console = XArchiveConsole.PlayStation2;
        break;
      case "XPP":
        this.console = XArchiveConsole.PlayStationPortable;
        break;
      case "XBX":
        this.console = XArchiveConsole.Xbox;
        break;
    }

    switch (this.version) {
      case XArchiveVersion.BigFootPC:
        this.game = XArchiveGame.BigFootColissionCourse;
        break;
      case XArchiveVersion.PacKartGCNTSC:
      case XArchiveVersion.PacKartPS2PAL:
      case XArchiveVersion.PacKartPS2Demo:
      case XArchiveVersion.PacKartXBXDemo:
      case XArchiveVersion.PacKartPC:
        this.game = XArchiveGame.PacKartWorldRally;
        break;
      case XArchiveVersion.SnoopyPC:
        this.game = XArchiveGame.SnoopyAndTheRedBaron;
        break;
      case XArchiveVersion.HotWheelsPC:
        this.game = XArchiveGame.HotWheelsVelocityX;
        break;
    }
  }

  public static ReadFrom(extension: string, offset: number, reader: BinaryReader): XArchive {
    let archive = new XArchive();
    archive.extension = extension;
    archive.magic1 = reader.u32(offset);
    archive.magic2 = reader.u32(offset + 4);
    archive.version = reader.u32(offset + 8);
    archive.fileCount = reader.u32(offset + 12);

    archive.DetermineArchiveTarget();

    // Directory entries start directly after the archive header
    let directoryEntryOffset = offset + 16;

    console.log(`[XArchive] Reading ${archive.fileCount} directory entries`);

    for (let i = 0; i < archive.fileCount; i++) {
      let entry = XArchiveEntry.ReadFrom(directoryEntryOffset, reader, offset);
      archive.entries.push(entry);
      directoryEntryOffset += 24; // each entry is 24 bytes
    }

    return archive;
  }

  public Release(): void {
    for (let entry of this.entries) {
      entry.Release();
    }
  }
}