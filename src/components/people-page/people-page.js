import React, {Component} from "react";
import "./people-page.css";
import ItemList from "../item-list";
import PersonDetails from "../person-details";
import ErrorIndicator from "../error-indicator";
import SwapiService from "../../services/swapi-services";

export default class PeoplePage extends Component{

    swapi = new SwapiService();

    state = {
        selectedPerson: 3,
        hasError: false
    }

    componentDidCatch() {
        this.setState({
            hasError: true
        })
    }

    onPersonSelected = (id)=>{
        this.setState({
            selectedPerson: id
        })
    };


    render(){

        if(this.state.hasError){
            return (
                <ErrorIndicator/>
            )
        }


        return(
            <div className="row mb2">
                <div className="col-md-6">
                    <ItemList  onPersoneSelected={this.onPersonSelected}
                                getData = {this.swapi.getAllPeople}
                                rrenderItem = {(item)=>item.name}/>
                </div>
                <div className="col-md-6">
                    <PersonDetails personId = {this.state.selectedPerson} />
                </div>
            </div>
        )
    }
}