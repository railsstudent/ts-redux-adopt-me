import React, { useState, useEffect, FunctionComponent } from 'react';
import pet, { Photo } from "@frontendmasters/pet";
import Carousel from "./Carousel";
import Modal from './Modal';
import { navigate, RouteComponentProps } from '@reach/router';
import { ApplicationState, ThemeState, ConnectDispatch } from './reducers';
import { changeTheme } from './actionCreators';
import { connect } from 'react-redux';

interface IDetail {
    name: string,
    animal: string,
    location: string,
    description: string,
    media: Photo[],
    breed: string
}

interface IAdoptionModal {
    details: IDetail | null;
    url: string;
    theme?: ThemeState;
}

const mapStateToProps = ({ theme }: ApplicationState) =>
    ({
        theme
    });

const mapDispatchToProps = (dispatch: ConnectDispatch) =>
     ({
        setTheme: (theme: ThemeState) => dispatch(changeTheme(theme))
    })

const AdoptionModal: FunctionComponent<IAdoptionModal> = ({ details, url, theme }) => {
    const [showModal, setShowModal] = useState(false);

    const toggleModal = () => setShowModal(!showModal);
    const adopt = () => navigate(url);

    if (!details || !theme) {
        return null;
    }

    const { backgroundColor, color } = theme;

    return (
        <div className="details">   
            <Carousel media={details.media} />
            <div>
                <h1>{details.name}</h1>
                <h2>{`${details.animal} - ${details.breed} - ${details.location}`}</h2>
                <button style={{ backgroundColor, color }} onClick={toggleModal}>Adopt {details.name}</button>
                <p>{details.description}</p>
                {
                    showModal ?
                    <Modal>
                        <h1>Would you like to adopt {details.name}?</h1>
                        <div className="buttons">
                            <button onClick={adopt}>Yes</button>
                            <button onClick={toggleModal}>No</button>
                        </div>
                    </Modal>                        
                    : null
                }
            </div>
        </div> 
    );
}

const Details: FunctionComponent<RouteComponentProps<{ id: string, theme: ThemeState }>> = (props) => {
    const [details, setDetails] = useState(null as IDetail | null);
    const [loading, setLoading] = useState(true);
    const [url, setUrl] = useState('')

    useEffect(() => {
        setDetails(null)
        if (!props.id || !props.theme) {
            return
        }

        pet.animal(+props.id)
            .then(({ animal }) => {
                const { 
                    name, description, photos: media, type,
                    contact: { 
                        address: { city, state }
                    },
                    breeds: { primary: breed },
                    url: adoptionUrl 
                } = animal || { 
                    name: '', 
                    description: '',
                    photos: [],
                    type: '',
                    contact: { 
                        address: { 
                            city: '', state: ''
                        }
                    },
                    breeds: {
                        primary: ''
                    },
                    url: ''
                };
                setDetails({
                    name,
                    animal: type,
                    location: `${city}, ${state}`,
                    description,
                    media,
                    breed,
                });
                setUrl(adoptionUrl)
                setLoading(false);
            }, console.error)
    }, [props.id]);

    return (
        loading ? <h1>Loading...</h1> : <AdoptionModal details={details} url={url} theme={props.theme} /> 
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(Details);
