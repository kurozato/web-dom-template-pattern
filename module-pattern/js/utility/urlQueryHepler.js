export class URLQueryHepler{
    
         /**
         * string -> object
         * @param {string} query 
         * @returns {Object}
         */
        static deserialize(){

            const _url = new URL(window.location.href);
            
            const _obj = {}
            for(const [key, value] of _url.searchParams.entries()){
                _obj[key] = value;
            }
            return _obj;
        };

        /**
         * replace url part of search and hash
         * @param {{params:object, method:string, hash:string} } data 
         */
        static replace(data){
            const _url = new URL(window.location.href);
            const state = {type:'change', method: data.method, src:'URLQueryHepler.replace'};
            const unused = '';

            if(data.params !== undefined && data.params !== null && Object.keys(data.params).length > 0)
                _url.search = new URLSearchParams(data.params).toString();

            if(data.hash !== undefined && data.hash !== null && data.hash !== '#')
                _url.hash = data.hash.replace('#', '');
            
            window.history.pushState(state, unused ,_url);
        };

        /**
         * 
         * @param {string} hash 
         * @param {boolean} likeMatch 
         * @returns {boolean}
         */
        containHash(hash, likeMatch = false){
            const _hash = hash.replace('#', '');
            if(likeMatch)
                return window.location.hash.indexOf(_hash) > 0;
            
            return window.location.hash === '#' + _hash;
        };
}