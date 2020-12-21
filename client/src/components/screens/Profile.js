import React, { useEffect, useState, useContext } from 'react'
import { UserContext } from '../../App'

const Profile = () => {
    const [mypics, setPics] = useState([])
    const { state, dispatch } = useContext(UserContext)
    const [image, setImage] = useState("")
    const [url, setUrl] = useState("")
    // console.log(state)
    useEffect(() => {
        fetch('/mypost', {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            }
        }).then(res => res.json())
            .then(result => {
                console.log(result)
                setPics(result.mypost)
            })
    }, []) //empty dependancy array

    useEffect(() => {
        if (image) {
            const data = new FormData()
            data.append("file", image)
            data.append("upload_preset", "instagram-clone")
            data.append("cloud_name", "db957qd0z")
            fetch("https://api.cloudinary.com/v1_1/db957qd0z/image/upload", {
                method: "post",
                body: data
            }).then(res => res.json())
            .then(data => {
                    setUrl(data.url)
                    // console.log(data)
                    // localStorage.setItem("user",JSON.stringify({...state,pic:data.url}))
                    // dispatch({type:"UPDATEPIC",payload:data.url})
                    fetch('/updatepic',{
                        method:"put",
                        headers:{
                            "Content-Type":"application/json",
                            "Authorization":"Bearer "+localStorage.getItem("jwt")
                        },
                        body: JSON.stringify({
                            pic:data.url    //data.url
                        })
                    }).then(res=>res.json())
                    .then(result=>{
                        console.log(result)
                        localStorage.setItem("user",JSON.stringify({...state,pic:result.pic}))  //result.pic
                        dispatch({type:"UPDATEPIC",payload:result.pic}) //result.pic
                        // window.location.reload()
                    })
                    // window.location.reload()
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }, [image])

    const updatePhoto = (file) => {
        setImage(file)
    }

    return (
        <div style={{ maxWidth: "550px", margin: "0px auto" }}>
            <div style={{
                margin: "18px 0px",
                borderBottom: "1px solid grey"
            }}>
                <div style={{
                    display: "flex",
                    justifyContent: "space-around",
                }}>
                    <div>
                        <img style={{ width: "160px", height: "160px", borderRadius: "80px" }}
                            src={state ? state.pic : "loading"}
                        />
                    </div>
                    <div>
                        <h4>{state ? state.name : "loading"}</h4>
                        <h6>{state ? state.email : "loading"}</h6>
                        <div style={{ display: "flex", justifyContent: "space-between", width: "108%" }}>
                            <h6>{mypics.length} Posts</h6>
                            <h6>{state ? state.followers.length : "0"} Followers</h6>
                            <h6>{state ? state.following.length : "0"} Following</h6>
                        </div>
                    </div>
                </div>
                {/* <button className="btn waves-effect waves-light #64b5f6 blue darken-1" 
                style={{margin: "10px 0px 10px 48px"}}
                onClick={()=>{
                    updatePhoto()
                }}
                >Update Profile
            </button> */}
                <div className="file-field input-field" style={{ margin: "10px" }}>
                    <div className="btn #64b5f6 blue darken-1">
                        <span>Update Profile</span>
                        <input type="file" onChange={(e) => updatePhoto(e.target.files[0])} />
                    </div>
                    <div className="file-path-wrapper">
                        <input className="file-path validate" type="text" />
                    </div>
                </div>
            </div>
            <div className="gallery">
                {
                    mypics.map(item => {
                        return (
                            <img key={item._id} className="item" src={item.photo} alt={item.title} />
                        )
                    })
                }
                {/* <img className="item" src="https://images.unsplash.com/photo-1552607676-17f088307dce?ixid=MXwxMjA3fDB8MHxzZWFyY2h8NTB8fHBlcnNvbnxlbnwwfDJ8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" />
                <img className="item" src="https://images.unsplash.com/photo-1552607676-17f088307dce?ixid=MXwxMjA3fDB8MHxzZWFyY2h8NTB8fHBlcnNvbnxlbnwwfDJ8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" />
                <img className="item" src="https://images.unsplash.com/photo-1552607676-17f088307dce?ixid=MXwxMjA3fDB8MHxzZWFyY2h8NTB8fHBlcnNvbnxlbnwwfDJ8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" />
                <img className="item" src="https://images.unsplash.com/photo-1552607676-17f088307dce?ixid=MXwxMjA3fDB8MHxzZWFyY2h8NTB8fHBlcnNvbnxlbnwwfDJ8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" />
                <img className="item" src="https://images.unsplash.com/photo-1552607676-17f088307dce?ixid=MXwxMjA3fDB8MHxzZWFyY2h8NTB8fHBlcnNvbnxlbnwwfDJ8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" />
                <img className="item" src="https://images.unsplash.com/photo-1552607676-17f088307dce?ixid=MXwxMjA3fDB8MHxzZWFyY2h8NTB8fHBlcnNvbnxlbnwwfDJ8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" /> */}
            </div>
        </div>
    )
}

export default Profile