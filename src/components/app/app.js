import React, {Component} from 'react';

import Header from '../header';
import RandomPlanet from '../random-planet';
import ItemList from '../item-list';
import PersonDetails from '../person-details';
import SwapiService from "../../services/swapi-services";

import './app.css';
import PeoplePage from "../people-page";
import ErrorIndicator from "../error-indicator";

export default class App extends Component{

    swapi = new SwapiService();

    state = {
        hasError: false
    };

    componentDidCatch() {
        this.setState({
            hasError: true
        })
    }

    render(){

        if(this.state.hasError){
            return (
                <ErrorIndicator/>
            )
        }

        return (
            <div className="container">
                <Header />
                <RandomPlanet />

                <PeoplePage></PeoplePage>

                <div className="row mb2">
                    <div className="col-md-6">
                        <ItemList  onItemSelected={this.onItemSelected}
                                getData={this.swapi.getAllPlanets}
                                renderItem={(item)=>item.name}/>
                    </div>
                    <div className="col-md-6">
                        <PersonDetails personId = {this.state.selectedPerson} />
                    </div>
                </div>

                <div className="row mb2">
                    <div className="col-md-6">
                        <ItemList  onItemSelected={this.onItemSelected}
                                   getData={this.swapi.getAllStarships}
                                   renderItem={(item)=>item.name}/>
                    </div>
                    <div className="col-md-6">
                        <PersonDetails personId = {this.state.selectedPerson} />
                    </div>
                </div>

            </div>
        );
    }

};
