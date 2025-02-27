import { useState } from "react"
import React from 'react'

const GuestList: React.FC = () => {

    const [name, setName ] = useState('')
    const [guests, setGeuests] = useState<string[]>([])

    const onClick =()=>{

       setName('')
       setGeuests([...guests, name])
    }

    return <div>
       <h3>Guest List</h3> 
     
        <ul>
        {guests.map((guest) => ( <li key={guest}>{guest}</li>   ))}
        </ul>
    
       <input value={name}  onChange={(e)=> setName(e.target.value)} />
       <button onClick={onClick}>Add Guest</button>
        </div>
}

export default GuestList