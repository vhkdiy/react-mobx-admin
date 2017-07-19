import DataRequester from './services/requester'
import DataManipState from './state/data_manip'
import DataTableState from './state/data_table'

import MultivalueField from './components/common/field/multivalue'
import ObservedOptionsField from './components/common/field/opts_observed'
import OptionsField from './components/common/field/opts'

import FilterBases from './components/common/datagrid/filters'
import PaginationBase from './components/common/datagrid/pagination'

export default {
  service: {
    Requester: DataRequester
  },
  store: {
    DataManip: DataManipState,
    DataTable: DataTableState
  },
  components: {
    FilterBases: FilterBases,
    MultivalueField: MultivalueField,
    OptionsField: OptionsField,
    ObservedOptionsField: ObservedOptionsField,
    PaginationBase: PaginationBase
  }
}
