
import { SubmitHandler, useForm } from 'react-hook-form'
import axios, { AxiosError } from 'axios'
import Nav from '../components/Nav';
import { NavLink } from 'react-router-dom';
import React from 'react'


interface FormInputs {
  username: string,
  password: string,
  email: string,
  confirmPassword: string
}

const SignUp = () => {


const {register, handleSubmit, setError, formState: {errors, isSubmitting, isSubmitSuccessful}} = useForm<FormInputs>({shouldUseNativeValidation: false,
}
)

const apiURL = 'https://photo-services-fawn.vercel.app'
const onSubmit: SubmitHandler<FormInputs> = async (data )=> {
try {
  

 const response = await axios.post(`${apiURL}/signup`, data)
 console.log('User registered', response.data)


} catch (error){
  if(axios.isAxiosError(error)){
    const axiosError = error as AxiosError<{error: string}>
    if(axiosError.response && axiosError.response.status === 409){
      const errorMessage = axiosError.response.data.error;
      console.log(axiosError)

      if(errorMessage === 'Email is taken'){
        setError('root',{
          type: 'manual',
         message: errorMessage,
        })

      } else if(errorMessage === 'Username is already taken'){
        setError('root',{
          type: 'manual',
         message: errorMessage,
        }) }
        else if(errorMessage === 'Email and username are taken'){
        setError('root', {
        type: 'manual',
       message: errorMessage
        })
        
      } else{
        setError('root', {
          type: 'manual',
          message: 'Server Error'
        })
      }

    }
  }
}finally{

}}

const onError = ()=>{
  console.log('wrong')
}




  return (
    <>
    <Nav/>
<div className='flex justify-center items-center '>
   <form  onSubmit={handleSubmit(onSubmit, onError)}  className='flex flex-col align-middle justify-center items-center px-6 py-10 w-[30rem]'>
    {!isSubmitSuccessful ? 
      <>
    <legend className='pb-6 text-3xl font-semibold text-blue-800'>Create your Account</legend>

      <div className='py-2 w-full '>
      <input className='w-full shadow-md py-2 px-4 rounded-3xl' 
      placeholder='username'
      {... register ('username', 
       {required: 'this field is required',
       
       })}/>
       {errors.username && <p className='text-red-700 pl-4 text-xs pt-1'>{errors.username.message}</p>}
    </div>

    <div className='py-2 w-full'>
      <input className='w-full shadow-md py-2 px-4 rounded-3xl' 
      placeholder='email address'
      {... register ('email', 
       {required: 'this field is required',
        pattern: {
          value:   /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
          message: 'Invalid email'
        },
        validate: (value)=>{
        
          if(!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)){
            return "Email must include @"
          } return true
        }
       
       })}/>
       {errors.email && <p className='text-red-700 pl-4 text-xs pt-1'>{errors.email.message}</p>}
    </div>

    <div className='py-2 w-full'>
    <input  className='w-full shadow-md py-2 px-4 rounded-3xl' 
    placeholder='password'
    {... register ('password', 
    {required: 'this field is required',
      minLength :{
        value: 8,
        message: "Password must have at least 8 characters"
      },
      pattern: {
        value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
        message: 'Password must contain at least one letter and one number'
      }
    })}/>
    {errors.password && <p className='text-red-700 pl-4 text-xs pt-1'>{errors.password.message}</p>}
    </div>

    <div className='py-2 w-full'>
    <input  className='w-full py-2 px-4 shadow-md rounded-3xl' 
    placeholder='confirm password'
     {... register ('confirmPassword', 
     {required: 'this field is required',
      validate: (value, FormInputs)=> value === FormInputs.password ? true : "Password do not match"
     })}/>
     {errors.confirmPassword && <p className='text-red-700 pl-4 text-xs pt-1'>{errors.confirmPassword.message}</p>}
    </div>
    {errors.root && <p className='text-red-700 self-start text-left place-items-start pl-4 text-xs pt-1'>{errors.root.message}</p>}

    <button disabled={isSubmitting} className={` ${isSubmitting && 'bg-blue-300'} bg-blue-200 w-full mt-6 border-blue-700 border-2  text-blue-900 font-semibold rounded-3xl py-2 px-5`}>{isSubmitting? 'Creating account...': 'Create account'}</button>
    
    </>
    :
    <div className='flex flex-col  w-auto justify-center text-center '>
    <h2 className=' text-4xl w-full font-semibold text-gray-700 pb-1'>Thank you for signing up.</h2><br></br>
    <h3 className='text-xl text-emerald-600 font-semibold pb-6'>Your account has been created!</h3> 
    <NavLink to='/signin'>
    <button className='w-full mt-6 border-blue-700 border-2  text-blue-900 font-semibold rounded-3xl py-2 px-5' > Sign In</button> 
    </NavLink>
    </div>
}</form>
    
    
   </div>
   </>
  );
};

export default SignUp;
