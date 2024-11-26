import {useState } from "react" ; 
import "./App.css";

export default function App(){
    const [credentials, setCredentials] = useState<{ username : string; password : string}>({
        username: "",
        password: "",

    }); 

    return(
        <div>
            {/* ... fait réference au reste de l'objet*/}
            <input placeholder="username" onChange={(e) => setCredentials({ ... credentials, username : e.target.value})} />
            <input placeholder="password" onChange={(e) => setCredentials({ ... credentials, password : e.target.value})} />
        </div>
    ); 
}
