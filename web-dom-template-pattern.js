//sample: use axious 
;(function(){

    const MARK_SUBMIT = 'submit';
    const URL_GET_MAIN_DATA = './Data/Get';
    
    const sideMenuFactory = function(data){
        const result = document.getElementById('result');
        const _input = document.getElementById('sideMenufilter')
        const _table = document.createElement('table');
        const _tbody = document.createElement('tbody');
        const max = data.length;
        let _tr;
        let row;
        let _inner;
        for(let i = 0; i < max; i++){
            _tr = document.createElement('tr');
            row = data[i];
            _inner = '';
            _inner = _inner + `<td><div class="row" >${row.Title}</div>`;
            _inner = _inner + `<div class="row" ><div>${row.ID}</div><div class="mark_detail">Detail...</div></div>`;
            _inner = _inner + `<div class="row" >${row.Notes}</div></td>`;
            
            _tr.innerHTML = _inner;
            _tr.addEventListener('click', ()=> getDetailData(row.ID), false);
            _tbody.appendChild(_tr);
        };
        _table.appendChild(_tbody);
        result.appendChild(_table);

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

        axios.get(URL_GET_MAIN_DATA, data)
            .then(function (response) {// success part
                sideMenuFactory(response.data);
            })
            .catch(function (error) {  // handle error
                console.log(error);
            })
            .finally(function () {// always executed
                buttonSearch.disabled = fales;
            });
    };

    const getDetailData = function(id){
        const _resultD = document.getElementById('resultD');
        _resultD.innerHTML = '';

        //...do something
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
            const _uParam = whiteSuggar.url.userCustomSerialize(
                                    MARK_SUBMIT, 
                                    window.location.hash);

            if(_uParam.length > 0 && _uParam[0].name === 'ID'){
                getDetailData(_uParam[0].value);
            };
        };

    };

    initilize();
})();