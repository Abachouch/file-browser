import { FileType } from './FileType'
import { join as pathJoin, parse as parsePath } from 'path'

export default class MediaFile {
  pathString: string
  fileType: FileType
  ext: string
  name: string
  constructor(parent: string, name: string, isDir: Boolean) {
    this.pathString = pathJoin(parent, name)
    this.ext = parsePath(this.pathString).ext
    this.name = name
    if (isDir) {
      this.fileType = FileType.folder
    } else {
      switch (this.ext) {
        case '.gif':
        case '.svg':
        case '.jpeg':
        case '.jpg':
        case '.ico':
        case '.apng':
        case '.avif':
        case '.png':
          this.fileType = FileType.image
          break
        case '.mp3':
        case '.flacc':
          this.fileType = FileType.audio
          break
        case '.mp4':
        case '.ogg':
        case '.wav':
        case '.webm':
          this.fileType = FileType.video
          break
        case '.txt':
        case '.md':
          this.fileType = FileType.text
          break
        default:
          this.fileType = FileType.unknown
          break
      }
    }
  }
}
