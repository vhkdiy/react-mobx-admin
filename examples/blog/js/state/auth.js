import { observable, computed, toJS, action, transaction, asMap } from 'mobx'
import BlogRequester from '../services'
import DataTableState from 'react-mobx-admin/state/data_table'

export default class AuthStore extends DataTableState {

  constructor(requester, initializers) {
    super(requester, initializers)
    const stored = localStorage.getItem('gandalf_admin_user')
    try {
      this.loggedUser = stored ? JSON.parse(stored) : null
    } catch(e) {
      this.loggedUser = observable(null)
    }
    // create requester here because we need to provide on401 callback for it ..
    this.requester = new BlogRequester(this.on401.bind(this))
  }

  on401(err) {
    alert('we have to login!!')
  }

  onError(err) {
    this.addMessage(err.message || err, 'error', 2000)
  }

  @observable loggedUser = null

  @computed get userLogged() {
    return this.loggedUser !== null
  }

  @action
  showLogin() {
    this.currentView = {
      name: 'login'
    }
  }

  @action
  logout() {
    this.loggedUser = null
    localStorage.removeItem('gandalf_admin_user')
    this.currentView = {
      name: 'login'
    }
  }

  @action performLogin(credentials) {
    let self = this
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        self.loggedUser = {
          uname: credentials.uname,
          name: 'gandalf the gray'
        }
        localStorage.setItem('gandalf_admin_user', JSON.stringify(self.loggedUser))
        resolve(toJS(self.loggedUser))
      }, Math.random() * 2000 + 1000)
    })
  }

}
