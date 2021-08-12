export function getExtentionfromPath(pathString) {
  const re = /(?:\.([^.]+))?$/
  const ext = re.exec(pathString)[1]
  return ext
}

export function getFileNameFromPath(pathString) {
  if (!pathString) return false
  const a = pathString.split('\\')
  const last = a.pop()
  if (last === '') return a.pop()
  else return last
}

export function getFileTypeFromPath(pathString) {
  const EXT = getExtentionfromPath(pathString)
  switch (EXT) {
    case '':
      return 'folder'
    case 'gif':
    case 'svg':
    case 'jpeg':
    case 'jpg':
    case 'ico':
    case 'apng':
    case 'avif':
    case 'png':
    case 'webp':
      return 'image'
    case 'mp4':
    case 'ogg':
    case 'wav':
    case 'webm':
      return 'video'
    case 'mp3':
    case 'flacc':
      return 'audio'
    case 'txt':
    case 'md':
    case 'ts':
    case 'sass':
    case 'scss':
    case 'json':
    case 'js':
    case 'css':
    case 'php':
    case 'java':
    case 'py':
    case 'sql':
    case 'asp':
    case 'htm':
    case 'xhtml':
    case 'xml':
    case 'jsp':
    case 'pl':
    case 'rb':
    case 'rhtml':
    case 'rss':
    case 'coffe':
    case 'cake':
    case 'html':
      return 'text'
    default:
      return 'unknown'
  }
}

export function getTreeFromPath(path) {
  const s = path
  const a = s.split('\\')
  const paths = []
  // remove empty last column if exists
  if (a[a.length - 1] === '') a.pop()

  let reducer = a[0] + '\\'
  paths.push(reducer)
  for (let i = 1; i < a.length; i++) {
    if (i !== 1) reducer += '\\'
    reducer += a[i]
    paths.push(reducer)
  }
  return paths
}
