import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions} from '@angular/http';
import { CommanService } from '../shared/services/comman.service';
import tsConstants = require('../tsconstant');

@Injectable()

export class Coins_packageService {
	
	constructor (private _http:Http, private _commanService : CommanService){

	}

	private _host = tsConstants.HOST;
	private _accessToken = '';

	private getHeaders() {
	this._accessToken   = this._commanService.getAccessToken();
		let headers = new Headers();
		headers.append('Authorization', this._accessToken);
		let options = new RequestOptions({headers: headers})
		return options;
	}

	getAllRecords(rowsOnPage, activePage, sortTrem , search = '') {

        let url = this._host +'/getAllCoinsPackages?count='+rowsOnPage+'&page='+activePage+'&sortBy='+sortTrem+'&search='+search;
        return this._http.get(url, this.getHeaders()).map((res:Response) => res.json())
    }

	getRecordById(id){
		return this._http.get(this._host +'/getCoinsPackageById/'+ id, this.getHeaders()).map((res:Response) => res.json())
	}

	addRecord(field){
		return this._http.post(this._host +'/addCoinsPackage',field, this.getHeaders()).map((res:Response) => res.json());
	}

	editRecord(field){
		return this._http.put(this._host+'/editCoinsPackage/'+field.id,field, this.getHeaders()).map((res:Response) => res.json());
	}

	deleteRecord(Id){
		return this._http.delete(this._host+'/removeCoinsPackage/'+Id, this.getHeaders()).map((res:Response) => res.json())
	}

}