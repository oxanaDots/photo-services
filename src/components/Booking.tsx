import React, { useReducer, useState,  useEffect } from 'react';
import axios from 'axios';

import  { validateFullName, validateEmail, validateContactNumber, colorBorder, hasNoErrors } from '../utils/utils';
import Nav from './Nav';



interface FieldState {
    nameInput: string,
    emailInput: string,
    phoneNumber: string,
    dateRequired: string,
    message: string
}

 export interface ErrorState{
    nameInput: string  ,
    emailInput: string ,
    phoneNumber: string ,
    dateRequired: string ,
    message: string
}


interface SetFieldAction{

    type: "SET_FIELD";
   field: keyof FieldState;
   value: string;
}

interface SetError{
    type: "SET_ERROR";
    errorMessage: string,
    field: string ;

}

interface SetGeneralError{
    type: 'SET_GENERALERROR',
    erroMessage: string;
}

interface ClearGeneralError{
    type: 'CLEAR_GENERALERROR',
}

interface ClearError {
    type: "CLEAR_ERROR";
    field: string
}

interface SubmitBooking {
    type: 'SUBMIT_BOOKING'
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

interface State{
    fieldState: FieldState;
    specificErrors: ErrorState;
      generalError: string;
      isSubmitted: boolean,
}


type Action  = 
SetFieldAction 
| SetError 
| ClearError 
| SetGeneralError 
| ClearGeneralError
| SubmitBooking


const initialState : State = {

    fieldState: {
        nameInput: '',
        emailInput: '',
        phoneNumber: '',
        dateRequired: '',
        message: '',
    },


    specificErrors: {
        nameInput: '',
        emailInput: '',
        phoneNumber: '',
        dateRequired: '',
        message: '',

    },

    generalError: '',

    isSubmitted: false,


 

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

function reducer (state: State, action: Action): State{
    switch(action.type){
        case 'SET_FIELD':
        return {
      ...state,
       fieldState:{
           ...state.fieldState,
            [action.field]: action.value,
      }
   

        };

        case 'SET_GENERALERROR':
            return{
                ...state,
                generalError: action.erroMessage
            }

            case 'CLEAR_GENERALERROR':
                return{
                    ...state,
                    generalError: ''
                }

        case 'SET_ERROR':

            return {
             ...state,
             specificErrors: {
                ...state.specificErrors,
                [action.field]: action.errorMessage
             } }



            case 'CLEAR_ERROR':

            return {
                ...state,
                specificErrors: {
                    ...state.specificErrors, 
                    [action.field]: ''
                }
                }

                case "SUBMIT_BOOKING":

                 
                        return{
                            ...state, isSubmitted: true
                           }
        
                  
                   

        default: return state
    }
}


const Booking: React.FC = () => {


    const [state, dispatch] = useReducer (reducer, initialState)
    const [services, setServices] = useState <Service[]> (availableServices)
    const [ocassions, setOccasions]= useState <OcassionType[]>(typeOfOcassion)


    const {nameInput, emailInput, phoneNumber, dateRequired} = state.fieldState;
    const hasSelectedService = services.some(service => service.isSelected);
    const hasSelectedOccasion = ocassions.some(occasion => occasion.isSelected);
 

 useEffect(()=>{
    if(hasSelectedOccasion && hasSelectedService){
        dispatch({ type: 'CLEAR_GENERALERROR' });
    }
    
 }, [hasSelectedOccasion, hasSelectedService])



    const selectedOcassion = ocassions.find(ocassion => ocassion.isSelected )?.eventName || ''
    const selectedService = services.find(service => service.isSelected)?.serviceName || ''

    const handleChange = (field: keyof FieldState) => (e: React.ChangeEvent<HTMLInputElement>)  => {
             
        if (nameInput  || emailInput || phoneNumber || dateRequired ) {
            dispatch({ type: 'CLEAR_GENERALERROR' });
          
        }
            const value  = e.target.value
                dispatch ({
                    type: 'SET_FIELD',
                    field,
                    value
                })
    
              

                let error : string | null = ''
                switch (field) {
                    case 'nameInput':
                        error = validateFullName(value);
                        break;
                    case 'emailInput':
                        error = validateEmail(value);
                        break;
                    case 'phoneNumber':
                        error = validateContactNumber(value);
                        break;
    
                        default: break 
                }
    
                    if( error ){
                        dispatch({ type: "SET_ERROR", field, errorMessage: error })
                    } else {
                        dispatch({ type: "CLEAR_ERROR", field })    
               }
               
           

            
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


             async function handleSubmit(e: React.FormEvent<HTMLFormElement>){ 
                
                e.preventDefault();

                if(hasNoErrors(state.generalError)){
                    console.log('no general error')
                } else {
                    console.log('err: general error')
                }
           
                let generalError = ''
                
                if(!nameInput || !emailInput || !phoneNumber || !dateRequired || !hasSelectedService || !hasSelectedOccasion){
                    generalError  = 'Fill in all the fields and make your selections'
                    
                } 
                dispatch({type: 'SET_GENERALERROR', erroMessage:  generalError})
                   
   
                    const noErrors = !generalError && Object.values(state.specificErrors).every((error)=> !error)

                     if(noErrors){
               
                        try {
                            dispatch({type: "SUBMIT_BOOKING"})

                            const response = await axios.post('https://photo-services-nine.vercel.app/submit', {
                                nameInput: state.fieldState.nameInput,
                                emailInput: state.fieldState.emailInput,
                                phoneNumber: state.fieldState.phoneNumber,
                                eventType: selectedOcassion ,
                                requiredService: selectedService, 
                                dateRequired: state.fieldState.dateRequired
                            })
                            console.log (response.data)
                        } catch (error){
                            console.error('There was an error submitting the form!', error)
                        }
                     } else {
                        return 
                     }

                     if (state.isSubmitted){
                        console.log('submit: true')
                    } else {
                        console.log('submit: false')
                    }
               
             

             }

             const nameInputBorder = colorBorder( 
                state.fieldState.nameInput,
                 state.specificErrors.nameInput, 
                 state.generalError)

                 
             const emailInputBorder = colorBorder( 
                state.fieldState.emailInput,
                 state.specificErrors.emailInput, 
                 state.generalError)


             const phoneInputBorder = colorBorder( 
                state.fieldState.phoneNumber,
                 state.specificErrors.phoneNumber, 
                 state.generalError)


             const dateInputBorder = colorBorder( 
                state.fieldState.dateRequired,
                 state.specificErrors.dateRequired, 
                 state.generalError)

          
               
        
  return (
  
    <>
    <Nav/>
  <div className='flex justify-center'> 
 <form onSubmit={handleSubmit} className='w-[40rem] xss:w-11/12 grid 
 grid-cols-1 gap-2 bg-opacity-35 justify-center items-center  my-8
  shadow-md   bg-white rounded-lg backdrop-blur-md z-80 p-8 shadow-mg '>
  
 
{!state.isSubmitted? 

<>
<legend className='text-4xl text-gray-700 font-semibold text-center mb-6'>Book Now</legend>

<span><p className='text-red-600'>{state.generalError}</p></span>
 <div className='flex flex-col justify-between gap-2 mb-2' > 
 <input 
 placeholder='full name'
 className={`w-full p-3 bg-transparent rounded-md border  placeholder-gray-500 focus:outline-none
   ${nameInputBorder} border-gray-600 
     `}
     
 value={state.fieldState.nameInput}
 onChange={handleChange('nameInput')}
 />
 <p className='mt text-red-600 text-xs'>{state.specificErrors.nameInput}</p>
 </div>


 <div className='flex  flex-col justify-between gap-2 mb-2'>
 <input 
  placeholder='email'
 className={`w-full p-3 bg-transparent rounded-md border  border-gray-600  placeholder-gray-500 focus:outline-none
     ${emailInputBorder}
     `}
 value={state.fieldState.emailInput}
 onChange={ handleChange('emailInput')}/>
  <p className='mt text-red-600 text-xs'>{state.specificErrors.emailInput}</p>

 </div>


 <div className='flex flex-col justify-between gap-2 mb-2'>
 <input 
  placeholder='phone number'
  className={`w-full p-3 bg-transparent rounded-md border   border-gray-600 placeholder-gray-500 focus:outline-none
    ${phoneInputBorder}
     `} 
     value={state.fieldState.phoneNumber}
 onChange={ handleChange('phoneNumber')}/>
  <p className='mt text-red-600 text-xs'>{state.specificErrors.phoneNumber}</p>

 </div>

 <div className='flex justify-between gap-'>
 <input 
 type='date'

  className={`w-full p-3 bg-transparent rounded-md border border-gray-600 text-gray-500 placeholder-gray-500 focus:outline-none
       ${dateInputBorder}
    `}
 value={state.fieldState.dateRequired}
 onChange={handleChange('dateRequired')}/>
   <p className='mt text-red-600 text-xs'>{state.specificErrors.dateRequired}</p>

 </div>

 <div className='grid gap-4 my-6'>
    <h3 className=' font-semibold text-gray-900' >What's the ocassion?</h3>
    <div className='grid gap-4 grid-cols-3 xs:grid-cols-2 xss:grid-cols-1'>
  {ocassions.map(ocassion=>
    <p onClick={()=> handleChoiceOfEvent(ocassion.id)} 
    key={ocassion.id}
    className= {`text-center w-full h-24 font-semibold flex items-center justify-center 
        border rounded-md  p-10 cursor-pointer shadow-lg  border-stone-500
        ${ocassion.isSelected ? 'bg-gray-100  bg-opacity-60 border-blue-600 border-2  text-blue-600' : 
      
        state.generalError && !hasSelectedOccasion? 'border-red-500'  : ' bg-opacity-20 text-gray-800 '
     }
      `}
    > {ocassion.eventName}</p>
   )}
    </div>


 </div>
 <div className='grid gap-4 my-6'>
    <h3 className='font-semibold text-gray-900'>Choose desired services:</h3>
    <div className='grid gap-4 grid-cols-3 xs:grid-cols-2 xss:grid-cols-1'>
    {services.map(item=> 

        <p
        key={item.id}
        onClick={()=> handleChoiceOfService(item.id)} 
        className= {`text-center w-full h-24 font-semibold flex items-center justify-center
            border rounded-md  p-10 cursor-pointer shadow-lg border-stone-500
            ${item.isSelected ? ' bg-gray-100 bg-opacity-60 border-green-600 border-2  text-green-600' : 
          
            state.generalError && !hasSelectedService? 'border-red-500'  : '  bg-slate-200 bg-opacity-20 text-gray-800 '
         }
          `}>{item.serviceName}</p>
 )}
   </div>
 </div>


<button className=' bg-neutral-100 bg-opacity-65 py-2 text-gray-700 text-lg font-semibold rounded-md mt-6 border-stone-500 border '>Submit</button>
</>
 :
 <>
 <div className='flex flex-col justify-center items-center text-neutral-700'>
    <h1 className='text-4xl  font-semibold text-center mb-6' >Booking successful!</h1>
 <h3 className='text-center '> Someone from our team will be in touch with you shortly at <span className='text-green-600 font-medium'>{state.fieldState.emailInput}</span></h3>
 
 </div>
 </>
}
 </form>
 </div>
 </>
  )
}


export default Booking;