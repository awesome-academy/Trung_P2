export const handleValueInSubmit = (idRoot, values, status, cateById) => {
    if(idRoot) {
        values.root = idRoot.root
        values.parent_id = parseInt(values.parent_id);
    }else {
        values.root = "";
    }

    if(status === "create") {

        return { type : "create", values }

    } else if(status === "update") {
        let root, parent_id;
        if(values.parent_id === "root"){
            root = cateById.id;
            parent_id = cateById.id;
        }
        console.log(idRoot, values, root, cateById)
        let value = {
            id : cateById.id,
            name : values.name,
            root : root ?? parseInt(idRoot.root),
            parent_id : parent_id ?? parseInt(values.parent_id)
        };
        console.log(value, idRoot, values)
        let check = JSON.stringify(value) === JSON.stringify(cateById);

        let result = check ?  {type : "update"} :  { type : "update", value, id : cateById.id };
        return result;
    }
}