"use client"

import React from 'react'

import ReactPlayer from 'react-player'
function Player({video}: {video:string}) {
  return (
    <div className="flex">
      <ReactPlayer controls width={1022} height={601} url={video } />
    </div>
  )
}

export default Player