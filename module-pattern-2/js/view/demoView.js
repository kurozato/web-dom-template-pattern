import {UIOperator} from '../utility/UIOperator.js'

export class DemoView{

    //CONST KEYS
    #KEY_ITEM_XXX = 'itemXxx';
    #KEY_ITEM_XXX_OLD = 'itemXxx';

    //for link event
    #callFunc = {};


    constructor(){
        //search
        document.getElementById('search-item').addEventListener('click', (e) => this.#callFunc['clickSearch'](), false);

        //file upload
        const confrimModal = new bootstrap.Modal(document.getElementById('confrimModal'));
        const waitMmodal = new bootstrap.Modal(document.getElementById('waitMmodal'));
        document.getElementById('One').addEventListener('click', (e)=>{
            const files =  document.getElementById('uploadFile').files;
            if(files.length > 0){
                confrimModal.hide();
                waitMmodal.show();
                this.#callFunc['dropFile'](files[0], {flg:'One'});
            }
               
        }, false);

        window.addEventListener('popstate', (e) => this.#callFunc['changeState'](), false);
    }

     /*** method ***/

    initHaeder(){
        const item = localStorage.getItem(this.#KEY_ITEM_XXX);
        this.setHeader({item:item});
        //...
    }

    initSide(){
        document.getElementById('side').innerHTML = '';
    }

    initMain(){
        document.getElementById('main').innerHTML = '';
        //...

        /*** event ***/

        //last upload
        document.getElementById('Last-uplodad').addEventListener('click', (e) => this.#callFunc['clickLastData'](), false);

        //drag drop
        document.body.addEventListener('drop', (e) => {
            e.stopPropagation();
            e.preventDefault();
        }, false);
        document.getElementById('dropZone').addEventListener('drop', (e) =>{
            e.stopPropagation();
            e.preventDefault();
            document.getElementById('uploadFile').files = e.dataTransfer.files;
            const confrimModal = new bootstrap.Modal(document.getElementById('confrimModal'), options);
            confrimModal.show();
        }, false);
        
    }

    setHeader(data){
        document.getElementById('search-item').value = data.searchItem;
        //...
    }

    /**
     * 
     * @param {[]} data 
     */
    drawSide(data){
        const waitMmodal = new bootstrap.Modal(document.getElementById('waitMmodal'));
        waitMmodal.hide();

        const table = document.createElement('table');
        const tbody = document.createElement('tbody');
        
        for(let i = 0, l = data.length; i < l; i++){
            const row = data[i];
            const tr = document.createElement('tr');
            let inner = ''
            inner = inner + '<div>';
            inner = inner + `<div class="badge-sm-${row.badge}" >${row.Class}</div>`;
            inner = inner + `<div>${row.Id}</div>`;
            inner = inner + `<div>${row.Name}</div>`;
            inner = inner + `<div>${row.Notes}</div>`;
            inner = inner + '</div>';
            tr.innerHTML = inner;
            tr.addEventListener('click', (e) => this.#callFunc['clickSide'](row), false);

            tbody.append(tr);
        }
        table.append(tbody);

        document.getElementById('sideFilter').addEventListener('input', (e)=>
        {   
            UIOperator.filter(
                table,
                'tr',
                (tr) => UIOperator.likeMatch(e.target.value, tr));
        });     
    }

    drawMain(data){
        UIOperator.buildSimpleTables({
            element:document.getElementById('result'),
            columns:[
                {column:'#', title:'No', class:'col-wd-1'},
                {column:'Id', title:'', class:'col-wd-3'},
                {column:'Nm', title:'', class:'col-wd-4'},
                {column:'Len', title:'', class:'col-wd-4'},
                {column:'Type', title:'', class:'col-wd-4'},
                {column:'Notes', title:'', class:'col-wd-4'}
            ],
            data:data, 
            initialize:false});
    }

    keep(object){
        for (const [key, val] in Object.entries(object)){

            switch(key){
                case this.#KEY_ITEM_XXX:
                    localStorage.setItem(key, val);
                    break;
                case this.#KEY_ITEM_XXX_OLD:
                    localStorage.setItem(key, val);
                    break;
            }
        }
    }

    /*** model ***/

    get viewModel(){}
    get userId(){}
    get lastItem(){}
   
    /*** link event ***/

    clickSearch(fn){ this.#callFunc['clickSearch'] = fn; }
    changeState(fn){ this.#callFunc['changeState'] = fn; }
    clickSide(fn){ this.#callFunc['clickSide'] = fn; }
    dropFile(fn){ this.#callFunc['dropFile'] = fn; }
    clickLastData(fn){ this.#callFunc['clickLastData'] = fn; }
   
}