//sample: use axious 
;(function(){

    const MARK_SUBMIT = 'submit';
    const URL_GET_MAIN_DATA = './Data/Get';
    
    const tableFactory = function(data){
        const _columns = [ 
            {column:"ID",label:"ID", class:"w-auto", visible:true, render:null},
            {column:"Title",label:"Title", class:"w-20", visible:true, render:null},
            {column:"Content",label:"Content", class:"w-30", visible:true, render:null},
            {column:"Notes",label:"Notes", class:"w-30", visible:true, render:null}];

        const result = document.getElementById('result');
        const pagingContent = document.getElementById('pagingContent');
        const _div0 = document.createElement('div');
        _div0.classList.add('row'); 
        const _div1 = _div0.cloneNode();
        const _input = document.createElement('input');
        _input.id = 'tablefilter';
        _input.type = 'text';
        _input.placeholder = 'filter...';
        _input.classList.add('form-control','form-control-sm');
        const _table = document.createElement('table');
        _div0.appendChild(_input);
        _div1.appendChild(_table);
        result.appendChild(_div0);
        result.appendChild(_div1);

        whiteSuggar.paging.pagination(
            pagingContent,
            data,
            3,
            (pageNo, data) =>  whiteSuggar.paging.updateTable(_table, _columns, data));

        _input.addEventListener('input', (e) => {          
            whiteSuggar.filtering.filter(
                _table,
                'tr',
                (tr) => whiteSuggar.filtering.likeMatch(e.target.value, tr));
        });  
    };

    const searchData = function(){
        const form0 = document.getElementById('form0');
        const result = document.getElementById('result');
        const buttonSearch = document.getElementById('btnSearch');

        const data = new FormData(form0);

        const searchString = whiteSuggar.url.convertSearchString(data);
        //before get data
        whiteSuggar.url.replaceUrl(searchString, MARK_SUBMIT);
     
        result.innerHTML = '';
        buttonSearch.disabled = true;

        axios.get(URL_GET_MAIN_DATA, {params: serializeObject(data)})
            .then((response) => tableFactory(response.data))
            .catch((error) => { console.log(error); })
            .finally(() => { buttonSearch.disabled = fales; });
    };

    const serializeObject = function (formData) {
        let obj = {};
        for (let key of formData.keys()) {
            obj[key] = formData.get(key);
        }
        return obj;
    };
    
    const reflectForm = function(data){
        const max = data.length;
        if(data === null || max === 0)
            return null;

        let row;
        for(let i = 0; i < max; i++){
            row = data[i];
            const elems = document.getElementsByName(row.name);
            elems.forEach((elem) => {
                if(elem.tagName === 'INPUT'){
                    elem.value = row.value;
                }
                if(elem.tagName === 'SELCT'){
                    const options = elem.getElementsByTagName('option');
                    for(let l = 0; l < options.length; l++){
                        if(options[l].innerText === row.value)
                            options[l].selected = true;
                    };
                }
                //...other element
            });
        };
    };

    const initilize = function(){

        document.getElementById('btnSearch')
            .addEventListener('click', () => searchData());

        reflectForm(
            whiteSuggar.url.querySerialize());

        if(window.location.hash.indexOf(MARK_SUBMIT) === 0){
            searchData();
        };

    };

    initilize();
})();
