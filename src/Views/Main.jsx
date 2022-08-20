import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import AuthorList from "../Components/AuthorList";


const Main = () => {
    const [authors, setAuthors] = useState([])
    useEffect(
        ()=>{
            axios.get('http://127.0.0.1:8000/api/authors')
            .then(res => {
                setAuthors(res.data.sort((a, b) => a.authorName.localeCompare(b.authorName)))
            })
        },[authors]);
        const RemoveFromDom = (AuthorId) => {
            setAuthors(authors.filter(product => product._id!==AuthorId))
        }

    return(
        <div className="container">
            <h1>Favorite Authors</h1>
            <Link to={"/new"}>Add a new author</Link>
            <p id="purpura">We have quotes by:</p>
            <AuthorList authors = {authors.sort()} RemoveFromDom = {RemoveFromDom} />
        </div>
    );
}

export default Main; 