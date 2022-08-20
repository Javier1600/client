import axios from "axios";
import { Link, useNavigate} from "react-router-dom";
import { useState } from "react";
import 'bootstrap/dist/css/bootstrap.css';

const New = () =>{
    const [ authorName, setAuthorName ] = useState("");
    const [authorError, setAuthorError] = useState("");
    const [creationStatus, setCreationStatus] = useState("");
    const navigate = useNavigate();

    const onSubmitHandler = (e) => {
        e.preventDefault();
        axios.post(`http://127.0.0.1:8000/api/author/new`, {authorName})
            .then(res => {
                setAuthorName("")
                console.log("Succesfully created",res)
                setAuthorError("")
                setCreationStatus("Author has been successfully created")
            })
            .catch(err => {

                const errorResponse = err.response.data.errors;
                if (Object.keys(errorResponse).includes('authorName')){
                setAuthorError(errorResponse['authorName'].message);
                setCreationStatus("");
                }else{
                setAuthorError("");
                } 
            });
    }

            
    return(
        <div className="container">
            <h1>Favorite Authors</h1>
            <Link to={"/"}>Home</Link>
            <p>Add a new author</p>
            <form onSubmit={onSubmitHandler}>
                <label htmlFor="authorName">Name:</label> <br/>
                <input type="text" name="authorName" onChange={e=>setAuthorName(e.target.value)} value={authorName}/><br/><br/>
                <p id="error">{authorError}</p>
                <button onClick={e =>{navigate("/")}}>Cancel</button> <input className="button" type="submit" value="Submit"/><br/>
                <label id="valido">{creationStatus}</label>
            </form>
        </div>
    )
}

export default New;