import React, {useEffect, useState} from 'react';
import GameManager from "../../modules/GameManager";
import DeveloperCard from '../games/DeveloperCard'
import "../../App.css"

const DeveloperList = (props) => {
    const [developers, setDevelopers] = useState([]);
    const [search, setSearch] = useState({});

    const handleFieldChange = (event) => {
        const stateToChange = {...search};
        stateToChange[event.target.id] = event.target.value;
        setSearch(stateToChange);
        searchDevelopers()
        
    }
    const searchDevelopers = () => {
        return GameManager.getSearchDeveloper(JSON.stringify(search)).then(searchDevelopersBack => {setDevelopers(searchDevelopersBack.results)})
    }
    const getDevelopers = () => {
        return GameManager.getDevelopers().then(developersBack => 
            {setDevelopers(developersBack.results)
        })
    }



useEffect(() => {
    getDevelopers()
},[])

return(
    <>
    <section className="section-content">
            <div className="search-container">
                <input onChange={handleFieldChange} className= "search-input" type="Text" placeholder="Search"></input>
                <button onClick={searchDevelopers} className= "search-btn">Search</button>
            </div>
        <div className="container-cards">
            {developers.map(developer => <DeveloperCard developer={developer} key={developer.id} {...props}/>)}
        </div>
    </section>
    </>
    )
}
export default DeveloperList