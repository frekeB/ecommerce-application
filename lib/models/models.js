"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createNewUser = exports.deleteData = exports.updateData = exports.createData = exports.findById = exports.findAllData = void 0;
const util_1 = require("../utils/util");
const findAllData = function () {
    return __awaiter(this, void 0, void 0, function* () {
        const allData = yield (0, util_1.fetchData)();
        return allData;
    });
};
exports.findAllData = findAllData;
const findById = function (id) {
    return __awaiter(this, void 0, void 0, function* () {
        const data = yield (0, util_1.fetchData)().find((info) => info.id === id);
        return data;
    });
};
exports.findById = findById;
const createData = function (details) {
    return __awaiter(this, void 0, void 0, function* () {
        const allData = yield (0, util_1.fetchData)();
        let lastIndex = allData.length;
        if (lastIndex == 0) {
            lastIndex = 1;
        }
        else if ((lastIndex !== 0)) {
            lastIndex = allData[lastIndex - 1].id + 1;
        }
        const { name, image, brand, category, description, price, countInStock, rating, numReviews } = yield details;
        // const emailValidator = allData.find((data)=> data.email === email);
        // if (emailValidator) throw new Error('User already exists');
        const productID = lastIndex;
        const product = {
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
        };
        (0, util_1.writeData)(product, allData);
        return product;
    });
};
exports.createData = createData;
const updateData = function (update) {
    return __awaiter(this, void 0, void 0, function* () {
        const allData = yield (0, util_1.fetchData)();
        const { id, name, image, brand, category, description, price, countInStock, rating, numReviews } = yield update;
        const index = allData.findIndex((data) => data.id == id);
        for (let data of allData) {
            if (data.id == id) {
                data["name"] = name || data.name;
                data["image"] = image || data.image;
                data["brand"] = brand || data.brand;
                data["category"] = category || data.category;
                data["description"] = description || data.description;
                data["price"] = price || data.price;
                data["countInStock"] = countInStock || data.countInStock;
                data["rating"] = rating || data.rating;
                data["numReviews"] = numReviews || data.numReviews;
            }
        }
        (0, util_1.writeUpdatedData)(allData);
        return allData;
    });
};
exports.updateData = updateData;
const deleteData = function (id) {
    return __awaiter(this, void 0, void 0, function* () {
        const allData = yield (0, util_1.fetchData)();
        const index = allData.findIndex((info) => info.id === id);
        if (index === -1) {
            return -1;
        }
        allData.splice(index, 1);
        // Rewrite the database
        (0, util_1.writeUpdatedData)(allData);
        return allData;
    });
};
exports.deleteData = deleteData;
const createNewUser = function (id, name, email, password, gender, phone, address) {
    const newUser = {
        id: id,
        fullname: name,
        email: email,
        password: password,
        gender: gender,
        phone: phone,
        address: address
    };
    return newUser;
};
exports.createNewUser = createNewUser;
//# sourceMappingURL=models.js.map