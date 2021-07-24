import { Box, makeStyles } from '@material-ui/core';
import React from 'react';
import { Route, Switch } from 'react-router';
import Dashboard from '../../features/dashboard';
import StudentFeature from '../../features/student';
import { Header } from '../Common/Header';
import { Sidebar } from '../Common/Sidebar';


const useStyles = makeStyles(theme => ({
    root: {
        display: 'grid',
        gridTemplateRows: 'auto 1fr', // 2 rows
        gridTemplateColumns: '240px 1fr', // 2 cols 1 for side, 1 for content
        gridTemplateAreas: `"header header" "sidebar main"`,

        minHeight: '100vh'
    },

    header: {
        gridArea: 'header',
    },
    sidebar: {
        gridArea: 'sidebar',
        borderRight: `1px solid ${theme.palette.divider}`,
        backgroundColor: theme.palette.background.paper,
    },
    main: {
        gridArea: 'main',
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(2, 3)
    }
}))


export function AdminLayout(props) {
    const classes = useStyles()
    return (
        <Box className={classes.root}>
             <Box className={classes.header}>
                 <Header />
             </Box>
             <Box className={classes.sidebar}>
                 <Sidebar />
             </Box>
             <Box className={classes.main}>
                 <Switch>
                     <Route path='/admin/dashboard'>
                         <Dashboard />
                     </Route>
                     <Route path='/admin/students'>
                         <StudentFeature />
                     </Route>
                 </Switch>
             </Box>
        </Box>
    );
}

