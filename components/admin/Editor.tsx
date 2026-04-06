import { useMemo, useState, useRef, useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import { Table } from "@tiptap/extension-table";
import TableRow from "@tiptap/extension-table-row";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import Youtube from "@tiptap/extension-youtube";
import { 
  Bold, 
  Italic, 
  List, 
  ListOrdered, 
  Quote, 
  Undo, 
  Redo, 
  Link as LinkIcon, 
  Image as ImageIcon,
  Type,
  Code,
  Heading1,
  Heading2,
  Table as TableIcon,
  Youtube as YoutubeIcon,
  X,
  Check
} from "lucide-react";

interface EditorProps {
  content: string;
  onChange: (content: string) => void;
}

type ToolType = 'link' | 'image' | 'youtube' | null;

const MenuBar = ({ editor }: { editor: any }) => {
  const [activeTool, setActiveTool] = useState<ToolType>(null);
  const [urlInput, setUrlInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  if (!editor) return null;

  const handleToolClick = (tool: ToolType) => {
    if (activeTool === tool) {
      setActiveTool(null);
      setUrlInput("");
    } else {
      setActiveTool(tool);
      const prevUrl = tool === 'link' ? editor.getAttributes('link').href : "";
      setUrlInput(prevUrl || "");
      // Focus input on next tick
      setTimeout(() => inputRef.current?.focus(), 10);
    }
  };

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    
    if (!urlInput) {
      if (activeTool === 'link') {
        editor.chain().focus().extendMarkRange('link').unsetLink().run();
      }
      setActiveTool(null);
      return;
    }

    if (activeTool === 'link') {
      editor.chain().focus().extendMarkRange('link').setLink({ href: urlInput }).run();
    } else if (activeTool === 'image') {
      editor.chain().focus().setImage({ src: urlInput }).run();
    } else if (activeTool === 'youtube') {
      editor.chain().focus().setYoutubeVideo({ src: urlInput }).run();
    }

    setUrlInput("");
    setActiveTool(null);
    editor.chain().focus().run();
  };

  return (
    <div className="border-b border-gray-100 bg-gray-50/50 sticky top-0 z-10">
      <div className="flex flex-wrap gap-1 p-2">
        <button
          type="button"
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editor.can().chain().focus().toggleBold().run()}
          className={cn("p-2 rounded-lg hover:bg-gray-200 transition-colors", editor.isActive("bold") ? "bg-gray-200 text-brand" : "text-gray-500")}
        >
          <Bold size={18} />
        </button>
        <button
          type="button"
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editor.can().chain().focus().toggleItalic().run()}
          className={cn("p-2 rounded-lg hover:bg-gray-200 transition-colors", editor.isActive("italic") ? "bg-gray-200 text-brand" : "text-gray-500")}
        >
          <Italic size={18} />
        </button>
        <div className="w-px h-6 bg-gray-200 mx-1 my-auto"></div>
        <button
          type="button"
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={cn("p-2 rounded-lg hover:bg-gray-200 transition-colors", editor.isActive("heading", { level: 1 }) ? "bg-gray-200 text-brand" : "text-gray-500")}
        >
          <Heading1 size={18} />
        </button>
        <button
          type="button"
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={cn("p-2 rounded-lg hover:bg-gray-200 transition-colors", editor.isActive("heading", { level: 2 }) ? "bg-gray-200 text-brand" : "text-gray-500")}
        >
          <Heading2 size={18} />
        </button>
        <div className="w-px h-6 bg-gray-200 mx-1 my-auto"></div>
        <button
          type="button"
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={cn("p-2 rounded-lg hover:bg-gray-200 transition-colors", editor.isActive("bulletList") ? "bg-gray-200 text-brand" : "text-gray-500")}
        >
          <List size={18} />
        </button>
        <button
          type="button"
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={cn("p-2 rounded-lg hover:bg-gray-200 transition-colors", editor.isActive("orderedList") ? "bg-gray-200 text-brand" : "text-gray-500")}
        >
          <ListOrdered size={18} />
        </button>
        <button
          type="button"
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={cn("p-2 rounded-lg hover:bg-gray-200 transition-colors", editor.isActive("blockquote") ? "bg-gray-200 text-brand" : "text-gray-500")}
        >
          <Quote size={18} />
        </button>
        <div className="w-px h-6 bg-gray-200 mx-1 my-auto"></div>
        <button
          type="button"
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => handleToolClick('link')}
          className={cn("p-2 rounded-lg hover:bg-gray-200 transition-colors", (editor.isActive("link") || activeTool === 'link') ? "bg-gray-200 text-brand" : "text-gray-500")}
        >
          <LinkIcon size={18} />
        </button>
        <button
          type="button"
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => handleToolClick('image')}
          className={cn("p-2 rounded-lg hover:bg-gray-200 transition-colors", activeTool === 'image' ? "bg-gray-200 text-brand" : "text-gray-500")}
        >
          <ImageIcon size={18} />
        </button>
        <button
          type="button"
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => handleToolClick('youtube')}
          className={cn("p-2 rounded-lg hover:bg-gray-200 transition-colors", activeTool === 'youtube' ? "bg-gray-200 text-brand" : "text-gray-500")}
        >
          <YoutubeIcon size={18} />
        </button>
        <div className="w-px h-6 bg-gray-200 mx-1 my-auto"></div>
        <button
          type="button"
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().chain().focus().undo().run()}
          className="p-2 rounded-lg hover:bg-gray-200 transition-colors text-gray-500 disabled:opacity-30"
        >
          <Undo size={18} />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().chain().focus().redo().run()}
          className="p-2 rounded-lg hover:bg-gray-200 transition-colors text-gray-500 disabled:opacity-30"
        >
          <Redo size={18} />
        </button>
      </div>

      {activeTool && (
        <div className="px-4 py-3 bg-white border-t border-gray-100 flex items-center gap-3 animate-in fade-in slide-in-from-top-1 duration-200">
          <div className="text-xs font-bold text-gray-400 uppercase tracking-wider w-16">
            {activeTool}
          </div>
          <div className="flex-1 flex gap-2">
            <input
              ref={inputRef}
              type="text"
              placeholder={`Enter ${activeTool} URL...`}
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              className="flex-1 bg-gray-50 border-none focus:ring-0 text-sm py-1 px-3 rounded-md"
              onKeyDown={(e) => {
                if (e.key === 'Escape') setActiveTool(null);
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleSubmit();
                }
              }}
            />
            <button
              type="button"
              onClick={() => handleSubmit()}
              className="p-1 px-2 bg-brand text-white rounded-md hover:bg-brand/90 transition-colors flex items-center gap-1 text-xs font-medium"
            >
              <Check size={14} /> Apply
            </button>
            <button
              type="button"
              onClick={() => setActiveTool(null)}
              className="p-1 px-2 bg-gray-100 text-gray-500 rounded-md hover:bg-gray-200 transition-colors flex items-center gap-1 text-xs font-medium"
            >
              <X size={14} /> Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export function Editor({ content, onChange }: EditorProps) {
  const extensions = useMemo(() => [
    StarterKit,
    Link.configure({ 
      openOnClick: false,
      HTMLAttributes: {
        class: 'text-brand underline decoration-brand/30 hover:decoration-brand transition-all cursor-pointer'
      }
    }),
    Image.configure({ inline: true, HTMLAttributes: { class: 'rounded-xl shadow-lg my-8 mx-auto block max-w-full' } }),
    Table.configure({ resizable: true }),
    TableRow,
    TableHeader,
    TableCell,
    Youtube.configure({ width: 840, height: 480, HTMLAttributes: { class: 'rounded-xl shadow-lg my-8 mx-auto aspect-video max-w-full' } }),
  ], []);

  const editor = useEditor({
    extensions,
    content,
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: "prose prose-lg max-w-none focus:outline-none min-h-[500px] p-6 font-hindi prose-p:leading-[1.8] prose-brand prose-img:rounded-xl",
      },
    },
  });

  return (
    <div className="border border-gray-100 rounded-2xl overflow-hidden bg-white focus-within:ring-2 focus-within:ring-brand/10 focus-within:border-brand transition-all">
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}

