import {makeAutoObservable} from 'mobx';

export default class CarStore{
    constructor() {
        this._brand = [
            {id:1, name: "toyota"},
            {id:2, name: "bmw"},
            {id:3, name: "renault"},
            {id:4, name: "lamborgini"}
        ]
        this._model = [
            {id:1, name: "corolla"}
        ]
        this._carclass = [
            {id:1, name: "premium"},
            {id:2, name: "middle"},
            {id:3, name: "economy"}
        ]
        this._gearbox = [
            {id:1, name: "mechanic"},
            {id:2, name: "authomath"}
        ]
        this._cargroup = [
            
        ]
        this._cars = []
        
        this._selectedbrand = {}
        this._selectedclass = {}
        this._selectedgearbox = {}
        makeAutoObservable(this)
    }

    setBrand(brand){
        this._brand = brand;
    }
    setModel(model){
        this._model = model;
    }
    setClass(carclass){
        this._carclass = carclass;
    }
    setCargroup(cargroup){
        this._cargroup = cargroup;
    }
    setGearbox(gearbox){
        this._gearbox = gearbox;
    }
    setCars(cars){
        this._cars = cars;
    }
    setSelectedBrand(brand){
        this._selectedbrand = brand
    }

    setSelectedClass(carclass){
        this._selectedclass = carclass
    }

    setSelectedGearbox(gearbox){
        this._selectedgearbox = gearbox
    }

    get brand(){
        return this._brand
    }
    get model(){
        return this._model
    }
    get carclass(){
        return this._carclass
    }
    get cargroup(){
        return this._cargroup
    }
    get gearbox(){
        return this._gearbox
    }
    get cars(){
        return this._cars
    }
    get selectedBrand(){
        return this._selectedbrand
    }
    get selectedclass(){
        return this._selectedclass
    }
    get selectedgearbox(){
        return this._selectedgearbox
    }
}