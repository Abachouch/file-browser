import {
  resolve,
  basename,
  normalize,
  sep,
  dirname,
  ParsedPath,
  parse
} from 'path'

export class Path {
  path: string
  objPath: ParsedPath

  constructor(pathString: string) {
    // c:\a\b\ or c:\a\b
    this.path = normalize(pathString + sep)
    this.objPath = parse(pathString)
  }

  getDrive(): string {
    return this.objPath.root
  }

  getName(): string {
    return this.isDisk() ? this.objPath.root : this.objPath.name
  }

  getExt(): string {
    return this.objPath.ext
  }

  getParent(): Path {
    let parent = this.isDisk() ? '' : this.objPath.dir
    return new Path(parent)
  }
  getType(): string {
    // jpeg , jpg , gif , svg ,ico ,
    // mp4 ,
    // mp3
    // html , md , txt , json
    // js , css
    let ext = this.getExt()

    switch (ext) {
      case '*.jpeg' || '*.jpg' || 'gif':
        return 'image'
      default:
        return 'unknown'
    }
  }

  isDisk() {
    return this.objPath.name === '' && this.objPath.dir === this.objPath.root
  }

  getParents(): Path[] {
    return this.toArrayOfPaths().slice(0, -1)
  }

  __basename() {
    return this.isDisk() ? this.path : basename(this.path)
  }

  __dirname() {
    return dirname(this.path)
  }

  toString() {
    return this.path
  }

  toArrayofNames(): string[] {
    return this.path.split(sep).slice(0, -1)
  }

  toArrayOfPaths(): Path[] {
    let reducer = ''
    let r: Path[] = []
    const ar = this.toArrayofNames()
    for (let i = 0; i < ar.length; i++) {
      reducer += ar[i]
      reducer += sep
      r.push(new Path(normalize(reducer)))
    }
    return r
  }
}

enum FileType {
  unknown = 0,
  audio = 1,
  image = 2,
  video = 3,
  font = 4,
  // txt , md
  text = 5
}
