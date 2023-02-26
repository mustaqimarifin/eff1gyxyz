/* eslint-disable react/display-name */
import React, {
  FC,
  forwardRef,
  ReactNode,
  useImperativeHandle,
  useState,
} from "react";
import { IconBold, IconCode, IconItalic } from "@supabase/ui";
import { useEditor, EditorContent } from "@tiptap/react";
import clsx from "clsx";
import Link from "@tiptap/extension-link";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
//import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import { Editor as TT } from "@tiptap/core";

//import styles from './Editor.module.css';
// @ts-ignore
//import { lowlight } from 'lowlight';
//import { useCommentsContext } from './CommentsProvider';

interface EditorProps {
  defaultValue: string;
  onChange?: (value: string) => void;
  readOnly?: boolean;
  autofocus?: boolean;
  actions?: any;
  ref?: any;
}

export interface EditorRefHandle {
  editor: () => TT | null;
}

const Editor: FC<EditorProps> = forwardRef(
  (
    {
      defaultValue,
      onChange,
      readOnly = false,
      autofocus = false,
      actions = null,
    },
    ref
  ) => {
    const extensions: any[] = [
      StarterKit.configure({
        bulletList: false,
        orderedList: false,
      }),
      Placeholder.configure({
        placeholder: "Write a message...",
      }),

      Link.configure({
        HTMLAttributes: {
          class: "tiptap-link",
        },
        openOnClick: false,
      }),
    ];

    const editor = useEditor({
      editable: !readOnly,
      extensions,
      content: defaultValue,
      onUpdate: ({ editor }) => {
        onChange?.(editor.getHTML());
      },
      autofocus: autofocus ? "end" : false,
      editorProps: {
        attributes: {
          class: "tiptap-editor",
        },
      },
    });

    useImperativeHandle(ref, () => ({
      editor: () => {
        return editor;
      },
    }));

    const activeStyles = "bg-alpha-10";

    return (
      <div
        className={clsx(
          readOnly ? "tt-viewer" : "tt-editor",
          "tiptap-editor text-alpha-80 border-alpha-10 rounded-md"
        )}
      >
        <EditorContent
          className={clsx("h-full", readOnly ? null : "pb-8")}
          editor={editor}
        />
        {!readOnly && (
          <div
            className={clsx(
              "border-t-2 border-alpha-10",
              "absolute bottom-0 left-0 right-0 flex items-center h-8 z-10"
            )}
          >
            <div
              className={"grid w-8 h-full place-items-center cursor-pointer"}
              onMouseDown={(e) => {
                editor?.chain().focus().toggleBold().run();
                e.preventDefault();
              }}
              title="Bold"
            >
              <IconBold
                className={clsx(
                  "h-6 w-6 p-1.5 font-bold rounded-full",
                  editor?.isActive("bold") && activeStyles
                )}
              />
            </div>
            <div
              className={"grid w-8 h-full place-items-center cursor-pointer"}
              onMouseDown={(e) => {
                editor?.chain().focus().toggleItalic().run();
                e.preventDefault();
              }}
              title="Italic"
            >
              <IconItalic
                className={clsx(
                  "h-6 w-6 p-1.5 font-bold rounded-full",
                  editor?.isActive("italic") && activeStyles
                )}
              />
            </div>
            <div
              className={"grid w-8 h-full place-items-center cursor-pointer"}
              onMouseDown={(e) => {
                editor?.chain().focus().toggleCodeBlock().run();
                e.preventDefault();
              }}
              title="Code Block"
            >
              <IconCode
                className={clsx(
                  "h-6 w-6 p-1.5 font-bold rounded-full",
                  editor?.isActive("codeBlock") && activeStyles
                )}
              />
            </div>

            <div className="flex-1" />
            <div>{actions}</div>
          </div>
        )}
      </div>
    );
  }
);

export default Editor;
