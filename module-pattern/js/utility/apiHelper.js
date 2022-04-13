export class ApiHelper{

    static get(url, data={}){
        return fetch(url,
            {
                method: 'GET',
                headers: {
                  'Content-Type': ' application/json; charset=UTF-8' 
                },
                body: JSON.stringify(data)
            })
            .then(res => {
                if(!res.ok)
                throw new Error(`fetch: ${res.status} ${res.statusText}`);
                return res.json()
            });
    }

    static post(url, formData){
        return fetch(url,
            {
                method: 'POST',
                body: formData
            })
            .then(res => {
                if(!res.ok)
                throw new Error(`fetch: ${res.status} ${res.statusText}`);
                return res.json()
            });
    }
}