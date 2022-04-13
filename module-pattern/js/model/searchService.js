import { ApiHelper } from '../utility/apiHelper.js';

export class SearchService{
    #URL_GET_MAIN_DATA = './SinglePage/Get';

    getMainData(data){
        return ApiHelper.get(this.#URL_GET_MAIN_DATA, data);
    }
}