"use client";
import { trpc } from '@/app/_trpc/client';
import { IconPhoto, IconPhotoSearch } from '@tabler/icons-react'
import Image from 'next/image'
import React, { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { getSignedURL } from './actions';

interface AddImageProps{
  imageUrl: string | null,
  edit: boolean, 
  courseId: string
}




function AddImage({imageUrl, edit, courseId}: AddImageProps) {
  const [image, setImage] = useState<{image:File ,preview: string} | null>(null)
  const getCourse = trpc.course.getById.useQuery(courseId)


  const computeSHA256 = async (file: File) => {
    const buffer = await file.arrayBuffer()
    const hashBuffer = await crypto.subtle.digest("SHA-256", buffer)
    const hashArray = Array.from(new Uint8Array(hashBuffer))
    const hashHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("")
    return hashHex
  }
  const onDrop = useCallback(async (acceptedFiles:Array<File>) => {
    const file = acceptedFiles[0]

    acceptedFiles.forEach((files) => {
      const reader = new FileReader()

      reader.onabort = () => console.log('file reading was aborted')
      reader.onerror = () => console.log('file reading has failed')
      reader.onload = () => {
      
      const img = acceptedFiles.map((file) =>
      Object.assign(
        {
        image: file,
        preview: URL.createObjectURL(file),
      })
    )
      setImage(img[0]);
      
        
      }
      reader.readAsDataURL(files)
    })

    
    const signedURLResult = await getSignedURL({
      fileSize: file.size,
      fileType: file.type,
      checksum: await computeSHA256(file),
      courseId
    })
    if (signedURLResult.failure !== undefined) {
      throw new Error(signedURLResult.failure)
    }
    const { url } = signedURLResult.success
    const pet = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": file.type,
      },
      body: file,
    })
    
    if(pet.ok) getCourse.refetch()
  }
,[courseId, getCourse]) 
  
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})
  return (
    <div className="max-w-[546px] relative max-h-[310px]">
           {imageUrl || image !== null ? <Image src={image?.preview ? image.preview : imageUrl ?  imageUrl : '' } className="rounded-xl object-cover min-h-[310px] max-h-[310px]" width={546} height={408} alt="course" unoptimized /> : <div className="min-w-[546px] min-h-[310px]"></div> }
          
            
            {(edit || !image && !imageUrl ) && <div className="rounded-xl w-full flex items-center justify-center absolute top-0 bottom-0  h-full">
              <div className="flex items-center justify-center w-full " {...getRootProps()}>
                  <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full border-2 h-[310px] border-zinc-300 border-dashed rounded-xl cursor-pointer bg-zinc-50 dark:hover:bg-zinc-900/80 dark:bg-zinc-950/80 hover:bg-zinc-100 dark:border-zinc-700 dark:hover:border-zinc-600 ">
                    
                  {
                  !isDragActive ?
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <IconPhotoSearch className="w-8 h-8 mb-4 text-zinc-600 dark:text-zinc-300" />
                    <p className="mb-2 text-sm text-zinc-500 dark:text-zinc-400"><span className="font-semibold">Arraste a imagem aqui</span> ou clique para selecionar manualmente</p>
                    <p className="text-xs text-zinc-500 dark:text-zinc-500">PNG, JPEG, JPG, ou WEBP (MAX. 30MB)</p>
                  </div> 
                  :
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <IconPhoto className="w-8 h-8 mb-4 text-zinc-600 dark:text-zinc-300" />
                    <p className="mb-2 text-sm text-zinc-500 dark:text-zinc-400"><span className="font-semibold">Large os videos aqui</span></p>
                    <p className="text-xs text-zinc-500 dark:text-zinc-500"></p>
                  </div> 
                }
                  

                  
                      
                      <input id="dropzone-file" type="file" className="hidden" {...getInputProps()}/>
                  </label>
              </div> 
        
           </div>}
           
            
          
             </div>
  )
}

export default AddImage
