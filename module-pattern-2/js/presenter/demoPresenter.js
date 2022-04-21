import { URLQueryHepler } from '../utility/urlQueryHepler.js';
import { DemoService } from '../model/demoService.js';
import { DemoView } from '../view/demoView.js';

export class DemoPresenter{
    /**
     * @type {DemoView}
     */
    #view;
    /**
     * @type {DemoService}
     */
    #service;

    /**
     * 
     * @param {DemoView} view 
     * @param {DemoService} service 
     */
    constructor(view, service){
        this.#view = view;
        this.#service = service;

       this.#linkEventOfView();    
    }

    #linkEventOfView(){
        const view = this.#view;

        view.clickSearch(() => this.getMainData());
        view.clickSide((data) => this.getDetailData(data));
        view.clickLastData(() => this.getLastUploadData());
        view.dropFile((file, item) => this.uploadFile(file, item));
        view.changeState(() => this.drawView());       
    }


    initialize(){     
        const view = this.#view;
        const service = this.#service;

        if(view.userId === null || view.userId ===''){
            service.getUserId(view.userId)
            .then(data => view.keep({userId: data.id}));
        }

        this.drawView();
    }

    drawView(){
        const view = this.#view;

        view.initHaeder();
        view.initSide();
        view.initMain();
        
        const param = URLQueryHepler.deserialize();
        view.setHeader(param);

        if(URLQueryHepler.containHash('#submit')){
            if(param.userId !== undefined && param.userId !== '' && param.userId === '-')
                this.getMainData();
            else
                this.getLastUploadData(param);
            
            if(param.key !== undefined && param.key !== '')
                this.getDetailData(param);
        }
    }

    getMainData(){
        const view = this.#view;
        const service = this.#service;

        view.initSide();
        view.initMain();

        const model = view.viewModel;
        view.keep({item: model.item});

        URLQueryHepler.replace({params: model, hash: 'submit', method: 'presenter.getMainData'});
        service.getMainData(model)
            .then(data => view.drawSide(data))
            .catch(()=> {
                view.initSide(); 
                view.initMain();});
    }

    getDetailData(data){
        const view = this.#view;
        const service = this.#service;

        view.initMain();

        const model = URLQueryHepler.deserialize();
        Object.assign(model, data);
        URLQueryHepler.replace({params: model, hash: 'submit', method: 'presenter.getMainData'});

        service.getDetailData(model)
            .then(data => view.drawMain(data))
            .catch(()=> view.initMain());

    }

    getLastUploadData(data){
        const view = this.#view;
        const service = this.#service;

        view.initSide();
        view.initMain();

        const model = {};
        model['userId'] = data.userId;
        model['item'] = data.lastItem;

        URLQueryHepler.replace({params: model, hash: 'submit', method: 'presenter.getLastUploadData'});    
        service.getLastUploadData(model)
            .then(data => view.drawSide(data))
            .catch(()=> {
                view.initSide(); 
                view.initMain();});
    }

    uploadFile(file, item){
        const view = this.#view;
        const service = this.#service;

        const formData = new FormData();
        formData.append('uploadFile', file);
        formData.append('item', item);
        formData.append('userId', view.userId);

        view.keep({lastItem: model.item});
     
        service.upload(formData)
            .then((data) => this.getLastUploadData(data));
    }
}