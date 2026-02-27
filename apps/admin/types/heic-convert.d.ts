declare module 'heic-convert' {
  type Params = {
    buffer: Buffer
    format: 'JPEG'
    quality: number
  }

  export default function heicConvert(params: Params): Promise<Buffer | Uint8Array>
}
