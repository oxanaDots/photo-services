import React, { useReducer, useState } from 'react';


interface State {
    nameInput: string,
    emailInput: string,
    phoneNumber: string,
    eventType: string,
    requiredService: string,
    dateRequired: string


}


interface SetFieldAction{

    type: "SET_FIELD";
   field: keyof State;
   value: string;

}

interface Service{
    id: number,
    serviceName: string,
    isSelected: boolean, 
}

interface OcassionType{
    id: number,
    eventName: string,
    isSelected: boolean
}


const initialState={
    nameInput: '',
    emailInput: '',
    phoneNumber: '',
    eventType: '',
    requiredService: '',
    dateRequired: ''

}

const availableServices: Service[] = [
    { id: 1, serviceName: 'Photography', isSelected: false },
    { id: 2, serviceName: 'Videography', isSelected: false  },
    { id: 3, serviceName: 'Both', isSelected: false  },
   
];

const typeOfOcassion: OcassionType[]=[
    {id: 1, eventName: 'Commercial',isSelected: false},
    {id: 2, eventName: 'Music',isSelected: false},
    {id: 3, eventName: 'Real Estate', isSelected: false},
    {id: 4, eventName: 'Portrait', isSelected: false},
    {id: 5, eventName: 'E-commerce', isSelected: false}
]

function reducer (state: State, action: SetFieldAction): State{
    switch(action.type){
        case 'SET_FIELD':
        return {
      ...state,
      [action.field]: action.value,

        }
        default: return state
    }
}


const Booking: React.FC = () => {


    const [state, dispatch] = useReducer (reducer, initialState)
    const [services, setServices] = useState <Service[]> (availableServices)
    const [ocassions, setOccasions]= useState <OcassionType[]>(typeOfOcassion)

        const handleChange = (field: keyof State, value: string) => {

            dispatch ({
                type: 'SET_FIELD',
                field,
                value
            })
        }

        const handleChoiceOfService= (id: number )=>{

       setServices((services)=> services.map(service=> 
        service.id === id ? {...service, isSelected: !service.isSelected}: service
       ))

        }


        const handleChoiceOfEvent= (id: number )=>{

            setOccasions(()=> ocassions.map( ocassion=> 
             ocassion.id === id ? {...ocassion, isSelected: !ocassion.isSelected}: ocassion
            ))
     
             }

        
  return (
  
  <div className='flex justify-center'> 
 <form className='w-[40rem] xss:w-11/12 grid grid-cols-1 gap-4  justify-center items-center  my-8
  shadow-md bg-gray-100 bg-opacity-10 rounded-lg backdrop-blur-lg p-8 
 
 shadow-mg '>

<legend className='text-center text-3xl'>Book Now</legend>
 <div className='flex justify-between gap-4' > 

 <input 
 placeholder='full name'
 className='w-full p-2 bg-transparent rounded-none  placeholder-gray-500 border-b border-gray-500'
 value={state.nameInput}
 onChange={(e)=> handleChange('nameInput', e.target.value)}
 />
 </div>


 <div className='flex justify-between gap-4'>
 <input 
  placeholder='email'
  className='w-full p-2 bg-transparent border-b  placeholder-gray-500 border-gray-500'
 value={state.emailInput}
 onChange={(e)=> handleChange('emailInput', e.target.value)}
 />
 </div>


 <div className='flex justify-between gap-'>
 <input 
  placeholder='phone number'
  className='w-full p-2 bg-transparent border-b  placeholder-gray-500 border-gray-500'
 value={state.phoneNumber}
 onChange={(e)=> handleChange('phoneNumber', e.target.value)}
 />
 </div>

 <div className='grid gap-4 my-6'>
    <h3 className=' font-semibold text-gray-700' >What's the ocassion?</h3>
    <div className='grid gap-4 grid-cols-3 xs:grid-cols-2 xss:grid-cols-1'>
  {ocassions.map(ocassion=>
    <p onClick={()=> handleChoiceOfEvent(ocassion.id)} 
    key={ocassion.id}
    className= {`text-center w-full h-24 font-semibold flex items-center justify-center
        border rounded-md  p-10 cursor-pointer shadow-lg 
        ${ocassion.isSelected ? ' bg-gray-100 bg-opacity-40 border-blue-800 border-2  text-blue-800' : 
        ' bg-slate-200 bg-opacity-20 text-gray-800 border-none' }
      `}
    > {ocassion.eventName}</p>
   )}
    </div>

 </div>

 <div className='grid gap-4 my-6'>
    <h3 className='font-semibold text-gray-700'>Choose desired services:</h3>
    <div className='grid gap-4 grid-cols-3 xs:grid-cols-2 xss:grid-cols-1'>
    {services.map(item=> 

        <p
        key={item.id}
        onClick={()=> handleChoiceOfService(item.id)} 
        className= {`text-center h-24 w-full font-semibold flex items-center justify-center
        border rounded-md  p-10 cursor-pointer shadow-lg
        ${item.isSelected ? ' bg-gray-100 bg-opacity-40 border-emerald-800 border-2  text-emerald-800': 
        ' bg-slate-200 bg-opacity-20 text-gray-800 border-none' }
      `}>{item.serviceName}</p>
 )}
   </div>
 </div>


<button className='bg-gray-100 bg-opacity-65 py-2 text-gray-700 text-lg font-semibold rounded-md mt-6 ' >Submit</button>



 </form>
 </div>
  )
}


export default Booking;