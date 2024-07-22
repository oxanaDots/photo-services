import { useState, useRef, useEffect } from "react";

const users = [

    {name: 'Yoda', age: 34},
    {name: 'Sonya', age: 4},
    {name: 'Alex', age: 23},
    {name: 'Phill', age: 30},

]



function UserSearch (): React.ReactElement {
const inputRef = useRef<HTMLInputElement | null> (null);
    const [name, setName] = useState('')
    const [user, setUser] = useState<{name: string, age: number} | undefined>()

    useEffect(function(){
       if(!inputRef.current) return 
        inputRef.current.focus()

    },  [])

const onClick=()=>{

    const foundUser = users.find((user)=> {
return user.name === name;
    })

setUser(foundUser)
}



 return(

    <div>
        User Search
        <input ref={inputRef} value={name} onChange={e=> setName(e.target.value)}/>
        <button onClick={onClick}>Find User</button>
        <div>
           <p> {user && "Name: " + user.name}</p>
           <p> {user && "Age: " + user.age}</p> 
           <p>{!user && 'User not found'}</p>
        </div>
    </div>
)
}

export default UserSearch