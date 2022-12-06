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
            {id: 1, car_brand: "subaru", car_model: "outback", car_class: "middle", year: "2017", cost:"125$"},
            // {id: 2, car_brand: "toyota", car_model: "corolla", car_class: "premium", year: "2021", cost:"350$"}
        ]
        this._cars = [
            {id:1, car_number: "1234AA-7", carbrand: this._cargroup.car_brand, color: "black", image:'frontend/src/images/t.jpg'},
            {id:2, car_number: "1334WW-1",  carbrand: this._cargroup.car_brand, color: "white", image:'/src/images/t.jpg'},
            {id:3, car_number: "5834YT-7", carbrand: this._cargroup.car_brand, color: "black", image:'/src/images/t.jpg'},
            {id:4, car_number: "6538CC-5", carbrand: this._cargroup.car_brand, color: "red", image:'/src/images/t.jpg'},
            {id:5, car_number: "0905BN-6", carbrand: this._cargroup.car_brand, color: "silver", image:'/src/images/t.jpg'},
        ]
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
}