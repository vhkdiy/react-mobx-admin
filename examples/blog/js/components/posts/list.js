import React from 'react'
import { observer } from 'mobx-react'
import { asMap } from 'mobx'
import DeleteIcon from 'material-ui/svg-icons/action/delete'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'
import IconButton from 'material-ui/IconButton'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import Chip from 'material-ui/Chip'
import TextField from 'react-mobx-admin/components/mui/field/text'
import DateField from 'react-mobx-admin/components/mui/field/date'
import OptionsField from 'react-mobx-admin/components/common/field/opts_observed'
import MultivalueField from 'react-mobx-admin/components/common/field/multivalue'
import TextInput from 'react-mobx-admin/components/mui/input/text'
import SelectInput from 'react-mobx-admin/components/mui/input/select'
import ListView from 'react-mobx-admin/components/mui/view/list'


const PostListView = ({state}) => {

  const _tagOptionComponent = ({attr, record}) => {
    function onTouchTap() {
      alert(JSON.stringify(record))
    }
    const _tagComponent = ({text}) => (
      <Chip style={{float: 'left'}} onTouchTap={onTouchTap}>{text}</Chip>
    )
    return <OptionsField attr={attr} record={record}
      optionsrecord={state.options} optionsattr={'tags'}
      labelattr={'name'} valueattr={'id'} Component={_tagComponent} />
  }

  const batchActions = (state) => {
    function _batchDelete() {
      if(confirm(`Are you sure you want to delete selected items?`)) {
        state.deleteSelected(state.currentView)
      }
    }
    return (
      <IconMenu iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}>
        <MenuItem primaryText="delete" leftIcon={<DeleteIcon />} onClick={() => _batchDelete()}/>
      </IconMenu>
    )
  }

  const listActions = (row) => {
    function _deleteRow(row) {
      if(confirm(`Are you sure you want to delete ${row.title}?`)) {
        state.deleteData(state.currentView, [row])
      }
    }
    return row ? (
      <div>
        <IconButton onClick={(e) => {
          e.stopPropagation() // prevent selecting deleted row
          e.preventDefault()
          _deleteRow(row)
        }}><DeleteIcon /></IconButton>
      </div>
    ) : null
  }

  const fields = [
    (attr, row) => (<TextField attr={attr} record={row} />),
    (attr, row) => {
      return (<TextField attr={attr} record={row} onTouchTap={() => state.currentView.detailClicked(row)}/>)
    },
    (attr, row) => (
      <OptionsField attr={attr} record={row} optionsrecord={state.options} optionsattr={'categories'} />
    ),
    (attr, row) => (<DateField attr={attr} record={row} />),
    (attr, row) => {
      return <MultivalueField items={row[attr]} Item={_tagOptionComponent} />
    }
  ]

  const filters = {
    'category': {title: 'Category', icon: <DeleteIcon />, component: (props) => (<SelectInput {...props}
      optionsrecord={state.options}
      optionsattr={'categories'} />)},
    'title_like': {title: 'Title', icon: <DeleteIcon />, component: (props) => (<TextInput {...props} />)}
  }

  return (
    <ListView state={state} fields={fields} listActions={listActions} filters={filters}
      batchActions={batchActions} onAddClicked={state.currentView.addClicked} />
  )

}

export default observer(PostListView)
