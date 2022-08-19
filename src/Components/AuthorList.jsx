import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import { Table } from "reactstrap";

const AuthorList = (props) => {
    const {authors,RemoveFromDom} = props;
    const navigate = useNavigate()
    const DeleteAuthor = (authorId) => {
        axios.delete(`http://127.0.0.1:8000/api/author/${authorId}`)
        .then(res => RemoveFromDom(authorId))
        .catch(err => console.log(err))
    }
    return(
        <div>
            <Table striped className="table-bordered">
                <thead>
                    <th>Author</th>
                    <th>Available actions</th>
                </thead>
                <tbody>
                    {
                    authors.map(
                        (author,ind) => {
                            return (
                                <tr key={ind}>
                                    <td>{author.authorName}</td>
                                    <td className="buttons"><button onClick={e =>{navigate(`/edit/${author._id}`)}}>Edit</button> <button onClick={(e)=>{DeleteAuthor(author._id)}}>Delete</button> </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </Table>
        </div>
    );
}

export default AuthorList;