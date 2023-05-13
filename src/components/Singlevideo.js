import React from 'react'

export default function Singlevideo(props) {
   console.log('herererererere')
   console.log(props)
  return (
    <>
     {props.youtubevideos.map((videos) => { return(
      <div className='inside-gallery'  onClick={()=> props.clicked(videos.id.videoId)} >
          <img  className="img-fluid border border-secondary" src={videos.snippet.thumbnails.medium.url}/>
          <div><p className='title_p'>{videos.snippet.title}</p></div>
     </div>)
     })}  
        
    </>
    
  )
}
