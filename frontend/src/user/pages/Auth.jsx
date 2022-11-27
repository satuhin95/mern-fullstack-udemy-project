import React, { useContext, useState } from "react";
import { redirect } from "react-router-dom";
import Button from "../../utility/components/FormElement/Button";
import Input from "../../utility/components/FormElement/Input";
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
  const auth = useContext(AuthContext)
  const [isLoginMode, setIsLoginMode] = useState(true);
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
  const authSubmitHandler = (e) => {
    e.preventDefault();
    auth.login();
    redirect('/');
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

  return (
    <div className="auth">
      <Card className="authentication">
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
            validators={[VALIDATOR_MIN(5)]}
            errorText="Plase enter a valid Password, at least 5 characters"
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
