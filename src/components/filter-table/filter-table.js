import './filter-table.css'
import React, {Component} from 'react'

import Select, { SelectChangeEvent } from '@mui/material/Select';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import moment from 'moment';
import { createTheme, ThemeProvider } from '@mui/material/styles';

export default class FilterTable extends Component{

    state = {users: [], userFilter: ''}

    componentDidMount = () => {
        fetch("http:localhost:8080/data")
        .then(resp => resp.json())
        .then(users => this.setState({users}))
    }

    renderFilterButton = () => {
        const ITEM_HEIGHT = 48;
        const ITEM_PADDING_TOP = 0;
        const MenuProps = {
          PaperProps: {
            style: {
              maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
              width: 250,
              border: "solid #D3D3D3 2px",
              marginTop: ".1rem"
            },
          },
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "right"
          },
          transformOrigin: {
            vertical: "top",
            horizontal: "right"
          },
        };

        const inputProps = {
            'aria-label': 'Without label',
            height: "1.5rem"
            
        }


        return(
            <Select
                displayEmpty
                value={this.state.userFilter}
                renderValue={(val => val ? val : "Filter by user")}
                onChange={(e) => this.setState({userFilter:e.target.value})}
                input={<OutlinedInput 
                    style={{border: "solid #D3D3D3 1px", width: "250px", height: "2.5rem"}}
                />}
                MenuProps={MenuProps}
                inputProps={inputProps}
                >
                {this.state.users.map((user) => (
                    <MenuItem
                        key={user.user_id}
                        value={user.user_name}
                        divider>
                            {user.user_name}
                    </MenuItem>
                ))}
            </Select>

        )
    }

    renderUsers = () => {
        const users = this.state.userFilter ? this.state.users.filter(user => user.user_name === this.state.userFilter) 
        : this.state.users
        //Some times have format of single hour
        const dateFormats = [
            "YYYY-MM-DDTHH:mm",
            "YYYY-MM-DDTH:mm"
        ]

        const events = users.map((user) => 
            user.events.map((event) => {
                let start = moment(event.start, dateFormats)
                let end = moment(event.end, dateFormats)
                return(
                    <div className="user-event">
                        <div> {user.user_name} </div>
                        <div> {event.title} </div>
                        <div> 

                         {`${start.format("LT").toLowerCase()} - ${end.format("LT").toLowerCase()} EST`}
                        </div>
                    </div>
                )
            })
        )

        return(
           <div className="users-table">
                <div className="header-cell"> User</div>
                <div className="header-cell"> Meeting</div>
                <div className="header-cell"> Time </div>
                {events}

           </div> 
        )
    }

    render(){
        return(
            <div className="filter-table">
                <div className="header-bar">
                    <h2>Meetings</h2>
                    {this.renderFilterButton()}
                </div>
                {this.renderUsers()}
            </div>
        )
    }
}