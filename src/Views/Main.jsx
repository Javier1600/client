import { useNavigate } from "react-router-dom";
const Main = () => {
    const navigate = useNavigate();
    return(
        <div className="container">
            <div id="encabezado">
                <h1>Welcome to the Pirate Crew</h1>
            </div>
            <div id="fila">
                <div id="registro">
                    <h1>Register</h1>
                    <form>
                        <label htmlFor="name">First Name</label><br></br>
                        <input type="text" /><br></br>
                        <label htmlFor="lastName">Last Name</label><br></br>
                        <input type="text" name="lastName"/><br></br>
                        <label htmlFor="email">Email</label><br></br>
                        <input type="text" /><br></br>
                        <label htmlFor="passwd">Password</label><br></br>
                        <input type="password"/><br></br>
                        <label htmlFor="confrim">Confirm Password</label><br></br>
                        <input type="password"/><br></br>
                    </form>
                </div>
                <div id="login">
                    <h1>Login</h1>
                    <label htmlFor="email">Email</label><br></br>
                    <input type="text" /><br></br>
                    <label htmlFor="password"></label><br></br>
                    <input type="password"/>
                    <button onClick={e=>navigate('/pirates')}>Login</button>
                </div>
            </div>
            
            
        </div>
    );
}

export default Main; 