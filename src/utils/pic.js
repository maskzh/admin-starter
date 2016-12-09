const defaultUrl = ''
const prefix = '//img.jkbsimg.com/'

export default function pic(url) {
  if (!url) return prefix + defaultUrl
  if (url.indexOf('http') === -1) return prefix + url
  return url
}
