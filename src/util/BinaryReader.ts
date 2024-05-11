export class BinaryReader
{
  private _buffer: ArrayBuffer;
  private _view: DataView;
  private _endianness: boolean;

  public constructor(buffer: ArrayBuffer, endianness: boolean = true)
  {
    this._buffer = buffer;
    this._view = new DataView(this._buffer);
    this._endianness = endianness;
  }

  public i8(offset: number): number {
    return this._view.getInt8(offset);
  }

  public u8(offset: number): number {
    return this._view.getUint8(offset);
  }

  public i16(offset: number): number {
    return this._view.getInt16(offset, this._endianness);
  }

  public u16(offset: number): number {
    return this._view.getUint16(offset, this._endianness);
  }

  public i32(offset: number): number {
    return this._view.getInt32(offset, this._endianness);
  }

  public u32(offset: number): number {
    return this._view.getUint32(offset, this._endianness);
  }

  public f32(offset: number): number {
    return this._view.getFloat32(offset, this._endianness);
  }

  public f64(offset: number): number {
    return this._view.getFloat64(offset, this._endianness);
  }
}