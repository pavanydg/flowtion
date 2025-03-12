"use client";

import "@blocknote/core/fonts/inter.css";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import { useCreateBlockNote } from "@blocknote/react";
import { useEdgeStore } from "@/lib/edgestore";
import { useTheme } from "next-themes";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { PartialBlock } from "@blocknote/core";

interface EditorProps {
    onChange: (value: string) => void;
    initialContent?: string;
    editable?: boolean;
    documentId: Id<"documents">
}

export const Editor = ({ editable, documentId }: EditorProps) => {
    const { resolvedTheme } = useTheme();
    const { edgestore } = useEdgeStore();

    const document = useQuery(api.documents.getById, {
        documentId
    });

    let initialContent: PartialBlock[] | undefined;
    
    if (document?.content) {
        try {
            initialContent = JSON.parse(document.content);
        } catch (error) {
            console.error("Error parsing document content:", error);
        }
    }

    const handleUpload = async (file: File) => {
        const response = await edgestore.publicFiles.upload({
            file,
        });
        return response.url;
    };

    const editor = useCreateBlockNote({
        initialContent: initialContent,
        uploadFile : handleUpload
    });

    const update = useMutation(api.documents.update);

    const updateDoc = (content: string) => {
        update({
            id: documentId,
            content
        });
    };

    if (!editor) {
        return <div>Loading editor...</div>;
    }

    return (
        <div>
            <BlockNoteView
                editor={editor}
                editable={editable}
                theme={resolvedTheme === "dark" ? "dark" : "light"}
                onChange={() => {
                    updateDoc(JSON.stringify(editor.document));
                }}
            />
        </div>
    );
};