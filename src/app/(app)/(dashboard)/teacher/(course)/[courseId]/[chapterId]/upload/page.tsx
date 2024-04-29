"use client";
import Tag from "@/app/components/Tag/Tag";
import {
  IconCircleMinus,
  IconFolderSearch,
  IconMovie,
  IconUpload,
} from "@tabler/icons-react";

import { useState, useCallback } from "react";
import TableRow from "./_components/TableRow";
import { useDropzone } from "react-dropzone";
import { getSignedURL, deleteLesson } from "./_components/actions";
import { Breadcrumb } from "@/app/components/Breadcrumb";
import Link from "next/link";

export default function Home({
  params,
}: {
  params: { courseId: string; chapterId: string };
}) {
  const [files, setFiles] = useState<any[]>([]);
  const [loading, setLoading] = useState<{ index: number; loading: boolean }[]>(
    [],
  );
  const computeSHA256 = async (file: File) => {
    const buffer = await file.arrayBuffer();
    const hashBuffer = await crypto.subtle.digest("SHA-256", buffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
    return hashHex;
  };

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      acceptedFiles.forEach(async (file, index) => {
        loading.push({ index, loading: true });
        setLoading([...loading]);
        const reader = new FileReader();
        reader.onabort = () => console.log("file reading was aborted");
        reader.onerror = () => console.log("file reading has failed");

        const signedURLResult = await getSignedURL({
          fileSize: file.size,
          fileType: file.type,
          checksum: await computeSHA256(file),
          courseId: params.courseId,
          chapterId: params.chapterId,
          title: file.name,
          duration: 0,
        });
        if (signedURLResult.failure !== undefined) {
          throw new Error(signedURLResult.failure);
        }
        const { url, lessonId, videoId } = signedURLResult.success;
        reader.onload = () => {
          let newFile = {
            ...file,
            name: file.name,
            src: URL.createObjectURL(file),
            size: file.size,
            type: file.type,
            duration: "",
            lessonId,
            videoId,
          };
          setFiles((prev) => [...prev, newFile]);
        };
        reader.readAsArrayBuffer(file);
        await fetch(url, {
          method: "PUT",
          headers: {
            "Content-Type": file.type,
          },
          body: file,
        });
        const deletedIndex = loading.findIndex((item) => item.index === index);

        loading[deletedIndex] = { index: deletedIndex, loading: false };
        setLoading([...loading]);
      });
    },
    [params.chapterId, params.courseId, loading],
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const removeFile = async (id: string) => {
    const deletedIndex = files.findIndex((item) => item.lessonId === id);

    // removes it from the array if the lesson already exists
    if (deletedIndex > -1) {
      let filteredFiles = files.filter(
        (value, i: number) => i !== deletedIndex,
      );
      const newFiles = [...filteredFiles];

      setFiles([...newFiles]);
      await deleteLesson(id);
    }
  };

  return (
    <div className="px-24 py-8 border-t border-[#1f1f1f]/10 dark:border-[#363636]">
      <div className="flex items-center justify-between border-b border-[#1f1f1f]/10 dark:border-[#363636] py-4 px-4">
        <Breadcrumb.Root
          courseId={params.courseId}
          chapterId={params.chapterId}
        />
        <div className="flex gap-1.5 pl-3 border-l border-[#1f1f1f]/10 dark:border-[#363636]">
          <button onClick={() => setFiles([])}>
            <Tag
              name="Apagar tudo"
              startContent={
                <IconCircleMinus className="w-5 h-5 text-zinc-500 dark:text-zinc-400" />
              }
            />
          </button>
          <Link href={`/teacher/${params.courseId}/${params.chapterId}`}>
            <button disabled={files.length < 0}>
              <Tag
                name="Adicionar tudo"
                startContent={
                  <IconUpload className="w-5 h-5 text-zinc-500 dark:text-zinc-400" />
                }
              />
            </button>
          </Link>
        </div>
      </div>

      {files.length > 0 && (
        <div className="relative overflow-x-visible shadow-md rounded-lg mt-4">
          <table className="w-full text-sm text-left rtl:text-right text-zinc-500 dark:text-zinc-400">
            <thead className="text-xs text-zinc-700 uppercase bg-zinc-50 dark:bg-zinc-900 dark:text-zinc-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Aula
                </th>
                <th scope="col" className="px-6 py-3">
                  Duração
                </th>
                <th scope="col" className="px-6 py-3">
                  Tamanho
                </th>
                <th scope="col" className="px-6 py-3">
                  Estado
                </th>
                <th scope="col" className="px-6 py-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {files.map((file, index) => (
                <TableRow
                  file={file}
                  key={file.lessonId}
                  onClick={removeFile}
                  loading={loading[index].loading}
                />
              ))}
            </tbody>
          </table>
        </div>
      )}
      <div className="rounded-lg mt-2 w-full flex items-center justify-center ">
        <div
          className="flex items-center justify-center w-full"
          {...getRootProps()}
        >
          <label
            htmlFor="dropzone-file"
            className="flex flex-col items-center justify-center w-full h-96 border-2 border-zinc-300 border-dashed rounded-lg cursor-pointer bg-zinc-50 dark:hover:bg-zinc-900 dark:bg-zinc-950 hover:bg-zinc-100 dark:border-zinc-800 dark:hover:border-zinc-700 "
          >
            {!isDragActive ? (
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <IconFolderSearch className="w-8 h-8 mb-4 text-zinc-600 dark:text-zinc-300" />
                <p className="mb-2 text-sm text-zinc-500 dark:text-zinc-400">
                  <span className="font-semibold">Arraste os videos aqui</span>{" "}
                  ou clique para selecionar manualmente
                </p>
                <p className="text-xs text-zinc-500 dark:text-zinc-500">
                  MP4, MOV, AVI, WMV, AVCHD, WebM ou FLV (MAX. 600MB)
                </p>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <IconMovie className="w-8 h-8 mb-4 text-zinc-600 dark:text-zinc-300" />
                <p className="mb-2 text-sm text-zinc-500 dark:text-zinc-400">
                  <span className="font-semibold">Large os videos aqui</span>
                </p>
                <p className="text-xs text-zinc-500 dark:text-zinc-500"></p>
              </div>
            )}

            <input
              id="dropzone-file"
              type="file"
              className="hidden"
              {...getInputProps()}
              accept="video/mp4,video/x-m4v,video/*"
            />
          </label>
        </div>
      </div>
    </div>
  );
}
