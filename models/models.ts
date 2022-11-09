import { stringify } from "querystring";
import { fetchData, writeData, writeUpdatedData } from "../utils/util";

export const findAllData = async function (){
    const allData = await fetchData();
    return allData
}


export const findById = async function(id: number){
    const data = await fetchData().find((info:IProduct) => info.id === id );
    return data          
}

export const createData = async function(details: InewProduct){
    const allData = await fetchData();
    let lastIndex = allData.length;
    if (lastIndex == 0){
        lastIndex = 1
    }else if((lastIndex !== 0)){
        lastIndex =  allData[lastIndex - 1].id + 1
    }
    const {name, image, brand, category, description, price, countInStock, rating, numReviews} = await details;
    // const emailValidator = allData.find((data)=> data.email === email);
    // if (emailValidator) throw new Error('User already exists');
    const productID = lastIndex;
    const product: InewProduct = {
        "id": productID,
        "name": name,
        "image": image,
        "brand": brand,
        "category": category,
        "description": description,
        "price": price,
        "countInStock": countInStock,
        "rating": rating,
        "numReviews": numReviews
    }
    
    writeData(product, allData);

    return product;

}

export const updateData = async function(update: IupdateProduct){
    const allData = await fetchData();
    const {id, name, image, brand, category, description, price, countInStock, rating, numReviews} = await update;
    const index = allData.findIndex((data) => data.id == id)
    for (let data of allData){
        if (data.id == id){
            data["name"] = name || data.name;
            data["image"]= image || data.image;
            data["brand"]= brand || data.brand;
            data["category"]= category || data.category;
            data["description"]= description || data.description;
            data["price"]= price || data.price;
            data["countInStock"]= countInStock || data.countInStock;
            data["rating"]= rating || data.rating;
            data["numReviews"] = numReviews || data.numReviews;
        }
    }
    writeUpdatedData(allData);
    return allData;
    
}



export const deleteData = async function(id: number){
    const allData = await fetchData();
    const index = allData.findIndex((info:IProduct) => info.id === id );
    if (index === -1){
        return -1;
    }
    allData.splice(index, 1);
    // Rewrite the database
    writeUpdatedData(allData);
    return allData          
}

export const createNewUser = function (id:string, name:string, email:string, password: string, gender: string, phone:string, address:string) {
    const newUser:Iuser = {
        id: id,
        fullname: name,
        email: email,
        password: password,
        gender: gender,
        phone: phone,
        address: address
    }
    return newUser;
}