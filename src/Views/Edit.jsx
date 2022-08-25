import axios from "axios";
import { Link, useNavigate, useParams} from "react-router-dom";
import { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.css';

const Edit = () =>{
    const [ authorName, setAuthorName ] = useState("");
    const navigate = useNavigate();
    const {id} = useParams()
    const [authorError, setAuthorError] = useState("");
    const [creationStatus, setCreationStatus] = useState("");

    useEffect(()=>{
        axios.get(`http://127.0.0.1:8000/api/author/${id}`)
        .then(res =>{
            setAuthorName(res.data.authorName)
        })
        .catch(err => {
            console.log(err)
        })
    },[id])
    
    const GoToHome = () => {
        navigate('/')
    }
    
    const onSubmitHandler = (e) => {
        e.preventDefault();
        if(authorName.length>=3){
            axios.put(`http://127.0.0.1:8000/api/author/${id}`, {authorName})
            .then(res => {
                console.log(res)
                setAuthorError("");
                setCreationStatus("Author has been successfully updated")
                setTimeout(GoToHome,1000)
             })
        }else{
            if(authorName.length===0){
                setAuthorError("Error updating: Authors name is mandatory");
                setCreationStatus("");
            }else{
                setAuthorError("Error updating: Authors name must be at least 3 chars");
                setCreationStatus("");
            }
            
        }
    }

    return(
        <div className="container">
            <h1>Favorite Authors</h1>
            <Link to={"/"}>Home</Link>
            <p id="purpura">Edit this author</p>
            {
                authorName==null ? <p id="error">Oops! We Could not find the author you are looking for. <Link to={'/new'}>Clic here to add it</Link></p>:<p></p>
            }
            <div  className="container" >
                <form onSubmit={onSubmitHandler} className="info">
                   <div id="conteninfo">
                    <label htmlFor="authorName">Name: </label> <br/>
                    <input type="text" name="authorName" onChange={(e)=>{setAuthorName(e.target.value)}} value={authorName}/><br/><br/>
                    <p id="error">{authorError}</p>
                    <button className="btn btn-primary" onClick={e =>{GoToHome()}}>Cancel</button> <input className="btn btn-primary" type="submit" value="Submit"/><br/>
                    <label id="valido">{creationStatus}</label>
                  </div>
                </form>
            </div>
        </div>
        
    )
}

export default Edit;