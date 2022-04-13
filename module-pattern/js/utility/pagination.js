export class Pagination{
/*** const ***/          
    #NON_OMIT = -1;
    #FL_OMIT = 0;
    #FLM_OMIT = 1;

    #DATA_KEY_PAGE_NO = 'page';
    #DATA_KEY_CUR_PAGE = 'currentPage';
    #DATA_KEY_PER_PAGE = 'perPage';  
/*** const ***/   
/*** params ***/
    #current = -1;
    #max = 0;
    #elementId = '';
    #elementId;
    #data = {};
    #callback;
    #content;
/*** params ***/

    /**
    * 
    * @param {string} id 
    * @param {string} ariaLabel 
    * @param {string} dataPage 
    * @param {boolean} active
    * @param {string} text 
    * @param {HTMLElement} content 
    */
    #addLiElement(id, ariaLabel, dataPage, active, text, content){
        const _li = document.createElement('li');
        _li.classList.add('page-item');
        if(active === true)
            _li.classList.add('active');
        _li.id = id;
        _li.setAttribute('style','cursor:pointer;');

        const _a = document.createElement('a');
        _a.classList.add('page-link');
        _a.setAttribute('aria-label',ariaLabel);
        _a.setAttribute('data-page',dataPage);
        _a.textContent = text;

        _li.append(_a);

        content.append(_li);
    };

    /**
     * 
     * @param tagName 
     * @param id 
     * @param text 
     * @returns {HTMLElement}
     */
    #buildSimpleElement(tagName, id, text){
        const _elem = document.createElement(tagName);
        _elem.id = id;
        _elem.textContent = text;
        return _elem;
    };   



    /**
         * 
         * @param {Number} max 
         * @param {Number} current 
         * @param {HTMLElement} ul 
         * @param {HTMLElement} element 
         */
    #simplePaging(current, ul){
       
        this.#addLiElement(`${this.#elementId}_page-item-f`, 'First', 'f', false, '«', ul);
        this.#addLiElement(`${this.#elementId}_page-item-p`, 'Previous', 'p', false, '<', ul);

        for (let i = 1; i <= this.#max; i++) {
            const _i = i.toString();
            this.#addLiElement('page-item-' + _i, '', _i,  i === current, _i, ul);
        }
        
        this.#addLiElement(`${this.#elementId}_page-item-n`, 'Next', 'n', false, '>', ul);
        this.#addLiElement(`${this.#elementId}_page-item-l`, 'Last', 'l', false, '»', ul);
     };
     
     /**
      * 
      * @param {Number} max 
      * @param {Number} current 
      * @param {HTMLElement} ul 
      * @param {HTMLElement} element 
      */
    #firstOmitPaging(current, ul){
        const _max = this.#max.toString();
        
        this.#addLiElement(`${this.#elementId}_page-item-f`, 'First', 'f', false, '«', ul);
        this.#addLiElement(`${this.#elementId}_page-item-p`, 'Previous', 'p', false, '<', ul);

        for (let i = 1; i <= 5; i++) {
            const _i = i.toString();
            this.#addLiElement('page-item-' + _i, '', _i,  i === current, _i, ul);
        }
        /*** Omit ***/
        this.#addLiElement(`${this.#elementId}_page-item-o`, 'Omit', 'o', false, '...', ul);
        this.#addLiElement('page-item-' + _max, '', _max,  false, _max, ul);
        /*** Omit ***/
        this.#addLiElement(`${this.#elementId}_page-item-n`, 'Next', 'n', false, '>', ul);
        this.#addLiElement(`${this.#elementId}_page-item-l`, 'Last', 'l', false, '»', ul);
     };
 
     /**
      * 
      * @param {Number} max 
      * @param {Number} current 
      * @param {HTMLElement} ul 
      * @param {HTMLElement} element 
      */
    #lastOmitPaging(current, ul){
       
        this.#addLiElement(`${this.#elementId}_page-item-f`, 'First', 'f', false, '«', ul);
        this.#addLiElement(`${this.#elementId}_page-item-p`, 'Previous', 'p', false, '<', ul);
        /*** Omit ***/
        this.#addLiElement('page-item-' + '1', '', '1',  false, '1', ul);
        this.#addLiElement(`${this.#elementId}_page-item-o`, 'Omit', 'o', false, '...', ul);
        /*** Omit ***/
        for (let i = this.#max - 4; i <= this.#max; i++) {
            const _i = i.toString();
            this.#addLiElement('page-item-' + _i, '', _i,  i === current, _i, ul);
        }

        this.#addLiElement(`${this.#elementId}_page-item-n`, 'Next', 'n', false, '>', ul);
        this.#addLiElement(`${this.#elementId}_page-item-l`, 'Last', 'l', false, '»', ul);
     };
 
     /**
      * 
      * @param {Number} max 
      * @param {Number} current 
      * @param {HTMLElement} ul 
      * @param {HTMLElement} element 
      */
    #midOmitPaging(current, ul){
        const _max = this.#max.toString();
        
        this.#addLiElement(`${this.#elementId}_page-item-f`, 'First', 'f', false, '«', ul);
        this.#addLiElement(`${this.#elementId}_page-item-p`, 'Previous', 'p', false, '<', ul);
        /*** Omit ***/
        this.#addLiElement('page-item-' + '1', '', '1',  false, '1', ul);
        this.#addLiElement(`${this.#elementId}_page-item-o`, 'Omit', 'o', false, '...', ul);
        /*** Omit ***/
        for (let i = current - 2; i <= current + 2; i++) {
            const _i = i.toString();
            this.#addLiElement('page-item-' + _i, '', _i,  i === current, _i, ul);
        }
        /*** Omit ***/
        this.#addLiElement(`${this.#elementId}_page-item-o`, 'Omit', 'o', false, '...', ul);
        this.#addLiElement('page-item-' + _max, '', _max,  false, _max, ul);
        /*** Omit ***/
        this.#addLiElement(`${this.#elementId}_page-item-n`, 'Next', 'n', false, '>', ul);
        this.#addLiElement(`${this.#elementId}_page-item-l`, 'Last', 'l', false, '»', ul);
     };

    #pagingFactory(){
        let OMIT = this.#FL_OMIT;

        if(this.#max < 7)
            OMIT =  this.#NON_OMIT;
        if(10 <= this.#max)
            OMIT = this.#FLM_OMIT;

        switch (OMIT) {
            case this.#NON_OMIT:
                return this.#simplePaging;
                //break;
            case this.#FL_OMIT:
                if(this.#current < 5) return this.#firstOmitPaging;
                else return this.#lastOmitPaging;
                //break;
            case this.#FLM_OMIT:
                if(this.#current < 5) return this.#firstOmitPaging;
                else if(this.#max - 3 <= this.#current) return this.#lastOmitPaging;
                else return this.#midOmitPaging;
                //break;      
        }
    };

    /**
     * 
     * @param current 
     * @param ul 
     */
    #paging(current, ul){
        const funcPaging = this.#pagingFactory();
        ul.innerHTML = '';
        this.#current = current;
        funcPaging(current, ul);
        ul.dataset[this.#DATA_KEY_CUR_PAGE] = current;
    }

    /**
     * 
     * @param {HTMLElement} element 
     * @param {Array | Object} data 
     * @param {number} numPerPage 
     * @param {HTMLElement} content 
     * @param {Function} callback 
     */
    #setEventPageClick(element){
        const elems = element.getElementsByClassName('page-item');
            for (let i = 0; i < elems.length; i++) {
            elems[i].addEventListener(
                'click',
                (e) => this.#pageChange(e.target.dataset[this.#DATA_KEY_PAGE_NO], element), 
                false);        
        }
    };
        
    /**
     * 
     * @param {String} page 
     */
    #getNextPage(page){
        switch(page){
            case 'f': return 1;
            case 'p': return this.#current - 1;
            case 'n': return this.#current + 1;
            case 'l': return this.#max;
            case 'o': return this.#current
            default: return page;
        }
    };

   /**
     * 
     * @param {String} page 
     * @param {Number} max 
         * @param {HTMLElement} element 
     * @param {Array | Object} data 
     * @param {HTMLElement} content 
     * @param {Function} callback 
     * @returns 
     */
    #pageChange = function(page, element){
        const _ul = document.getElementById(`${this.#elementId}_u-pagination-page-item`);
        const _info = document.getElementById(`${this.#elementId}_box-pagination-page-info`);
        const _next = Number(this.#getNextPage(page));
        const _pageSize = Number(_info.dataset[DATA_KEY_PER_PAGE]);

        if(_next === this.#current || _next < 1 || this.#max < _next) return;

        this.#paging(_next, _ul);
        this.#setEventPageClick(element);
      
        const _from = _pageSize * (_next - 1);
        const _to = _pageSize * _next;
        const _view = this.#data.slice(_from, _to);

        const _pageInfo = document.createElement('div');
        _pageInfo.classList.add('col');

        _pageInfo.append(
           this.#buildSimpleElement('span','from-item-amnt', (_from + 1).toString()),
           this.#buildSimpleElement('span','from-to-item', '-'),
           this.#buildSimpleElement('span','to-item-amnt', (_from + _view.length).toString()),
           this.#buildSimpleElement('span','of-item-total-amnt', '/'),
           this.#buildSimpleElement('span','item-total-amnt', (this.#data.length).toString()),
        );
        _info.innerHTML = '';
        _info.append(_pageInfo);

        this.#callback(_next, _view, this.#content);
    };

    /**
     * 
     * @param {String} tagName 
     * @param {String} id 
     * @param {String} className 
     * @param {String} cssText 
     * @returns {Element}
     */
    #buildelement(tagName, id, className){
        const _elem = document.createElement(tagName);
        _elem.id = id;
        _elem.className = className;
        return _elem;
    };

    constructor(element, data, numPerPage, callback){
        if(element.id === undefined || element.id === null || element.id === '') {
            const _message = `'pageContent' element requires id.`;
            console.error(`${_message}`,'Element:', element);
            throw _message;
        }
    
        this.#elementId = element.id;
        this.#max = Math.ceil(data.length / numPerPage);
        this.#data = data;
        this.#callback = callback;
        this.#content = this.#buildelement('div',`${this.#elementId}_box-pagination-content`, 'col');

        element.innerHTML = '';
        
        const _nav = document.createElement('nav');
        const _ul = this.#buildelement('ul', `${this.#elementId}_u-pagination-page-item`, 'pagination justify-content-end');
        _nav.setAttribute('aria-label','Page navigation');
        this.#paging(0, _ul);
        _nav.append(_ul);

        const _div = this.#buildelement('div','', 'row');
        const _pageInfo = this.#buildelement('div',`${this.#elementId}_box-pagination-page-info`, 'col');
        const _pageItem = this.#buildelement('div',`${this.#elementId}_box-pagination-page-item`, 'col');
        _pageInfo.dataset[this.#DATA_KEY_PER_PAGE] = numPerPage;
        _pageItem.append(_nav)
        _div.append(_pageInfo, _pageItem);

        element.append(this.#content, _div);         
        this.#pageChange('1', element);
    };
}; 
    
    