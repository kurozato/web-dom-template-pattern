export class UIOperator{
    
    /*** filter ***/

    /**
     * 
     * @param {HTMLElement} element 
     * @param {string} elementName 
     * @param {Function} expression 
     */
    static filter(element, elementName, expression){
        const targets = element.getElementsByTagName(elementName);
        for(let i = 0; i < targets.length; i++){
            if(expression(targets[i]) === true){
                targets[i].style.display = '';
            }
            else{
                targets[i].style.display = 'none';
            }
        }
    };

    /**
     * return row content contain 'key'.
     * @param {string} key -  key
     * @param {HTMLElement} element - target
     * @returns {boolean}
     */
    static likeMatch(key, element) {
        return element.innerText.indexOf(key) > -1;
    };

    /**
     * return row content equal 'key'.
     * @param {string} key -  key
     * @param {HTMLElement} element - target
     * @returns {boolean}
     */
    static match(key, element) {
        return element.innerText === key;
    };

    /*** table ***/

    /**
     * 
     * @param {String} tagName 
     * @param {String} id 
     * @param {String} className 
     * @param {String} cssText 
     * @returns {Element}
     */
    static #buildelement(tagName, id, className, cssText){
        const _elem = document.createElement(tagName);
        _elem.id = id;
        _elem.className = className;
        _elem.style.cssText = cssText;
        return _elem;
    };

    /**
     * make view table
     * @param {{element:HTMLElement, columns:[{column:string,title:string,class:string,visible:boolean,render:Function,customAttribute:string}], data:[], initialize:Boolean}} config
     */
    static buildSimpleTables(config){
    
        if(config.initialize)
            config.element.innerHTML = '';
        
        const _data = config.data;
        const _columns = config.columns;

        const _box = this.#buildelement('div', 'updateContent', 'upd-simple-container', null);
        const _boxH = this.#buildelement('div', 'updateHeader', 'upd-simple-header', 'overflow:hiden;');
        const _boxD = this.#buildelement('div', 'updateDetail', 'upd-simple-detail', 'overflow:auto;');
        const _tableH = this.#buildelement('table', 'updateTableH', 'upd-simple-table-title', null);
        const _tableD = this.#buildelement('table', 'updateTableD', 'upd-simple-table-content', null);
    
        let _inner = '';
        let _col = {data:"", title:"" ,class:""};
        for(let i = 0, l = _columns.length; i < l; i++){
            _col = _columns[i];
            if(_col.visible === false)
                _inner += `<th scope="col" class="${_col.class}" style="display:none;">${_col.title}</th>`;
            else
                _inner += `<th scope="col" class="${_col.class}">${_col.title}</th>`;
        }
        _tableH.innerHTML = `<thead><tr>${_inner}</tr></thead>`;

        let _sw = 1; 
        let _class = '';
        let _customAttr = '';
        let _disp = '';
        for(let row = 0, l = _data.length; row < l; row++){
            const _tr = this.#buildelement('tr', '', '', '');
            _inner = '';

            _tr.className = (_sw === 1) ? 'odd' : 'even';
             
            for(let col = 0, l = _columns.length; col < l; col++){
                _col = _columns[col];
                _disp = (_col.visible === false) ? `style="display:none;"` : '';
                _class = (_col.class == null) ? '' : _col.class;
                _customAttr = (_col.customAttribute == null) ? '' : _col.customAttribute;

                if(_col.render == null)
                    _inner += `<td class="${_class}" ${_disp} ${_customAttr}>${_data[row][_col.data]}</td>`;
                else 
                    _inner += `<td class="${_class}" ${_disp} ${_customAttr}>${_col.render(_data[row])}</td>`;
            }
            _tr.innerHTML = _inner;
            _tableD.append(_tr);
            _sw *= -1;
        }
        _tableD.innerHTML = `<tbody>${_tableD.innerHTML}</tbody>`;

        _boxH.append(_tableH);
        _boxD.append(_tableD);

        _boxD.addEventListener('scroll', (e) => {_boxH.scrollLeft = _boxD.scrollLeft;}, false);
        _box.append(_boxH, _boxD)

        config.element.append(_box);
    };

    /**
     * add class 
     * @param {string} className 
     * @param {string[]} addClass 
     */
    static addClassByClassName(className, addClass){
        const _elems = document.getElementsByClassName(className);
        for (let i = 0, l = _elems.length; i < l; i++) {
            _elems[i].classList.add(addClass);               
        }
    };


};