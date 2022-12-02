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
        this._class = [
            {id:1, name: "premium"}
        ]
        this._gerbox = [
            {id:1, name: "fuel"}
        ]
        this._color = [
            {id:1, name: "silver"}
        ]
        this._cars = [
            {id:1, brand_id:1, class_id:1, model_id:1, gearbox_id:1, year:2017, consumption: 200, seats: 4, cost: 140, image:'/src/images/t.jpg'},
            {id:2, brand_id:2, class_id:2, model_id:2, gearbox_id:2, year:2017, consumption: 200, seats: 4, cost: 140, image:'/src/images/t.jpg'},
            {id:1, brand_id:1, class_id:1, model_id:1, gearbox_id:1, year:2017, consumption: 200, seats: 4, cost: 140, image:'/src/images/t.jpg'},
            {id:4, brand_id:1, class_id:1, model_id:1, gearbox_id:1, year:2017, consumption: 200, seats: 4, cost: 140, image:'/src/images/t.jpg'},
            {id:1, brand_id:1, class_id:1, model_id:1, gearbox_id:1, year:2017, consumption: 200, seats: 4, cost: 140, image:'/src/images/t.jpg'},
        ]
        this._selectedbrand = {}
        makeAutoObservable(this)
    }

    setBrand(brand){
        this._brand = brand;
    }
    setModel(model){
        this._model = model;
    }
    setClass(car_class){
        this._class = car_class;
    }
    setColor(car_color){
        this._color = car_color;
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
    get car_class(){
        return this._car_class
    }
    get car_color(){
        return this._car_color
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