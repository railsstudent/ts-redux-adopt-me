import React, { useState, useEffect, FunctionComponent } from 'react'
import pet, { ANIMALS, Animal } from '@frontendmasters/pet'
import useDropdown from './useDropdown';
import Results from './Results';
import { RouteComponentProps } from '@reach/router';
import { connect } from 'react-redux';
import { ThemeState, ApplicationState, ConnectDispatch } from './reducers';
import { changeTheme, changePlace } from './actionCreators';

const mapStateToProps = ({ place, theme }: ApplicationState) => ({
  place,
  theme
});

const mapDispatchToProps = (dispatch: ConnectDispatch) => {
  return ({
    setTheme: (theme: ThemeState) => dispatch(changeTheme(theme)),
    updatePlace: (place: string) => dispatch(changePlace(place))
  });
}

interface ISearchParamsProps {
  place: string,
  updatePlace: (place: string) => void,
  theme: ThemeState,
  setTheme: (theme: ThemeState) => void
}

const SearchParams: FunctionComponent<RouteComponentProps<ISearchParamsProps>> = 
  (props) => {    
    const [breeds, setBreeds] = useState([] as string[]);
    const [animal, AnimalDropdown] = useDropdown('Animal', 'dog', ANIMALS);
    const [breed, BreedDropdown, setBreed] = useDropdown('Breed', '', breeds);
    const [pets, setPets] = useState([] as Animal[]);
    const { place, updatePlace, theme, setTheme } = props;
    const { backgroundColor = 'darkblue', color = 'peru' } = theme || {};

    useEffect(() => {
      setBreeds([]);
      setBreed('');

      pet.breeds(animal).then(({ breeds: apiBreeds }) => {
        const breedStrings = apiBreeds.map(({ name }) => name);
        setBreeds(breedStrings); 
      }, console.error);
    }, [setBreeds, setBreed, animal]);

    const requestPets = async () => {
      const { animals } = await pet.animals({
        location: place,
        breed,
        type: animal
      });
      // console.log('animals', animals);
      setPets(animals || [] as Animal[]);
    }

    return (
      <div className="search-params">
        <h1>{place}</h1>
        <form onSubmit={(e) =>{ 
          e.preventDefault();
          requestPets();
        }}>
            <label htmlFor="location">
                Location
                <input id="location" value={place} 
                  placeholder="Location" 
                  onChange={e => updatePlace && updatePlace(e.target.value)} />
            </label>
            <AnimalDropdown />
            <BreedDropdown />
            <label htmlFor="theme">
              Theme
              <select
                id="theme"
                onChange={e => setTheme && setTheme({ backgroundColor: e.target.value, color })}
                onBlur={e => setTheme && setTheme({ backgroundColor: e.target.value, color })}
              >
                <option value="darkblue">Dark Blue</option>
                <option value="mediumorchid">Medium Orchid</option>
                <option value="maroon">Maroon</option>
                <option value="darkolivegreen">Dark Olive Green</option>
                <option value="lightskyblue">Light Sky Blue</option>
              </select>
            </label>
            <button style={{ backgroundColor, color } }>Submit</button>
        </form>
        <Results pets={pets} />
      </div>
    );
  }
  
export default connect(mapStateToProps, mapDispatchToProps)(SearchParams);
