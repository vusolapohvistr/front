import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Comment } from '../api';

const useStyles = makeStyles({
    table: {
    },
});

interface CommentsTableProps {
    comments: Comment[],
}

function CommentsTable({comments}: CommentsTableProps) {
    const classes = useStyles();
    return (
        <TableContainer component={Paper}>
            <Table className={classes.table}>
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell align="left">Name</TableCell>
                        <TableCell align="left">Surname</TableCell>
                        <TableCell align="left">Comment</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {comments.map(comment => (
                        <TableRow key={comment.id}>
                            <TableCell>{comment.id}</TableCell>
                            <TableCell align="left">{comment.name}</TableCell>
                            <TableCell align="left">{comment.surname}</TableCell>
                            <TableCell align="left">{comment.comment}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default CommentsTable;
