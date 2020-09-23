import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class DataService {
    private data = [];

    constructor() {
    }

    /**
     * Set the value in the data table
     *
     * @param key The key to store data
     * @param value The value to store
     */
    setData(key, value) {
        this.data[key] = value;
    }

    /**
     * Return some data by it's id
     *
     * @param key The key of the data
     */
    getData(key) {
        return this.data[key];
    }
}
