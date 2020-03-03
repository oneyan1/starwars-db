
export default class SwapiService{

    _apiBase = "https://swapi.co/api";

    geResource= async (url)=>{
        const res = await fetch(url);
        if(!res.ok){
            throw new Error(`Could not fetch ${url} ` + ` , received ${res.status}`);
        }
        return await res.json();
    }

    getAllPeople = async()=>{
        const res = await this.geResource(this._apiBase + "/people");
        return res.results.map(this._transformPeople);
    }

    getPeople = async (id)=>{
        const people = await this.geResource(this._apiBase +`/people/${id}`);
        return this._transformPeople(people);
    }

    getAllPlanets = async()=>{
        const res = await this.geResource(this._apiBase + "/planets");
        return res.results.map(this._transformPlanet);
    }

    getPlanet = async(id)=>{
        const planet = await this.geResource(this._apiBase +`/planets/${id}`);
        return this._transformPlanet(planet);
    }

    getAllStarships= async ()=>{
        const res = await this.geResource(this._apiBase + "/starships");
        return res.results.map(this._transformStarship);
    }

    getStarship = async (id)=>{
        const starship = await this.geResource(this._apiBase +`/starships/${id}`);
        return this._transformStarship(starship);
    }
 
    _extractId = (item)=>{
        const idRegExp = /\/([0-9]*)\/$/;
        return item.url.match(idRegExp)[1];
    }

    _transformPlanet = (planet)=>{
        return {
            id: this._extractId(planet),
            name: planet.name,
            population: planet.population,
            rotationPeriod: planet.rotation_period,
            diameter: planet.diameter
        }

    }

    _transformPeople = (people) =>{
        return {
            id: this._extractId(people),
            name: people.name,
            gender: people.gender,
            birthYear: people.birth_year,
            eyeColor: people.eye_color
        }
    }

    _transformStarship = (starship)=>{
        return{
            id: this._extractId(starship),
            name: starship.name,
            model: starship.model,
            manufacturer: starship.manufacturer,
            costInCredits:starship.costInCredits,
            length: starship.length,
            crew: starship.crew,
            passengers: starship.passengers,
            cargoCapacity: starship.cargoCapacity
        }
    }
}

