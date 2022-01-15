import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import './styles/Leaderboard.css';

export default function RecentMatches(props) {
  const {matches} = props;
  return (
    <TableContainer class="container">
      <h2>Recent Matches</h2>
      <Table sx={{ width: 600, margin:'auto', background: "black"}} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell sx={{color: "white"}}><strong>Match</strong></TableCell>
            <TableCell sx={{color: "white"}}><strong>Score</strong></TableCell>
            <TableCell sx={{color: "white"}}><strong>Winner</strong></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {matches.map((match) => (
            <TableRow key={match.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell sx={{color: "white"}}>{match.p1} vs. {match.p2}</TableCell>
              <TableCell sx={{color: "white"}}>{match.score[0]} - {match.score[1]}</TableCell>
              <TableCell sx={{color: "white"}}>{match.winner}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}