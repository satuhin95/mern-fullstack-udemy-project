import React, { useContext, useState } from "react";
import Card from "../../utility/components/UIElements/Card";
import "./PlaceItem.css";
import Button from "../../utility/components/FormElement/Button";
import Modal from "../../utility/components/UIElements/Modal";
import Map from "../../utility/components/UIElements/Map";
import { AuthContext } from "../../utility/context/authContext";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../../utility/components/UIElements/LoadingSpinner";
import ErrorModal from "../../utility/components/UIElements/ErrorModal";
export default function PlaceItem(props) {
  const auth = useContext(AuthContext)
  const navigate = useNavigate();
  const [isLoading , setIsLoading] = useState(false);
  const [error , setError] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [showConfModal, setShowConfModal] = useState(false);
  const openMapHandler = () => setShowMap(true);
  const closeMapHandler = () => setShowMap(false);

  const showDeleteWarningHandler = () => {
    setShowConfModal(true);
  };
  const cancelDeleteHandler = () => {
    setShowConfModal(false);
  };
  const confirmDeleteHandler = async() => {
    setShowConfModal(false)
    try {
      const response = await  fetch(`http://localhost:5000/api/places/${props.id}`,{method:"DELETE" })
      const result = await response.json();
      props.onDelete(props.id);
      // if(!result.ok){
      //   throw new Error(result.message)
      // }

      navigate('/' + auth.userId + '/places');
    } catch (error) {
      setError(error.message || "Something went wrong, please try again")
    }
  };
  const errorHandler = ()=>{
    setError(null);
  }
  return (
    <>
      <ErrorModal error={error} onClear={errorHandler} />
      <Modal
        show={showMap}
        onCancel={closeMapHandler}
        header={props.address}
        contentClass="place-item__modal-content"
        footerClass="place-item__modal-action"
        footer={<Button onClick={closeMapHandler}>Close</Button>}
      >
        <div className="map-container">
          <Map center={props.coordinates} zoom={16} />
        </div>
      </Modal>
      <Modal
        show={showConfModal}
        onCancel={cancelDeleteHandler}
        header="Ary you sure?"
        footerClass="place-item__modal-actions"
        footer={
          <>
            <Button inverse onClick={cancelDeleteHandler}>Cancel</Button>
            <Button danger onClick={confirmDeleteHandler}>Delete</Button>
          </>
        }
      >
        <p>Do you want to proceed and delete this place?</p>
      </Modal>
      <li className="place-item">
        <Card className="place-item__content">
          {isLoading && <LoadingSpinner asOverlay />}
          <div className="place-item__image">
            <img src={`http://localhost:5000/${props.image}`} alt={props.title} />
          </div>
          <div className="place-item__info">
            <h2>{props.title}</h2>
            <h3>{props.address}</h3>
            <p>{props.description}</p>
          </div>
          <div className="place-item__actions">
            <Button inverse onClick={openMapHandler}>
              View On Map 
            </Button>
            {auth.userId === props.creatorId &&
            <>
              <Button to={`/places/${props.id}`}>Edit</Button>
            <Button danger onClick={showDeleteWarningHandler}>Delete</Button>
            </>
          }
          </div>
        </Card>
      </li>
    </>
  );
}
