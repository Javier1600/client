import axios from "axios";
import { useNavigate} from "react-router-dom";
import { useState } from "react";
import 'bootstrap/dist/css/bootstrap.css';

const New = () =>{
    const [ name, setName ] = useState("");
    const [imageURL, setImageURL] = useState("");
    const [treasures,setTreasures] = useState("");
    const [phrase, setPhrase] = useState("");
    const [crewProsition, setCrewProsition] = useState("");
    const [pegLeg, setPegLeg] = useState(false);
    const [eyePatch, setEyePatch] = useState(false);
    const [hookHand, setHookHand] =useState(false);
    const [error, setError] = useState("");
    const [creationStatus, setCreationStatus] = useState("");

    const navigate = useNavigate();

    const GoToHome = () => {
        navigate('/')
    }

    const onSubmitHandler = (e) => {
        e.preventDefault();
        axios.post(`http://127.0.0.1:8000/api/pirate/new`, {name,imageURL,treasures,phrase,crewProsition,pegLeg,eyePatch,hookHand})
            .then(res => {
                console.log("Succesfully created",res)
                setError("")
                setCreationStatus("Pirate has been successfully created")
                setTimeout(GoToHome,1000)
            })
            .catch(err => {
                const errorResponse = err.response.data.errors;
                if (Object.keys(errorResponse).includes('name')){
                setError(errorResponse['name'].message);
                setCreationStatus("");
                }else{
                    setError("");
                }
                if (Object.keys(errorResponse).includes('imageURL')){
                    setError(errorResponse['imageURL'].message);
                    setCreationStatus("");
                }else{
                    setError("");
                }
                if (Object.keys(errorResponse).includes('treasures')){
                    setError(errorResponse['treasures'].message);
                    setCreationStatus("");
                }else{
                    setError("");
                }
                if (Object.keys(errorResponse).includes('phrase')){
                    setError(errorResponse['phrase'].message);
                    setCreationStatus("");
                }else{
                    setError("");
                }
                if (Object.keys(errorResponse).includes('crewProsition')){
                    setError(errorResponse['crewProsition'].message);
                    setCreationStatus("");
                }else{
                    setError("");
                }
            });
    }
    const chekboxesHandler = () =>{
        var chkLeg = document.getElementById('PegLeg'); 
        var chkEye = document.getElementById('EyePatch'); 
        var chkHand = document.getElementById('HookHand'); 
        setPegLeg(chkLeg.checked)
        setEyePatch(chkEye.checked)
        setHookHand(chkHand.checked)
        console.log({pata:pegLeg,ojo:eyePatch,grfio:hookHand})
    }
    return(
        <div className="container">
            <div id="encabezado">
                <h1>Add Pirate</h1>
                <button  className="btn btn-primary" onClick={e =>{GoToHome()}}>Crew Board</button>             
            </div>
            <form onSubmit={onSubmitHandler} className="info">
                <div id="conteninfo">
                    <div>
                        <label htmlFor="PirateName">Pirate Name:</label> <br/>
                        <input type="text" name="PirateName" onChange={e=>setName(e.target.value)} value={name}/><br/><br/>
                        <label htmlFor="imgUrl">Image URL:</label> <br/>
                        <input type="text" name="imgUrl" onChange={e=>setImageURL(e.target.value)} value={imageURL}/><br/><br/>
                        <label htmlFor="treasures"># of Treasure Chests:</label> <br/>
                        <input type="text" name="treasures" onChange={e=>setTreasures(e.target.value)} value={treasures}/><br/><br/>
                        <label htmlFor="phrase">Pirate  Catch Phrases:</label> <br/>
                        <input type="text" name="phrase" onChange={e=>setPhrase(e.target.value)} value={phrase}/><br/><br/>
                    </div>
                    <div>
                        <label htmlFor="position">Crew Position</label>
                        <select className="position" onChange={e=>setCrewProsition(e.target.value)}>
                            <option value="Captain" selected>Captain</option>
                            <option value="First Mate">First Mate</option>
                            <option value="Quarter Master">Quarter Master</option>
                            <option value="Boatswain">Boatswain</option>
                            <option value="Powder Monkey">Powder Monkey</option>
                        </select>
                        
                        <br/>
                        <input type="checkbox" name="Peg Leg" id="PegLeg" value="Peg Leg" onChange={chekboxesHandler}></input>
                        <label htmlFor="Peg Leg">Peg Leg</label><br></br>
                        <input type="checkbox" name="Eye Patch" id="EyePatch" value="Eye Patch" onChange={chekboxesHandler}/>
                        <label htmlFor="Eye Patch">Eye Patch</label><br></br>
                        <input type="checkbox" name="Hook Hand" id="HookHand" value="Hook Hand" onChange={chekboxesHandler}/>
                        <label htmlFor="Hook Hand">Hook Hand</label><br></br>
                    </div>
                    <p id="error">{error}</p>
                    <label id="valido">{creationStatus}</label>
                    <input  className="btn btn-primary" type="submit" value="Add Pirate"/><br/>
                </div>
            </form>
        </div>
    )
}

export default New;