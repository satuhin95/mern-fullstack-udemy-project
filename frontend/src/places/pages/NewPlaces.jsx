import Input from "../../utility/components/FormElement/Input";
import "./NewPlace.css";
import Button from "../../utility/components/FormElement/Button";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../utility/components/helper/validators";
import { useForm } from "../../utility/hooks/form-hooks";
import { useContext, useState } from "react";
import { AuthContext } from "../../utility/context/authContext";
import ErrorModal from "../../utility/components/UIElements/ErrorModal";
import LoadingSpinner from "../../utility/components/UIElements/LoadingSpinner";
import { useNavigate } from "react-router-dom";
import ImageUpload from "../../utility/components/FormElement/ImageUpload";

export default function NewPlaces() {
  const navigate = useNavigate();
  const auth = useContext(AuthContext)
  const [isLoading , setIsLoading] = useState(false);
  const [error , setError] = useState(false);
 const [formState, inputHandler] = useForm({
    title:{
      value:' ',
      isValid:false
    },
    description:{
      value:' ',
      isValid:false
    },
    address:{
      value:' ',
      isValid:false
    },
    image:{
      value:'',
      isValid:false,
    }
  },
    false
  );


  const placeSubmitHandler = async (e)=>{
    e.preventDefault();
    setIsLoading(true)
    try {
      const bearer = 'Bearer ' + auth.token;
      const formData = new FormData();
      formData.append('title',formState.inputs.title.value )
      formData.append('description',formState.inputs.description.value )
      formData.append('address',formState.inputs.address.value )
      formData.append('creator',auth.userId )
      formData.append('image',formState.inputs.image.value )
      const response = await  fetch('http://localhost:5000/api/places',{
        method:"POST",
        body:formData,
        headers: {
          'Authorization': bearer,
      }
      },
      
      )
      const result = await response.json();
      // if(!result.ok){
      //   throw new Error(result.message)
      // }

      navigate('/');
      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
      setError(error.message || "Something went wrong, please try again")
    }
  }
  const errorHandler = ()=>{
    setError(null);
  }


  return (
  <>
    <ErrorModal error={error} onClear={errorHandler}/>
      <form className="place-form" onSubmit={placeSubmitHandler}>
      {isLoading && <LoadingSpinner asOverlay/>}
        <Input
          id="title"
          element="input"
          type="text"
          label="Title"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid title!"
          onInput={inputHandler}
        />
        <Input
          id="description"
          element="textarea"
          label="Description"
          validators={[VALIDATOR_MINLENGTH(5)]}
          errorText="Please enter a valid Description!"
          onInput={inputHandler}
        />
        <Input
          id="address"
          element="input"
          label="Address"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid Address!"
          onInput={inputHandler}
        />
        <ImageUpload id="image" onInput={inputHandler} errorText="Please provide an image" />
        <Button type="submit" disabled={!formState.isValid}>
          Add Place 
        </Button>
    </form>
  </>
  );
}
