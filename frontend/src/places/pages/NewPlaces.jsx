import Input from "../../utility/components/FormElement/Input";
import "./NewPlace.css";
import Button from "../../utility/components/FormElement/Button";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../utility/components/helper/validators";
import { useForm } from "../../utility/hooks/form-hooks";

export default function NewPlaces() {
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
  },
    false
  );


  const placeSubmitHandler = (e)=>{
    e.preventDefault();
    console.log(formState.inputs)
  }
  

  return (
    <form className="place-form" onSubmit={placeSubmitHandler}>
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
      <Button type="submit" disabled={!formState.isValid}>
        Add Place
      </Button>
    </form>
  );
}
