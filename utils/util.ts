import fs from 'fs';
import path from 'path';

export const fetchData = (function(){
    try {
        const data: IProduct[] = JSON.parse(fs?.readFileSync(path.join(__dirname, '..', path.sep, '..', path.sep, '/database/database.json'), 'utf-8'));
        return data;
    } catch (error) {
        // Create database if it doesn't exist.
        fs.writeFileSync(path.join(__dirname, '..', path.sep, '..', path.sep, '/database/database.json'), JSON.stringify([]),'utf-8');
        const dataStore: IProduct[] = [];
        return dataStore;
    }
    
});


export const writeData = function(result: IProduct, dataStore: IProduct[]){
    dataStore.push(result)
    fs.writeFileSync(path.join(__dirname, '..', path.sep, '..', path.sep, '/database/database.json'),JSON.stringify(dataStore, null, 3),'utf-8');

}

export const writeUpdatedData = function(result: IupdateProduct []){
        fs.writeFileSync(path.join(__dirname, '..', path.sep, '..', path.sep, '/database/database.json'),JSON.stringify(result, null, 3),'utf-8');

}


/*********************************************Users Database************************************/

export const fetchUsersData = (function(){
    try {
        const data: Iuser[] = JSON.parse(fs?.readFileSync(path.join(__dirname, '..', path.sep, '..', path.sep, '/database/usersDatabase.json'), 'utf-8'));
        return data;
    } catch (error) {
        // Create database if it doesn't exist.
        fs.writeFileSync(path.join(__dirname, '..', path.sep, '..', path.sep, '/database/usersDatabase.json'), JSON.stringify([]),'utf-8');
        const dataStore: Iuser[] = [];
        return dataStore;
    }
    
});


export const writeUsersData = function(result: Iuser, userStore: Iuser []){
    userStore.push(result)
    fs.writeFileSync(path.join(__dirname, '..', path.sep, '..', path.sep, '/database/usersDatabase.json'), JSON.stringify(userStore, null, 3),'utf-8');

}