export function getDayFromat(value){
   let now = new Date();
    let curent = now.getDate() + "-" + (now.getMonth() + 1 ) + "-" + now.getFullYear();
    now.setMonth((now.getMonth() + 1 ) + parseInt(value) );
    let format = now.getDate() + "-" + now.getMonth() + "-" + now.getFullYear();
    return {curent, format};
}

export const getMonthName = (value, valShow) => {
    let now = new Date();
    let data = [];
    let dataShow = [];
    
    for(let i = value; i >= 1; i--) {
        let val = ("0"+((now.getMonth() + 1 ) - i )).slice(-2); 
        let values = valShow.get(val) ? valShow.get(val) : 0;
        dataShow.push(values);

        let date = new Date()
        date.setMonth(now.getMonth() - i);
        let value = date.toLocaleDateString('default', {month : 'short'});
        data.push(value);
    }

    return {month: data, values : dataShow};
}
