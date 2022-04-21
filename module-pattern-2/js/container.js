import { DemoService } from './model/demoService';
import { DemoView } from './view/demoView';
import { DemoPresenter } from './presenter/demoPresenter';

export class Container{
    constructor(){
        //serice
        const service = new DemoService();
        //view
        const view = new DemoView();
        //presenter
        const presenter = new DemoPresenter(view, service);

        presenter.initialize();
    }
}