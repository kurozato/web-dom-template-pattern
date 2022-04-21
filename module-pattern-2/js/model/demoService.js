import { ApiHelper } from '../utility/apiHelper.js';

export class DemoService{
    #URL_GET_MAIN_DATA = './SinglePage/Get';

    getMainData(data){
        return ApiHelper.get(this.#URL_GET_MAIN_DATA, data);
    }

    getDetailData(data){
        return ApiHelper.get(this.#URL_GET_MAIN_DATA, data);
    }

    getUserId(data){
        return ApiHelper.get(this.#URL_GET_MAIN_DATA, data)
            .then(data =>{
                if(data === undefined || data === null || data.id === undefined)
                    throw new Error(`not get data`);

                return data;
            })
    }

    upload(formData){
        return ApiHelper.post(this.#URL_GET_MAIN_DATA, {formData:formData});
    }
    
    getLastUploadData(data){
        return ApiHelper.get(this.#URL_GET_MAIN_DATA, data);
    }
}