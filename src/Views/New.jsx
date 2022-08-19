import axios from "axios";
import { Link, useNavigate} from "react-router-dom";
import { useState } from "react";
import 'bootstrap/dist/css/bootstrap.css';

const New = () =>{
    const [ authorName, setAuthorName ] = useState("");
    const [authorError, setAuthorError] = useState("");
    const [creationStatus, setCreationStatus] = useState("");
    var error = false;
    const navigate = useNavigate();

    const onSubmitHandler = (e) => {
        e.preventDefault();
        axios.post('http://127.0.0.1:8000/api/author/new', {authorName})
            .then(res => {
                setAuthorName("")
                console.log("Succesfully created",res)
                setCreationStatus(res.data.msg)
                error = false;
                ValidateError()
            })
            .catch(err => {

                const errorResponse = err.response.data.errors;
                setAuthorError(errorResponse)
                console.log(errorResponse['authorName']['message'])
                error = true;
                ValidateError()
            });
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
            <p>Add a new author</p>
            <form onSubmit={onSubmitHandler}>
                <label htmlFor="authorName">Name:</label> <br/>
                <input type="text" name="authorName" onChange={e=>setAuthorName(e.target.value)}/><br/><br/>
                <button onClick={e =>{navigate("/")}}>Cancel</button> <input className="button" type="submit" value="Submit"/>
            </form>
            <label id="error"></label>
        </div>
    )
}

export default New;