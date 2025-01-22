"use client"

import { Cover } from "@/components/Cover";
import { Editor } from "@/components/Editor";
import { Toolbar } from "@/components/ToolBar";
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation, useQuery } from "convex/react";
import { useParams } from "next/navigation";

interface DocumentIdPageProps {
    params: {
        documentId: Id<"documents">;
    };
};


const DocumentIdPage = () => {
    const params = useParams();
    const documentId = params.documentId as Id<"documents">
    const document = useQuery(api.documents.getById, {
        documentId
    })

    const update = useMutation(api.documents.update);

    const onChange = (content: string) => {
        update({
            id: documentId,
            content
        })
    }

    if (document === undefined) {
        return (
          <div>
            <Cover.Skeleton />
            <div className="md:max-w-3xl lg:max-w-4xl mx-auto mt-10">
              <div className="space-y-4 pl-8 pt-4">
                <Skeleton className="h-14 w-[50%]" />
                <Skeleton className="h-4 w-[80%]" />
                <Skeleton className="h-4 w-[40%]" />
                <Skeleton className="h-4 w-[60%]" />
              </div>
            </div>
          </div>
        );
      }

    if (document === null) {
        return (
            <div>
                Not found
            </div>
        )
    }

    return (
        <div className="pb-40">
            <Cover url={document.coverImage} />
            <div className="md:max-w-3xl lg:max-w-4xl mx-auto">
                <Toolbar initialData={document} />
                <Editor 
                    onChange={onChange}
                    initialContent={document.content}
                    documentId={documentId}
                />
            </div>
        </div>
    )
};

export default DocumentIdPage;
