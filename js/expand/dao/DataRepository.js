/**
 * Created by wificityios on 2017/6/5.
 */
export default class DataRepository{
    fetchNetRepositry(url){
        return new Promise((resolve, reject) => {
            fetch(url)
                .then(response=>response.json())
                .then(result=> {
                    resolve(result);
                })
                .catch(error=> {
                    reject(error);
                })
        })
    }
}