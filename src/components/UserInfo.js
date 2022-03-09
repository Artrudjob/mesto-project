import { api } from './Api.js';

export class UserInfo{
    constructor(selectorsInfoData) {
        this._name = selectorsInfoData.userName;
        this._about = selectorsInfoData.userAbout;
    }

    getUserInfo() {
        return api.getInfo()
            .then((result) => {
                this._name.textContent = result.name;
                this._about.textContent = result.about;
            })    
            .catch(err => console.log(`Что-то пошло не так: ${err}`))    
    }
    
    setUserInfo(name, about) {
        api.sendInfo(name, about);
        this.getUserInfo();
    }
}


