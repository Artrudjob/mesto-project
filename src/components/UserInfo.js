import { api } from './api.js';

class UserInfo{
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

export const userInfo = new UserInfo({ 
    userName: document.querySelector('.profile__name'),
    userAbout: document.querySelector('.profile__career')
})

