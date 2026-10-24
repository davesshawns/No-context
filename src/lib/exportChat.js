import { getFontEmbedCSS, toPng } from 'html-to-image'

let fontCSS = null // embedded @font-face CSS, built once and reused

function slugify(text) {
  return (
    text
      .toLowerCase()
      .normalize('NFKD')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .slice(0, 40) || 'chat'
  )
}

// Turns the ExportCard node into a PNG and downloads it.
export async function exportChat(node, chat) {
  await document.fonts.ready
  if (!fontCSS) fontCSS = await getFontEmbedCSS(node)
  const dataUrl = await toPng(node, {
    pixelRatio: 2,
    cacheBust: true,
    backgroundColor: '#0a0a0c',
    fontEmbedCSS: fontCSS,
  })
  const a = document.createElement('a')
  a.href = dataUrl
  a.download = `no-context-${slugify(chat.name || chat.chatName)}.png`
  document.body.appendChild(a)
  a.click()
  a.remove()
}
