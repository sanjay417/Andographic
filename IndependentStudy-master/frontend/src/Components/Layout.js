import React, {useEffect} from 'react';
import clsx from 'clsx';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import {ListItem,ListItemIcon,ListItemText,IconButton,Divider, List,Typography, CssBaseline, Toolbar,
    AppBar,Drawer } from '@material-ui/core';
import ImportExportOutlinedIcon from '@material-ui/icons/ImportExportOutlined';
import {InsertChartOutlinedOutlined, ViewList, ChevronLeft, ChevronRight, CloudUpload, Person, Build} from '@material-ui/icons';
import WidgetsIcon from '@material-ui/icons/Widgets';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import StorageIcon from '@material-ui/icons/Storage';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ZoomOutIcon from '@material-ui/icons/ZoomOut';
import GradientIcon from '@material-ui/icons/Gradient';
import {
    CategoryTabs,
    TableView,
    ReactTable,
    DeveloperConsole,
    CategoryTabsOthers,
    SummaryCategoryTabs,
    Playground,
    ApplicationGenre,
    SystemActionView,
    ApplicationDeveloper,
    SystemActionDeveloper,
    PermissionDeveloper, PermissionAll,
    PermissionCategoryAll, PermissionGenre, SystemActionGenre, PermissionCategoryGenre, UploadDownloadTabs, Overview,
    RegisterUser,
    Resource,
    TrainAndPredict, PermissionProtectionAll, PermissionProtectionGenre,
    Confirmation,
    ScatterChart,
    Correlation
} from './index';
import {Link, HashRouter, Route, Switch} from 'react-router-dom';
import axios from 'axios';



const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
    },
    drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerClose: {
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: theme.spacing(7) + 1,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9) + 1,
        },
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        ...theme.mixins.toolbar,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
}));

export default function MiniDrawer() {
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const [vtdetections, setVtdetections] = React.useState([]);
    const [permissions, setPermissions] = React.useState([]);
    const [systemActions, setSystemActions] = React.useState([]);

    const data = {
        vtdetections: vtdetections,
        permissions: permissions,
        systemActions: systemActions
    };

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const fetchContextualColumns = () => {
        setOpen(false);
    };

    useEffect(() => {
        if(vtdetections.length == 0)
            populateVTDetections();

    });

    const populateVTDetections =() =>{
        axios.get('/api/VTDetection').then((result)=>{
            //this.setState({permissions: result.data});
            const dataSuggestions = result.data.map(entry => ({
                value: entry.vtdetection,
                label: entry.vtdetection,
            }))
            setVtdetections(dataSuggestions);
        }).catch((err)=>{
            console.log(err)
        })
    };


    return (
        <HashRouter>
            <div className={classes.root}>
                <CssBaseline/>
                <AppBar
                    position="fixed"
                    className={clsx(classes.appBar, {
                        [classes.appBarShift]: open,
                    })} style={{backgroundColor:"#3f51b5", color: "#fff"}}
                >
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={handleDrawerOpen}
                            edge="start"
                            className={clsx(classes.menuButton, {
                                [classes.hide]: open,
                            })}
                        >
                            <MenuIcon/>
                        </IconButton>
                        <Typography variant="h6" noWrap>
                            AndroGraphic
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Drawer
                    variant="permanent"
                    className={clsx(classes.drawer, {
                        [classes.drawerOpen]: open,
                        [classes.drawerClose]: !open,
                    })}
                    classes={{
                        paper: clsx({
                            [classes.drawerOpen]: open,
                            [classes.drawerClose]: !open,
                        }),
                    }}
                    open={open}
                >
                    <div className={classes.toolbar}>
                        <IconButton onClick={handleDrawerClose}>
                            {theme.direction === 'rtl' ? <ChevronRight/> : <ChevronLeft/>}
                        </IconButton>
                    </div>
                    <Divider/>
                    <List>

                        <ListItem button key={'Overview'} component = {Link} to={"/Overview"}>
                            <ListItemIcon> <ZoomOutIcon/></ListItemIcon>
                            <ListItemText primary={'Overview'}/>
                        </ListItem>


               {/*         <ListItem button key={'Summary Charts'} component = {Link} to={"/Summary"}>
                            <ListItemIcon> <InsertChartOutlinedOutlined/></ListItemIcon>
                            <ListItemText primary={'Summary Charts'}/>
                        </ListItem>*/}

                        <ListItem button key={'Playground'} component = {Link} to={"/Playground"}>
                            <ListItemIcon> <Build/></ListItemIcon>
                            <ListItemText primary={'Playground'}/>
                        </ListItem>



                   {/*     <ListItem button key={'Charts'} component = {Link} to={"/Charts"}>
                            <ListItemIcon> <InsertChartOutlinedOutlined/></ListItemIcon>
                            <ListItemText primary={'Charts'}/>
                        </ListItem>*/}


                        <ListItem button key={'Console'} component = {Link} to={"/Console"}>
                            <ListItemIcon> <Person/></ListItemIcon>
                            <ListItemText primary={'Developer Console'}/>
                        </ListItem>

                        <ListItem button key={'Correlation'} component = {Link} to={"/Correlation"}>
                            <ListItemIcon> <GradientIcon/></ListItemIcon>
                            <ListItemText primary={'Correlation'}/>
                        </ListItem>

                       {/* <ListItem button key={'Others'} component = {Link} to={"/HeatMaps"}>
                            <ListItemIcon> <ViewList/></ListItemIcon>
                            <ListItemText primary={'Others'}/>
                        </ListItem>*/}
                        <ListItem button key={'Resources'} component = {Link} to={"/Resource"}>
                            <ListItemIcon> <StorageIcon/></ListItemIcon>
                            <ListItemText primary={'Resources'}/>
                        </ListItem>


                        <ListItem button key={'RegisterUser'} component = {Link} to={"/RegisterUser"}>
                            <ListItemIcon> <PersonAddIcon/></ListItemIcon>
                            <ListItemText primary={'RegisterUser'}/>
                        </ListItem>

                        <ListItem button key={'Confirmation'} component = {Link} to={"/Confirmation"}>
                            <ListItemIcon> <ThumbUpIcon/></ListItemIcon>
                            <ListItemText primary={'Confirmation'}/>
                        </ListItem>

                        <ListItem button key={'Upload'} component = {Link} to={"/UploadDownload"}>
                            <ListItemIcon> <ImportExportOutlinedIcon/></ListItemIcon>
                            <ListItemText primary={'Upload/Download'}/>
                        </ListItem>

                        <ListItem button key={'Classification'} component = {Link} to={"/Classification"}>
                            <ListItemIcon> <WidgetsIcon/></ListItemIcon>
                            <ListItemText primary={'Classification'}/>
                        </ListItem>



                    </List>

                    <Divider/>
                </Drawer>
                <main className={classes.content}>
                    <div className={classes.toolbar}/>
                    <Switch>
                        <Route exact path={'/Correlation'}  component = {() => <Correlation options={data} />}/>
                        <Route exact path={'/Confirmation'}  component = {() => <Confirmation options={data} />}/>
                        <Route exact path={'/RegisterUser'}  component = {() => <RegisterUser options={data} />}/>
                        <Route exact path={'/Resource'}  component = {() => <Resource options={data} />}/>
                        <Route exact path={'/Overview'}  component = {() => <Overview options={data} />}/>
                        <Route exact path={'/UploadDownload'}  component = {() => <UploadDownloadTabs options={data} />}/>
                        <Route exact path={'/Classification'}  component = {() => <TrainAndPredict options={data} />}/>
                        <Route exact path={'/Playground'}  component = {() => <Playground options={data} />}/>
                        <Route exact path={'/Charts'} component = {CategoryTabs}/>
                        <Route exact path={'/Summary'} component = {SummaryCategoryTabs}/>
                        <Route exact path={'/Console'} component = {DeveloperConsole}/>
                        <Route exact path={'/HeatMaps'} component = {CategoryTabsOthers}/>
                        <Route exact path={'/ApplicationGenre'}  component = {() => <ApplicationGenre options={data} />}/>
                        <Route exact path={'/ApplicationDeveloper'}  component = {() => <ApplicationDeveloper options={data} />}/>
                        <Route exact path={'/ActionAll'}  component = {() => <SystemActionView options={data} />}/>
                        <Route exact path={'/PermissionDeveloper'}  component = {() => <PermissionDeveloper options={data} />}/>
                        <Route exact path={'/ActionDeveloper'}  component = {() => <SystemActionDeveloper options={data} />}/>
                        <Route exact path={'/PermissionAll'}  component = {() => <PermissionAll options={data} />}/>
                        <Route exact path={'/PermissionCategoryAll'}  component = {() => <PermissionCategoryAll options={data} />}/>
                        <Route exact path={'/PermissionGenre'}  component = {() => <PermissionGenre options={data} />}/>
                        <Route exact path={'/SystemActionGenre'}  component = {() => <SystemActionGenre options={data} />}/>
                        <Route exact path={'/PermissionCategoryGenre'}  component = {() => <PermissionCategoryGenre options={data} />}/>
                        <Route exact path={'/PermissionProtectionAll'}  component = {() => <PermissionProtectionAll options={data} />}/>
                        <Route exact path={'/PermissionProtectionGenre'}  component = {() => <PermissionProtectionGenre options={data} />}/>

                        {/* <Route exact path={'/List'} render={() => <div>On List</div>}/> */}
                    </Switch>
                </main>
            </div>
        </HashRouter>
    );
}
