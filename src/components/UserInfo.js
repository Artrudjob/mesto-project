import { api } from './Api.js';

export class UserInfo{
    constructor(selectorsInfoData) {
        this._name = selectorsInfoData.userName;
        this._about = selectorsInfoData.userAbout;

        this._userNameField = document.querySelector('#user-name-field');
        this._userCareerField = document.querySelector('#user-career-field');
        this._popupBtnSave = document.querySelector('#save-button');
    }

    getUserInfo() {
        return api.getInfo()
            .then((result) => {
                this._name.textContent = result.name;
                this._about.textContent = result.about;
            })    
            .catch(err => console.log(`Что-то пошло не так: ${err}`))    
    }

    setUserInfo(name, about, methodClose) {
        api.sendInfo(name, about)
            .then(() => {
                const nameValue = name;
                const careerValue = about;
                this._userNameField.value = nameValue;
                this._userCareerField.value = careerValue;
                methodClose;
            })
            .catch(err => console.log(`Что-то пошло не так: ${err}`))
            .finally(() => {
                this._popupBtnSave.textContent = 'Сохранить';
              })
        this.getUserInfo();
    }
}


