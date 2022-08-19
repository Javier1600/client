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
    var [error, setError] = useState();

    useEffect(()=>{
        axios.get(`http://127.0.0.1:8000/api/author/${id}`)
        .then(res =>{
            setAuthorName(res.data.authorName)
        })
        .catch(err => console.log(err))
    },[id])

    const onSubmitHandler = (e) => {
        e.preventDefault();
        axios.put(`http://127.0.0.1:8000/api/author/${id}`, {authorName})
        .then(res => {
            setError(false);
            setCreationStatus(res.data.msg)
        })
        .catch(err => {
            const errorResponse = err.response.data.errors;
            setError(true);
            setAuthorError(errorResponse)
            console.log(errorResponse)
        });
        ValidateError()
    }

    const ValidateError = () => {
        if(error){
            document.getElementById('error').style.color = 'red'
            document.getElementById('error').innerText = authorError['authorName']['message']
        }else{
            document.getElementById('error').style.color = 'green'
            document.getElementById('error').innerText = creationStatus
        }
    }

    return(
        <div className="container">
            <h1>Favorite Authors</h1>
            <Link to={"/"}>Home</Link>
            <p>Edit this author</p>
            <div  className="container" >
                <form onSubmit={onSubmitHandler}>
                    <label htmlFor="authorName">Name: </label> <br/>
                    <input type="text" name="authorName" value={authorName} onChange={(e)=>{setAuthorName(e.target.value)}}/><br/><br/>
                    <button onClick={e =>{navigate("/")}}>Cancel</button> <input className="button" type="submit" value="Submit"/>
                </form>
                <label id="error"></label>
            </div>
            
        </div>
        
    )
}

export default Edit;