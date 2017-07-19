import test from 'tape'
import { when, observable } from 'mobx'
import MockRequester from '../mockRequester'
import DataManipState from '../../src/state/data_manip'

class State extends DataManipState {
  @observable currentView = {}
}

const cfg = {
  view: {
    validators: {
      'title': (val) => {
        if (!val || val.length === 0) {
          return 'value must be provided'
        }
        if(val.length > 10) {
          return 'value too long'
        }
      }
    }
  },
  initNew: (entity) => {
    // simulation of loading or time expansive operation
    return new Promise((resolve, reject) => {
      setTimeout(()=> {
        entity.set('published', true)
        resolve(entity)
      }, 200)
    })
  }
}

function _createState() {
  const state = new State()
  state.requester = new MockRequester()
  return state
}

test('it should be possible to showEntityDetail', t => {
  const state = _createState()
  state.requester.data = {
    "id": 1,
    "title": "Sauron attacks",
    "body": "<p>Rerum velit quos est <ur veniam fugit",
    "views": 143
  }

  state.initEntityView('posts', 1, cfg)
  t.equal(state.cv.loading, true)

  setTimeout(() => {
    t.equal(state.cv.loading, false)
    t.equal(state.cv.originEntityId, 1)
    t.equal(state.cv.entityname, 'posts')
    t.equal(state.cv.entity.has('title'), true)
    t.equal(state.cv.entity.get('title'), state.requester.data.title)
    t.equal(state.cv.entity.has('body'), true)
    t.equal(state.cv.entity.get('body'), state.requester.data.body)
    t.end()
  }, 500)
})

// test('it should not be possible to read documents without login', t => {
//     const viewStore = new ViewStore(stubFetch)
//     viewStore.showDocument(1)
//
//     t.equal(viewStore.currentView.name, 'document')
//     t.equal(viewStore.isAuthenticated, false)
//     when(
//         () => viewStore.currentView.document.state !== 'pending',
//         () => {
//             t.equal(viewStore.currentView.document.state, 'rejected')
//             t.notOk(viewStore.currentView.document.value)
//             t.end()
//         }
//     )
// })
//
// test('it should be possible to read documents with login', t => {
//     const viewStore = new ViewStore(stubFetch)
//
//     viewStore.performLogin('user', '1234', result => {
//         t.equal(result, true)
//         t.equal(viewStore.isAuthenticated, true)
//         t.equal(viewStore.currentUser.name, 'Test user')
//
//         viewStore.showDocument(1)
//
//         t.equal(viewStore.currentView.name, 'document')
//         when(
//             () => viewStore.currentView.document.state !== 'pending',
//             () => {
//                 t.equal(viewStore.currentView.document.state, 'fulfilled')
//                 t.equal(viewStore.currentView.document.value.text, 'fun')
//                 t.end()
//             }
//         )
//     })
// })
