import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import './styles/Leaderboard.css';

export default function Leaderboard(props) {
  const {users} = props;
  return (
    <TableContainer class="container">
      <Table sx={{ width: 600, margin:'auto', background: "black"}} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell sx={{color: "white"}}><strong>Username</strong></TableCell>
            <TableCell sx={{color: "white"}}><strong>Score</strong></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell sx={{color: "white"}}>{user.name}</TableCell>
              <TableCell sx={{color: "white"}}>{user.score} points</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}