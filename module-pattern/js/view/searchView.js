import {UIOperator} from '../utility/UIOperator.js'

export class SearchView{

    constructor(){
        
    };

    setClickSearch(fn){
        document.getElementById('search-item').addEventListener('click', () => fn(), false);
    }

    getModel(){
        return {
            keywords: document.getElementById('search-words').value
        };
    }

    initHeader(params){
        for (const [key, value] of Object.entries(params)) {
            const elems = document.getElementsByName(key);
            for (let index = 0; index < elems.length; index++) {
                const element = elems[index];
                if(element.tagName.toUpperCase() === 'INPUT')
                    element.value = value;
                
            }  
        }
    }

    initContent(){
        document.getElementById('mainContent').innerHTML = '';
    }

    drawContent(data){
        const content = document.getElementById('mainContent')
        UIOperator.buildSimpleTables({
            element: content,
            columns:[
                {data: "No", title:"#" , class:"col-width-1", visible:true, render: null, customAttribute:`scope="col"`},
                {data: "Name", title:"Name" , class:"col-wd-5", visible:true, render: null},
                {data: "Age", title:"Age" , class:"col-wd-2", visible:true, render: (data) => {return `<small>${data}</small>`;}},
                {data: "Id", title:"ID" , class:"", visible:fales, render: null}
            ],
            data: data});
    }

   
}