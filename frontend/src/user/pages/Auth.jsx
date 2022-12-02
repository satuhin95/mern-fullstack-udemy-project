import React, { useContext, useState } from "react";
import {  useNavigate } from "react-router-dom";
import Button from "../../utility/components/FormElement/Button";
import Input from "../../utility/components/FormElement/Input";
import LoadingSpinner from '../../utility/components/UIElements/LoadingSpinner'
import ErrorModal from '../../utility/components/UIElements/ErrorModal'

import {
  VALIDATOR_EMAIL,
  VALIDATOR_MIN,
  VALIDATOR_REQUIRE,
} from "../../utility/components/helper/validators";
import Card from "../../utility/components/UIElements/Card";
import { AuthContext } from "../../utility/context/authContext";
import { useForm } from "../../utility/hooks/form-hooks";
import "./Auth.css";
export default function Auth() {
  const navigate = useNavigate();
  const auth = useContext(AuthContext)
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [isLoading , setIsLoading] = useState(false);
  const [error , setError] = useState(false);


  const [formState, inputHandler,setFormData] = useForm(
    {
      email: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
    },
    false
  );
  const authSubmitHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (isLoginMode) {
      try {
        const response = await  fetch('http://localhost:5000/api/users/login',{
          method:"POST",
          headers:{
            'Content-type':"application/json"
          },
          body:JSON.stringify({
            email:formState.inputs.email.value,
            password:formState.inputs.password.value,
          })
        })
        const result = await response.json();
        // if(!result.ok){
        //   throw new Error(result.message)
        // }
        navigate('/');
        setIsLoading(false);
        auth.login(result.user.id);
      } catch (error) {
        setIsLoading(false)
        setError(error.message || "Something went wrong, please try again")
      }
    } else {
      try {
        const response = await  fetch('http://localhost:5000/api/users/signup',{
          method:"POST",
          headers:{
            'Content-type':"application/json"
          },
          body:JSON.stringify({
            name:formState.inputs.name.value,
            email:formState.inputs.email.value,
            password:formState.inputs.password.value,
          })
        })
        const result = await response.json();
        if(!result.ok){
          throw new Error(result.message)
        }
        auth.login(result.user.id);
        navigate('/');
        setIsLoading(false)
      } catch (error) {
        setIsLoading(false)
        setError(error.message || "Something went wrong, please try again")
      }
    }

    
  

  };
  const shitchModeHandler = () => {
    if (!isLoginMode) {
      setFormData({
        ...formState.inputs,
        name:undefined
      },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      )
    }else{
      setFormData({
        ...formState.inputs,
        name:{
          value:'',
          isValid:false
        }
      },false)
    }
    setIsLoginMode((prevMode) => !prevMode);
  };
  const errorHandler = ()=>{
    setError(null);
  }

  return (
    <div className="auth">
      <ErrorModal error={error} onClear={errorHandler}/>
      <Card className="authentication">
        {isLoading && <LoadingSpinner asOverlay/>}
        <h2>Login Required</h2>
        <hr />
        <form onSubmit={authSubmitHandler}>
          {!isLoginMode && (
            <Input
              element="input"
              id="name"
              type="text"
              label="Your Name"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Please enter a name"
              onInput={inputHandler}
            />
          )}
          <Input
            element="input"
            id="email"
            type="email"
            label="E-Mail"
            validators={[VALIDATOR_EMAIL()]}
            errorText="Plase enter a valid email"
            onInput={inputHandler}
          />
          <Input
            element="input"
            id="password"
            type="password"
            label="Password"
            validators={[VALIDATOR_MIN(6)]}
            errorText="Plase enter a valid Password, at least 6 characters"
            onInput={inputHandler}
          />

          <Button type="submit" disabled={!formState.isValid}>
            {isLoginMode ? "Login" : "SignUp"}
          </Button>
        </form>
        <Button inverse onClick={shitchModeHandler}>
          Switch to {isLoginMode ? "SignUp" : "LogIn"}
        </Button>
      </Card>
    </div>
  );
}
