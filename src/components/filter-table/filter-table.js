import './filter-table.css'
import React, {Component} from 'react'
import {connect} from 'react-redux'
import actions from '../../backend-services/actions'
import * as types from '../../backend-services/actions';

import Select from '@mui/material/Select';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

import moment from 'moment';

class ConnectedFilterTable extends Component{

    state = {users: [], userFilter: ''}

    componentDidMount = () => {
        // fetch("http:localhost:8080/data")
        // .then(resp => resp.json())
        // .then(users => this.setState({users}))
        this.props.loadMeetings()

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
                value={this.props.userFilter}
                renderValue={(val => val ? val : "Filter by user")}
                onChange={(e) => this.props.setUserFilter(e.target.value)}
                input={<OutlinedInput 
                    style={{border: "solid #D3D3D3 1px", width: "250px", height: "2.5rem"}}
                />}
                MenuProps={MenuProps}
                inputProps={inputProps}
                >
                {this.props.meetings.map((user) => (
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
        const users = this.props.userFilter ? this.props.meetings.filter(user => user.user_name === this.props.userFilter) 
        : this.props.meetings
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


    renderTable = () => {
        //Loading state for component
        if(this.props.meetingsRequested){
            return(
                <Box sx={{ display: 'flex' }}>
                    <CircularProgress />
                </Box>
            )
        }

        //Error state for loading a component
        if(this.props.meetingsRequestSuccess !== types.REQUEST_SUCCESS){
            return(
                <div>
                    Error in retrieving meetings
                </div>
            )
        }
        return(this.renderUsers())
    }

    render(){
        return(
            <div className="filter-table">
                <div className="header-bar">
                    <h2>Meetings</h2>
                    {this.renderFilterButton()}
                </div>
                {this.renderTable()}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return(
        {
            userFilter: state.user.filter, 
            meetings: state.user.meetings.data,
            meetingsRequested: state.user.meetings.requested,
            meetingsRequestSuccess: state.user.meetings.successful            
        }
    )
}

const mapDispatchToProps = (dispatch) => ({
    // Redux saga for potential side effects to loading meetings
    loadMeetings: () => dispatch(actions.user.loadMeetings()),
    // Pure redux for simple value set
    setUserFilter: (user) => dispatch(actions.user.filterByUser(user))
})

const FilterTable = connect(
    mapStateToProps,
    mapDispatchToProps
)(ConnectedFilterTable)

export default FilterTable