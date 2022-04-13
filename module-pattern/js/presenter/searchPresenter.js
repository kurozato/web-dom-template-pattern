import {URLQueryHepler} from '../utility/urlQueryHepler.js';
//import { SearchService } from './model/searchService.js';
//import { SearchView } from '../view/searchView.js';

export class SearchPresenter{
    /**
     * @type {SearchView}
     */
    #view;
    /**
     * @type {SearchService}
     */
    #service;

    /**
     * 
     * @param {SearchView} view 
     * @param {SearchService} service 
     */
    constructor(view, service){
        this.#view = view;
        this.#service = service;

        this.#view.setClickSearch(() => this.getData());
    }

    initialize(){       
        const params = URLQueryHepler.deserialize();
        this.#view.initHeader(params);

        if(URLQueryHepler.containHash('#submit'))
            this.getData();
        else
            this.#view.initContent();
    }

    getData(){
        const view = this.#view;
        const service = this.#service;
        view.initContent();
        const model = view.getModel();
        URLQueryHepler.replace({params: model, hash: 'submit', method: 'presenter.getData'});
        service
            .getMainData(model)
            .then(data => view.drawContent(data));
    }
}