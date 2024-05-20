import React from 'react'
import Input from './Input';
import Button from './Button';
import FormError from './FormError';
import { BallTriangle } from 'react-loader-spinner'

interface RegisterBoxProps {
    email?: string;
    setEmail: (email: string) => void;
    password?: string;
    setPassword: (password: string) => void;
    error: any;
    setError: (error: any) => void;
    setLogin: (login: boolean) => void;
    loading : boolean;
    handleRegisterSubmit?: (e: React.FormEvent) => void;
    name: string;
    setName: (name: string) => void;
}

const RegisterBox = (registerProps : RegisterBoxProps) => {
    const { email, setEmail, password, setPassword, error, setError, setLogin, loading, handleRegisterSubmit, name, setName } = registerProps;
  return (
    <>
        <h1 className="text-3xl font-bold text-red-500 mb-5">Register</h1>
        <form className="flex flex-col items-center justify-center gap-y-4" onSubmit={handleRegisterSubmit}>
            <Input placeholder='Name' stateValue={name} setState={setName}/>
            <Input placeholder="Email" stateValue={email} setState={setEmail} />
            <Input placeholder="Password" stateValue={password} setState={setPassword} type='password'/>
            {!loading && (
                <Button text="Register" />
            )}

            {loading && (
                <BallTriangle color="#ffffff" height={50} width={50} />
            )}
            {error && (
                <FormError error={error} />
            )}
            <div>
                <p className="text-white">Have an account? <span onClick={() => {setLogin(true); setError(undefined)}} className="text-red-500 hover:cursor-pointer">Login</span></p>
            </div>
        </form>
    </>
  )
}

export default RegisterBox