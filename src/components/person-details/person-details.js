import React, { Component } from 'react';

import './person-details.css';
import SwapiService from "../../services/swapi-services";
import Spinner from "../spiner";
import ErrorIndicator from "../error-indicator";

export default class PersonDetails extends Component {

    swapi = new SwapiService();

    state = {
        person: null,
        loading: true,
        error: false
    };

    componentDidMount() {
        this.updatePerson();
    }

    componentDidUpdate(prevProps) {
        if(this.props.personId != prevProps.personId){
            this.loadingPerson();
            this.updatePerson();
        }
    }

    errorPerson = ()=>{
        this.setState({
            error:true,
            loading: false
        })
    }

    loadingPerson(){
        this.setState({
            loading:true,
            error:false
        })
    }

    updatePerson(){
        const {personId} = this.props;
        if(!personId){
            return;
        }
        this.swapi.getPeople(personId).then((person)=>{
            this.setState({
                person:person,
                loading: false
            });
        })
            .catch(
                this.errorPerson
            );


    }

    render() {

        if(! this.state.person){
            return (<Spinner/>);
        }
        const {loading, error} = this.state;
        const hasData = !(loading || error);

        const spiner = loading ? <Spinner/>: null;
        const errorIndicator = error ? <ErrorIndicator/>:null;
        const content = hasData ? <PersonView person={this.state.person}/> : null;


        return (
            <div className="person-details card">
                {spiner}
                {content}
                {errorIndicator}
            </div>
        )
    }
}

const PersonView = ({person})=>{

    const{ id, name, gender, birthYear, eyeColor} = person;
    return (<React.Fragment>
            <img className="person-image"
                 src={`https://starwars-visualguide.com/assets/img/characters/${id}.jpg`} />

            <div className="card-body">
                <h4>{name}</h4>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                        <span className="term">Gender</span>
                        <span>{gender}</span>
                    </li>
                    <li className="list-group-item">
                        <span className="term">Birth Year</span>
                        <span>{birthYear}</span>
                    </li>
                    <li className="list-group-item">
                        <span className="term">Eye Color</span>
                        <span>{eyeColor}</span>
                    </li>
                </ul>
            </div>
            </React.Fragment>
    )
}
