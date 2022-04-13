import { SearchService } from './model/searchService.js';
import { SearchView } from './view/searchView.js';
import { SearchPresenter } from './presenter/searchPresenter.js';

export class Container{
    constructor(){
        //serice
        const service = new SearchService();
        //view
        const view = new SearchView();
        //presenter
        const presenter = new SearchPresenter(view, service);
    }
}