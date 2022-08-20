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

    const onSubmitHandler = (e) => {
        e.preventDefault();
        axios.put(`http://127.0.0.1:8000/api/author/${id}`, {authorName})
        .then(res => {
            console.log(res)
                setAuthorError("");
                setCreationStatus("Author has been successfully updated")
            
        })
        .catch(err => {
            const errorResponse = err.response.data.errors;
            if (Object.keys(errorResponse).includes('authorName')){
                setAuthorError(errorResponse['authorName'].message);
            }else{
                
                setAuthorError("");
            }            
        });
    }

    
    return(
        <div className="container">
            <h1>Favorite Authors</h1>
            <Link to={"/"}>Home</Link>
            <p>Edit this author</p>
            <div  className="container" >
                <form onSubmit={onSubmitHandler}>
                    <label htmlFor="authorName">Name: </label> <br/>
                    <input type="text" name="authorName" onChange={(e)=>{setAuthorName(e.target.value)}} value={authorName}/><br/><br/>
                    <p id="error">{authorError}</p>
                    <button onClick={e =>{navigate("/")}}>Cancel</button> <input className="button" type="submit" value="Submit"/><br/>
                    <label id="valido">{creationStatus}</label>
                </form>
            </div>
            
        </div>
        
    )
}

export default Edit;