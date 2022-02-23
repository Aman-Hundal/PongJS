import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import './styles/RecentMatches.css';

export default function RecentMatches(props) {
  const {matches} = props;

  return (
    <TableContainer class="container">
      <div className= "table-titleCard">
        <h2 className= "table-title">Recent Matches</h2>
      </div>
      <Table sx={{ width: 600, margin:'auto', background: "black"}} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="table-content" sx={{color: "white"}}><strong>Match</strong></TableCell>
            <TableCell className="table-content" sx={{color: "white"}}><strong>Score</strong></TableCell>
            <TableCell className="table-content" sx={{color: "white"}}><strong>Winner</strong></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {matches.map((match) => (
            match.score ? 
            <TableRow key={match.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell className="table-content" sx={{color: "white"}}>{match.player1} vs. {match.player2}</TableCell>
              <TableCell className="table-content" sx={{color: "white"}}>{match.score[0]} - {match.score[1]}</TableCell>
              <TableCell className="table-content" sx={{color: "white"}}>{match.winner}</TableCell>
            </TableRow> : null
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}