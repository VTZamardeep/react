/**utility to store values in localstorage */

/*this function stores the values 
parameters will be name of lacalstorage and data to be stored*/
export const setLocalStorage=(name,data)=>{
    if(Object.keys(data).length>0){
        data=JSON.stringify(data);
    }
    return window.localStorage.setItem(name, data);
}

/**this function will get the data from storage 
 * parameter will be name of localstorage
 */
export const getLocalStorage=(name)=>{
   return window.localStorage.getItem(name)
}