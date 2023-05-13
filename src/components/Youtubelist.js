import React, { useState , useRef , useEffect } from 'react';
import Header  from './Header';
import Button from 'react-bootstrap/Button';
import { useHistory , Link } from 'react-router-dom';
import Singlevideo from './Singlevideo';


const axios = require('axios').default;
const { io } = require("socket.io-client");
const socket = io(process.env.REACT_APP_BACKEND_URL);




export default function Youtubelist() {
 
    let legthjson = [
        {
            "kind": "youtube#searchResult",
            "etag": "FfJnLu9XLB5yzF9_wUDEW2qZ5Lg",
            "id": {
                "kind": "youtube#video",
                "videoId": "0TLKAmQJJqA"
            },
            "snippet": {
                "publishedAt": "2022-07-17T09:45:46Z",
                "channelId": "UC7mD7J_EwzdhApEDQCaxJow",
                "title": "💍+🌈=? #shorts",
                "description": "shorts.",
                "thumbnails": {
                    "default": {
                        "url": "https://i.ytimg.com/vi/0TLKAmQJJqA/default.jpg",
                        "width": 120,
                        "height": 90
                    },
                    "medium": {
                        "url": "https://i.ytimg.com/vi/0TLKAmQJJqA/mqdefault.jpg",
                        "width": 320,
                        "height": 180
                    },
                    "high": {
                        "url": "https://i.ytimg.com/vi/0TLKAmQJJqA/hqdefault.jpg",
                        "width": 480,
                        "height": 360
                    }
                },
                "channelTitle": "Helena's Craft",
                "liveBroadcastContent": "none",
                "publishTime": "2022-07-17T09:45:46Z"
            }
        },
        {
            "kind": "youtube#searchResult",
            "etag": "lRNfkmPfiSYLaCuDYx_lvmO4GLQ",
            "id": {
                "kind": "youtube#video",
                "videoId": "ti7shLg5Opo"
            },
            "snippet": {
                "publishedAt": "2022-02-05T09:41:06Z",
                "channelId": "UCzZG860wco0uK0J1GUJ1FkQ",
                "title": "Ye feature to mast hai maruti ka 👍",
                "description": "sanscarisumit #shorts #knowledge #carcare.",
                "thumbnails": {
                    "default": {
                        "url": "https://i.ytimg.com/vi/ti7shLg5Opo/default.jpg",
                        "width": 120,
                        "height": 90
                    },
                    "medium": {
                        "url": "https://i.ytimg.com/vi/ti7shLg5Opo/mqdefault.jpg",
                        "width": 320,
                        "height": 180
                    },
                    "high": {
                        "url": "https://i.ytimg.com/vi/ti7shLg5Opo/hqdefault.jpg",
                        "width": 480,
                        "height": 360
                    }
                },
                "channelTitle": "sansCARi sumit",
                "liveBroadcastContent": "none",
                "publishTime": "2022-02-05T09:41:06Z"
            }
        },
        {
            "kind": "youtube#searchResult",
            "etag": "lTA1R-l9ECw9Gx_EociFNL1hx0s",
            "id": {
                "kind": "youtube#video",
                "videoId": "lQW5I5tCy28"
            },
            "snippet": {
                "publishedAt": "2018-03-17T14:00:03Z",
                "channelId": "UCM1LVD5a5509fzL-4khritA",
                "title": "🎥 VERONICA (2017) | Full Movie Trailer in Full HD | 1080p",
                "description": "Madrid, 1991. A teen girl finds herself besieged by an evil supernatural force after she played Ouija with two classmates.",
                "thumbnails": {
                    "default": {
                        "url": "https://i.ytimg.com/vi/lQW5I5tCy28/default.jpg",
                        "width": 120,
                        "height": 90
                    },
                    "medium": {
                        "url": "https://i.ytimg.com/vi/lQW5I5tCy28/mqdefault.jpg",
                        "width": 320,
                        "height": 180
                    },
                    "high": {
                        "url": "https://i.ytimg.com/vi/lQW5I5tCy28/hqdefault.jpg",
                        "width": 480,
                        "height": 360
                    }
                },
                "channelTitle": "TRAILER CITY",
                "liveBroadcastContent": "none",
                "publishTime": "2018-03-17T14:00:03Z"
            }
        },
        {
            "kind": "youtube#searchResult",
            "etag": "7wSLsThyqRtJ8slHf5CLxaoquTY",
            "id": {
                "kind": "youtube#video",
                "videoId": "RCIDz5D5zVs"
            },
            "snippet": {
                "publishedAt": "2014-12-15T11:10:00Z",
                "channelId": "UC3ar28GS6o1p0m_wabfk2zw",
                "title": "Tathagatha Buddha | Full Movie | Sunil Sharma, Kausha Rach, Suman | HD 1080p | English Subtitles",
                "description": "SYNOPSIS: Initially released in 2007 by Dharmapatha Creations, the film tells the story of Siddhartha Gautama, Prince of ...",
                "thumbnails": {
                    "default": {
                        "url": "https://i.ytimg.com/vi/RCIDz5D5zVs/default.jpg",
                        "width": 120,
                        "height": 90
                    },
                    "medium": {
                        "url": "https://i.ytimg.com/vi/RCIDz5D5zVs/mqdefault.jpg",
                        "width": 320,
                        "height": 180
                    },
                    "high": {
                        "url": "https://i.ytimg.com/vi/RCIDz5D5zVs/hqdefault.jpg",
                        "width": 480,
                        "height": 360
                    }
                },
                "channelTitle": "Pen Movies",
                "liveBroadcastContent": "none",
                "publishTime": "2014-12-15T11:10:00Z"
            }
        },
        {
            "kind": "youtube#searchResult",
            "etag": "e1T9yTA71EFoprBlChkK-tdbmXc",
            "id": {
                "kind": "youtube#video",
                "videoId": "LXXkiUKDK4w"
            },
            "snippet": {
                "publishedAt": "2014-09-26T09:38:00Z",
                "channelId": "UC3ar28GS6o1p0m_wabfk2zw",
                "title": "Entertainment | Full Movie | Akshay Kumar, Tamannaah Bhatia, Johnny Lever",
                "description": "SYNOPSIS: Akhil, an underdog and a failure, comes to know that his real father is a rich diamond merchant who has just passed ...",
                "thumbnails": {
                    "default": {
                        "url": "https://i.ytimg.com/vi/LXXkiUKDK4w/default.jpg",
                        "width": 120,
                        "height": 90
                    },
                    "medium": {
                        "url": "https://i.ytimg.com/vi/LXXkiUKDK4w/mqdefault.jpg",
                        "width": 320,
                        "height": 180
                    },
                    "high": {
                        "url": "https://i.ytimg.com/vi/LXXkiUKDK4w/hqdefault.jpg",
                        "width": 480,
                        "height": 360
                    }
                },
                "channelTitle": "Pen Movies",
                "liveBroadcastContent": "none",
                "publishTime": "2014-09-26T09:38:00Z"
            }
        }
    ]

  
     const apis_key = [ process.env.REACT_APP_FIRST_API ,
        process.env.REACT_APP_SECOND_API   , process.env.REACT_APP_THIRD_API , 
        process.env.REACT_APP_FOURTH_API ,  process.env.REACT_APP_FIFTH_API]

    const [youtubevideos , setYoutubevideos] = useState([])
    const [value, setValue] = useState("punjabimusic")
    const [classval, setclassval] = useState("myGallery")
    const history = useHistory();
    const search_api =  async (search) => {
        for (let index = 0; index < 5; index++) {
           
            let resultcame = false;
            await axios.get("https://www.googleapis.com/youtube/v3/search?&maxResults=50&part=snippet&key="+apis_key[index]+"&type=video&q="+search+"&videoEmbeddable=true")
                  .then(function (response) {
                      console.log('inside loop')
                      if(response.status == 200){
                      resultcame = true
                         console.log('response came')
                         console.log(response)
                            setclassval("myGallery")
                            setYoutubevideos(response.data.items);
                              if(value =="punjabimusic"){
                                localStorage.setItem('youtuberesponse', JSON.stringify(response.data.items));
                              }
                       
                              // setYoutubevideos(legthjson);
                         
                                 localStorage.setItem('keyid',index )
                              //    break;
                              }
                          ////////////console.log(string.replace('https://', '').split("/").slice(-1)[0] );
                          })
                      .catch(function (error) {
                          ////////////console.log(error);
                      })
                      .then(function () {
                          // always executed
                  });
                  if(resultcame == true){
                    break;
                  }
             }
    }

    const clicked = (id) => {
        console.log(id)
         
        axios.post(process.env.REACT_APP_BACKEND_URL+'/update_url', {
            url: id,
            groupcode: localStorage.getItem("groupcode")
          })
          .then(function (response) {
            console.log(response)
            //  setShow(true);
            //  setGroupcode(response.data.group_code)
            //  localStorage.setItem("groupcode", response.data.group_code);
            // //  localStorage.setItem("user_id", 'host'+response.data.group_code);
            //  localStorage.setItem("username", 'Host');
            //  props.token(response.data.group_code)
             socket.emit('refresh_page', {type: "1" , group_code: localStorage.getItem('groupcode')});
             history.push('/videopage')
          })
          .catch(function (error) {
            console.log(error);
          });
    }

    const handleClick = () => {
        setYoutubevideos([])
        setclassval("myGallery spinner-border text-light")
        search_api(value)
    }

   

    useEffect(() => {
        setclassval("myGallery spinner-border text-light")
        if(localStorage.getItem('youtuberesponse')){
            setclassval("myGallery")
            setYoutubevideos(JSON.parse(localStorage.getItem('youtuberesponse')));
        }else{
            search_api(value)
        }

        // search_api(value)
    //    let datass =  search_api(apis_key[2])
    //    console.log(datass)
       
    }, []);



  return (
           <>
             <div className='container'>
                <div className="row justify-content-center top-input">
                <div className="col-1">
                           
                    </div>
                    
                    <div className="col-7">
                            <div className="mb-3 ">
                                <input type="email" className="form-control" onChange={(e) => {setValue(e.target.value)}}  aria-describedby="emailHelp"/>
                            </div>
                    </div>
                    <div className="col-4">
                                <div className="align_search">
                                    <Button  onClick={handleClick} variant="primary" >
                                                Search
                                    </Button>
                                </div>
                    </div>
                </div>  
                </div>
            <div className={classval}>
                <Singlevideo  youtubevideos={youtubevideos}  clicked={clicked}  />  
            </div>
            </>
  )
}
