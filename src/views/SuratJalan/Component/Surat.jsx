import React from 'react'
import moment from 'moment';

import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const Surat = ({data}) => {
  console.log(data)
  return (
    <diV style={{margin:'10px 50px', backgroundColor: '#f9f9f9'}}>
    <Grid container spacing={3}>
      <Grid item xs={3}>
          <div style={{marginTop:'-10px'}}>
            <img alt="Company logo" src="/images/logos/pancamitra.png"/>
          </div>
      </Grid>
      <Grid item xs={6}>
        <div style={{textAlign: 'center', marginTop:'20px'}}>
          <h2 style={{marginBottom: '5px'}}>SURAT JALAN</h2>
          <h4>Tanggal Kirim : {moment(data.tgl_krm).format('DD-MM-YYYY')}</h4>
        </div>
          
      </Grid>
      <Grid item xs={3}>
          <p style={{}}>Jl. Palem Manis 3 No 65 Jatiuwung Tangerang Banten, RT.004/RW.003, Gandasari, Jatiuwung, Tangerang City, Banten 15136</p>
      </Grid>
      <Grid item xs={12}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Tanggal PO</TableCell>
            <TableCell align="right">No PO</TableCell>
            <TableCell align="right">Nama Pelanggan</TableCell>
            <TableCell align="right">Nama Barang</TableCell>
            <TableCell align="right">Jumlah</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell component="th" scope="row">
            {moment(data.tgl_po).format('DD-MM-YYYY')}
            </TableCell>
            <TableCell align="right">{data.no_po}</TableCell>
            <TableCell align="right">{data.nama_plg}</TableCell>
            <TableCell align="right">{data.nama_brg}</TableCell>
            <TableCell align="right">{data.jumlah}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
      </Grid>
    </Grid>
</diV>
  )
}

export default Surat
