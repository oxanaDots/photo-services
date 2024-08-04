import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import axios, { AxiosError } from 'axios'
import Nav from '../components/Nav';
import React from 'react'

interface SignInFormInputs {
    username: string,
    password: string
}

const SignIn = () => {
    const navigate = useNavigate();


    const {handleSubmit, register, formState: {errors, isSubmitting}, setError} = useForm<SignInFormInputs>({shouldUseNativeValidation: false})


    const onSubmit: SubmitHandler<SignInFormInputs> = async (data)=> {
      console.log("form data:", data)

      try {

        const response = await axios.post('http://localhost:3003/signin', data)
        console.log('Login successful', response.data)
        localStorage.setItem('token', response.data.token);
        navigate('/');


      }catch (error) {
        if (axios.isAxiosError(error)) {
          const axiosError = error as AxiosError;
          if (axiosError.response && axiosError.response.status === 401) {
            setError('root', {
              type: 'authentication',
              message: 'Invalid username or password'
            });
          } else {
            console.error('An unexpected error occurred:', axiosError.message);
          }
        } else {
          console.error('An unexpected error occurred:', error);
        }
      }
    }

    const onError = ()=>{
    console.log('Error')
    }

  return (
    <>
    <Nav/>
    <div className='flex justify-center items-center'>
<form onSubmit={handleSubmit(onSubmit, onError)} className='flex flex-col justify-center items-center  px-6 py-10 w-[30rem]'>
    <legend className='pb-6 text-3xl font-semibold text-blue-800'>Welcome back</legend>
<div className='py-2 w-full'>
    <input  className='w-full shadow-md py-2 px-4 rounded-3xl' 
    placeholder='username'
    {...register('username',
        {required: 'This field is required'}
    )}
    />
    {errors.username && <p className='text-red-700 pl-4 text-xs pt-1'>{errors.username.message}</p>}
</div>

<div className='py-2 w-full'>
    <input  className='w-full shadow-md py-2 px-4 rounded-3xl' 
    placeholder='password'
    {...register('password',
        {required: 'This field is required'}
    )}
    />
    {errors.password && <p className='text-red-700 pl-4 text-xs pt-1'>{errors.password.message}</p>}

</div>

{errors.root && <p className='text-red-700 pl-4 text-xs pt-1'>{errors.root.message}</p>}
<button disabled={isSubmitting} className={` ${isSubmitting? 'bg-blue-700': 'bg-blue-200'}  w-full mt-6 border-blue-700 border-2  text-blue-900 font-semibold rounded-3xl py-2 px-5`}>{isSubmitting? 'Signing you in...': 'Sign in'}</button>
</form>
    </div>
    </>
  );
};

export default SignIn;