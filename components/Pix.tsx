import Image from 'next/image'
import React from 'react'

const DickPics = (props) => {
  const { src, alt, blurDataURL } = props
  return (
    <div className="drop-shadow-sm filter">
      <Image
        src={require(`../public/static/images/${src}`)}
        alt={alt}
        blurDataURL={blurDataURL}
        placeholder={'blur' || 'empty'}
        className=""
      />
    </div>
  )
}

export default DickPics
