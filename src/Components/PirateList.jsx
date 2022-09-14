import { React,useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';

const PirateList = () => {
    const [pirates, setPirates] = useState([]);
    useEffect(
        ()=>{
            axios.get('http://127.0.0.1:8000/api/pirates')
            .then(res => {
                setPirates(res.data)
            })
        },[]);
    const RemoveFromDom = (pirateId) => {
        setPirates(pirates.filter(pirate => pirate._id!==pirateId))
    }

    const deletePirate = (pirateId) => {
        axios.delete('http://localhost:8000/api/pirate/' + pirateId)
        .then( () => {
        RemoveFromDom(pirateId)
        })
        .catch( err => console.log(err))
        }

    const navigate = useNavigate()
    
    return(
        <div className="container">
            <div id="encabezado">
                <h1>Pirate Crew</h1>
                <button onClick={e=>navigate('/pirate/new')}>Add Pirate</button>
            </div>
            {
                pirates.map(
                    (pirate,ind) => {   
                        return (
                            <div key={ind}>
                                {console.log(pirate)}
                                <div>
                                    <img src={pirate.imageURL} alt=""/>
                                </div>
                                <div>
                                    <h1 >{pirate.name}</h1>
                                    <button onClick={e=>{navigate(`/pirate/${pirate._id}`)}}>View pirate</button> <button onClick={e=>{deletePirate(pirate._id)}}>Walk the plank</button>

                                </div>
                                
                            </div>
                        )
                    })
            }
        </div>
    );
}

export default PirateList;