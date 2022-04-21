export class ApiHelper{

    static get(url, data={}){
        const param = new URLSearchParams(data).toString();
        return fetch(`${url}?${param}`,
            {
                method: 'GET',
                headers: {
                  'Content-Type': ' application/json; charset=UTF-8' 
                }
            })
            .then(res => {
                if(!res.ok)
                    throw new Error(`fetch: ${res.status} ${res.statusText}`);
                    
                return res.json()
            });
    }

    static post(url, option){
        if(option.formData !== undefined)
        return fetch(url,
            {
                method: 'POST',
                body: option.formData
            })
            .then(res => {
                if(!res.ok)
                    throw new Error(`fetch: ${res.status} ${res.statusText}`);

                return res.json()
            });

        if(option.data !== undefined)
        return fetch(url,
            {
                method: 'POST',
                headers: {
                  'Content-Type': ' application/json; charset=UTF-8' 
                },
                body: JSON.stringify(option.data)
            })
            .then(res => {
                if(!res.ok)
                    throw new Error(`fetch: ${res.status} ${res.statusText}`);

                return res.json()
            });

    }
}