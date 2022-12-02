import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../utility/components/FormElement/Button";
import Input from "../../utility/components/FormElement/Input";
import "./UpdatePlace.css";
import { useForm } from "../../utility/hooks/form-hooks";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../utility/components/helper/validators";
import Card from "../../utility/components/UIElements/Card";
import { AuthContext } from "../../utility/context/authContext";
import ErrorModal from "../../utility/components/UIElements/ErrorModal";
import LoadingSpinner from "../../utility/components/UIElements/LoadingSpinner";

export default function UpdatePlace() {
  const navigate = useNavigate();
  const auth = useContext(AuthContext)
  const [isLoading , setIsLoading] = useState(false);
  const [error , setError] = useState(false);
  const [loadedPlace, setLoadedPlace] = useState()
  const placeId = useParams().placeId;

  const [formState, inputHandler, setFormData] = useForm(
    {
      title: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
      address: {
        value: "",
        isValid: false,
      },
    },
    false
  );


  useEffect(()=>{
    const fetchData = async()=>{
      setIsLoading(true)
      try {
        const response = await  fetch(`http://localhost:5000/api/places/${placeId}`)
        const result = await response.json();
        setLoadedPlace(result.place)
        setFormData(
          {
            title: {
              value: result.place.title,
              isValid: true,
            },
            description: {
              value: result.place.description,
              isValid: true,
            },
            address: {
              value: result.place.address,
              isValid: true,
            },
          },
          true
        );
        setIsLoading(false)
      } catch (error) {
        setIsLoading(false)
        setError(error.message || "Something  wrong")
      }
    }
    fetchData();
  },[placeId])



  const placeUpdateSubmitHandler =async (e) => {
    e.preventDefault();
    setIsLoading(true)
    try {
      const bearer = 'Bearer ' + auth.token;
      const response = await  fetch(`http://localhost:5000/api/places/${placeId}`,{
        method:"PATCH",
        headers:{
          'Content-type':"application/json",
          'Authorization': bearer,
        },
        body:JSON.stringify({
          title:formState.inputs.title.value,
          description:formState.inputs.description.value,
        })
      })
      const result = await response.json();
      // if(!result.ok){
      //   throw new Error(result.message)
      // }

      navigate('/' + auth.userId + '/places');
      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
      setError(error.message || "Something went wrong, please try again")
    }
  };

  if (!loadedPlace && !error) {
    return (
      <div className="center">
        <Card>
         <h2>Could not find place!</h2>
        </Card>
      </div>
    );
  }
  if (isLoading) {
    return (
      <div className="center">
        <LoadingSpinner asOverlay/>
      </div>
    );
  }
  const errorHandler = ()=>{
    setError(null);
  }
  return (
    <>
    <ErrorModal error={error} onClear={errorHandler} />
     {!isLoading && loadedPlace &&  <form className="place-form " onSubmit={placeUpdateSubmitHandler}>
        <Input
          id="title"
          element="input"
          type="text"
          label="Title"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid title"
          onInput={inputHandler}
          initialValue={formState.inputs.title.value}
          initialValid={formState.inputs.title.isValid}
        />
        <Input
          id="description"
          element="textarea"
          label="Description"
          validators={[VALIDATOR_MINLENGTH(5)]}
          errorText="Please enter a valid Description"
          onInput={inputHandler}
          initialValue={formState.inputs.description.value}
          initialValid={formState.inputs.description.isValid}
        />
        <Button type="submit" disabled={!formState.isValid}>
          Update
        </Button>
      </form> }
    </>
  );
}
