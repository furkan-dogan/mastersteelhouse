'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { Bold, Italic, List, ListOrdered, Heading2, Heading3, Pilcrow } from 'lucide-react'
import { useEffect } from 'react'

type RichTextEditorProps = {
  value: string
  onChange: (html: string) => void
  placeholder?: string
}

export function RichTextEditor({ value, onChange, placeholder }: RichTextEditorProps) {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [StarterKit],
    content: value || '',
    onUpdate({ editor }) {
      const html = editor.getHTML()
      onChange(html === '<p></p>' ? '' : html)
    },
    editorProps: {
      attributes: {
        class: 'prose prose-sm max-w-none min-h-[140px] px-3 py-2 focus:outline-none text-sm text-foreground',
      },
    },
  })

  // Sync external value changes (e.g. product switch)
  useEffect(() => {
    if (!editor) return
    const current = editor.getHTML()
    const incoming = value || ''
    if (current !== incoming && !(current === '<p></p>' && incoming === '')) {
      editor.commands.setContent(incoming)
    }
  }, [value, editor])

  if (!editor) return null

  const toolbarBtn = (active: boolean) =>
    `h-7 w-7 flex items-center justify-center rounded text-sm transition ${
      active
        ? 'bg-foreground text-background'
        : 'text-muted-foreground hover:bg-muted hover:text-foreground'
    }`

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-background">
      <div className="flex flex-wrap gap-1 border-b border-border bg-muted/40 px-2 py-1.5">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={toolbarBtn(editor.isActive('bold'))}
          title="Kalın"
        >
          <Bold className="h-3.5 w-3.5" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={toolbarBtn(editor.isActive('italic'))}
          title="İtalik"
        >
          <Italic className="h-3.5 w-3.5" />
        </button>

        <div className="mx-1 w-px self-stretch bg-border" />

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={toolbarBtn(editor.isActive('heading', { level: 2 }))}
          title="Büyük Başlık"
        >
          <Heading2 className="h-3.5 w-3.5" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className={toolbarBtn(editor.isActive('heading', { level: 3 }))}
          title="Küçük Başlık"
        >
          <Heading3 className="h-3.5 w-3.5" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().setParagraph().run()}
          className={toolbarBtn(editor.isActive('paragraph'))}
          title="Normal Metin"
        >
          <Pilcrow className="h-3.5 w-3.5" />
        </button>

        <div className="mx-1 w-px self-stretch bg-border" />

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={toolbarBtn(editor.isActive('bulletList'))}
          title="Madde İşaretli Liste"
        >
          <List className="h-3.5 w-3.5" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={toolbarBtn(editor.isActive('orderedList'))}
          title="Numaralı Liste"
        >
          <ListOrdered className="h-3.5 w-3.5" />
        </button>
      </div>

      <EditorContent editor={editor} />

      {!value && (
        <p className="pointer-events-none absolute top-10.5 px-3 py-2 text-sm text-muted-foreground/60">
          {placeholder}
        </p>
      )}
    </div>
  )
}
