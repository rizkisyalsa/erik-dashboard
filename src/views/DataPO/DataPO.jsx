import React, { forwardRef, createRef, useState, useEffect } from 'react'
import axios from 'axios';
import MaterialTable from 'material-table';
import moment from 'moment';

import Chip from '@material-ui/core/Chip';
import AddBox from '@material-ui/icons/AddBox';
import ArrowUpward from '@material-ui/icons/ArrowUpward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Refresh from '@material-ui/icons/Refresh';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import SaveIcon from '@material-ui/icons/Save';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';

import DashboardLayout from 'layouts/Dashboard';
import { withStyles } from '@material-ui/core/styles';

import AddPO from './Components/AddPO'
import SnackbarComponent from '../../components/Snackbar/SnackbarComponent'

const tableIcons = {
   Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
   Check: forwardRef((props, ref) => <SaveIcon {...props} ref={ref} />),
   Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
   Delete: forwardRef((props, ref) => <Clear {...props} ref={ref} color='secondary'/>),
   DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
   Edit: forwardRef((props, ref) => <Check {...props} ref={ref} color='primary'/>),
   Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
   Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
   FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
   LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
   NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
   PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
   Refresh: forwardRef((props, ref) => <Refresh {...props} ref={ref} />),
   ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
   Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
   SortArrow: forwardRef((props, ref) => <ArrowUpward {...props} ref={ref} />),
   ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
   ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};

const styles = theme => ({
   root: {
      padding: theme.spacing.unit * 5
   },
   item: {
      height: '100%'
   }
});

const DataPo = (props) => {
   const tableRef = createRef();
   const { classes } = props;

   const [namaBarang, setNamaBarang] = useState()

   useEffect(() => {
      axios.get('http://localhost:8001/api/barang/namaBarang')
      .then(function (res) {
         setNamaBarang(res.data.rows);
      })
      .catch(function (error) {
         console.log(error);
      })
   }, []);

   const [state] = React.useState({
      columns: [
         { title: 'No PO', field: 'no_po', editable: 'never' },
         { title: 'Tanggal PO', field: 'tgl_po', render: row => moment(Date.now(row.tgl_po)).format("DD-MM-YYYY"), editable: 'never'},
         { title: 'Nama pelanggan', field: 'nama_plg', editable: 'never' },
         { title: 'Nama Barang', field: 'nama_brg', editable: 'never' },
         { title: 'Jumlah', field: 'jumlah', editable: 'never' },
         { title: 'Tanggal Kirim', field: 'tgl_krm', type: 'date', render: row => moment((row.tgl_krm)).format("DD-MM-YYYY"), editable: 'never'},
         { title: 'Status', field: 'status', render: row => <Chip color={row.status === 'pending' ? "secondary":"primary"} label={row.status} /> , lookup: { pending: 'pending', success: 'success' },}
      ]
   });

   const [snackbarAdd, setSnackbarAdd] = useState({
      open: false,
      message: '',
      variant: ''
   })
   const handleCloseSnackbarAdd = (event, reason) => {
      if (reason === 'clickaway') {
         return;
      }
      setSnackbarAdd({
         open: false,
         message: '',
         variant: ''
      })
   }

   const [openAdd, setOpenAdd] = useState(false)
   const modalAdd = (func) => setOpenAdd(!openAdd)

   const refreshData = () => {
      tableRef.current && tableRef.current.onQueryChange()
   }

   const getData = () => {
      return query =>
         new Promise((resolve, reject) => {
            fetch("http://localhost:8001/api/po" + `?limit=${query.pageSize}&page=${query.page + 1}&search=${query.search}`)
               .then(res => res.json())
               .then(result => {
                  resolve({
                     data: result[0].data, // your data array
                     page: result[0].page - 1, // current page number
                     totalCount: result[0].total // total value
                  })
               })
         })
   }

   const addData = item => {
      return fetch("http://localhost:8001/api/po", {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json'
         },
         body: JSON.stringify(item)
      })
         .then(res => res.json())
         .then(result => {
            refreshData()
            setOpenAdd(false)
            setSnackbarAdd({
               open: true,
               message: 'PO berhasil ditambahkan',
               variant: 'success'
            })
         })
   }

   const deleteData = () => {
      return oldData =>
         new Promise(resolve => {
            fetch("http://localhost:8001/api/po" + `/${oldData.no_po}`, {
               method: 'DELETE',
               headers: {
                  'Content-Type': 'application/json'
               }
            })
               .then(res => res.json())
               .then(result => {
                  resolve(
                     refreshData(),
                     setSnackbarAdd({
                        open: true,
                        message: 'PO berhasil dihapus',
                        variant: 'error'
                     })
                  )
               })
         })
   }

   const updateData = () => {
      return (newData, oldData) =>
         new Promise(resolve => {
            fetch("http://localhost:8001/api/po" + `/${oldData.no_po}`, {
               method: 'PUT',
               headers: {
                  'Content-Type': 'application/json'
               },
               body: JSON.stringify(newData)
            })
               .then(res => res.json())
               .then(result => {
                  resolve(
                     refreshData(),
                     setSnackbarAdd({
                        open: true,
                        message: 'PO berhasil di update',
                        variant: 'info'
                     })
                  )
               })
         })
   }

   return (
      <DashboardLayout title="Data PO">
         <div className={classes.root}>

            {snackbarAdd.open &&
               <SnackbarComponent
                  open={snackbarAdd.open}
                  handleClose={handleCloseSnackbarAdd}
                  variant={snackbarAdd.variant}
                  message={snackbarAdd.message}
               />
            }

            {openAdd &&
               <AddPO
                  openAdd={openAdd}
                  modalAdd={modalAdd}
                  addFunc={addData}
                  namaBarang={namaBarang}
               />
            }
            <MaterialTable
               title="Data Pre Order"
               tableRef={tableRef}
               icons={tableIcons}
               columns={state.columns}
               data={getData()}
               actions={[
                  {
                     icon: tableIcons.Add,
                     tooltip: 'Add',
                     isFreeAction: true,
                     onClick: () => modalAdd(refreshData)
                  },
                  {
                     icon: tableIcons.Refresh,
                     tooltip: 'Refresh',
                     isFreeAction: true,
                     onClick: () => refreshData()
                  }
               ]}
               editable={{
                  onRowDelete: deleteData(),
                  onRowUpdate: updateData()
               }}
               options={{
                  actionsColumnIndex: -1,
                  exportButton: true,
                  paginationType: 'stepped',
                  pageSize: 10,
                  pageSizeOptions: [10, 25, 50],
                  debounceInterval: 0,
                  exportAllData: true,
               }}
            />
         </div>
      </DashboardLayout>
   )
}

export default withStyles(styles)(DataPo);
