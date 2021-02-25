import React, {Component} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';


    const useStyles = makeStyles(theme => ({
        root: {
            width: '100%',
            maxWidth: 360,
            backgroundColor: theme.palette.background.paper,
            overflow: 'auto'
        },
    }));

    export default class CheckboxList extends Component {
        constructor(props) {
            super(props);
            this.state = {
                sourceData: [],
                checked:[]
            }
        }

        handleToggle = value => (e) => {
            const currentIndex = this.state.checked.indexOf(value);
            if (currentIndex === -1) {
                 var checkedItems = this.state.checked;
                 checkedItems.push(value);
                 this.setState({checked : checkedItems});
                 this.props.onClick(e.target.name);
            } else {
                this.setState({checked :this.state.checked.splice(value, 1)});
            }


        };

    render() {

        if(this.props && this.props.data != "")
            this.state.sourceData = this.props.data;

        var index = 0;
        return (
            <List className={useStyles.root}>
                {this.state.sourceData.map(value => {
                    const labelId = value.column_name;
                    const val = ++index;
                    return (
                        <ListItem key={labelId} button onClick={this.handleToggle(val)}>
                            <Checkbox
                                edge="start"
                                checked={this.state.checked.indexOf(val) !== -1 }
                                tabIndex={-1}
                                disableRipple
                                name = {labelId}
                                inputProps={{ 'aria-labelledby': labelId }}
                            />

                            <ListItemText id={labelId} primary={labelId}/>

                        </ListItem>
                    );
                })}

            </List>
        );

    }

}
