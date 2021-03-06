import React, { Component } from 'react'
import { ApolloConsumer } from 'react-apollo'
import { History, LocationState } from "history";

import {
    FormControl,
    FormHelperText
} from '@material-ui/core';

import {
    GET_ROOM_CONFIRMATION,
    ADD_ROOM
} from '../Queries'

import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import {
    PurpleButtonSecondPage,
    BackButton
} from '../Styled'

import Store from '../Stores/Store';
import Footer from '../Footer'

interface IProps {
    history: History<LocationState>;
}

class CreateRoom extends Component<IProps, { roomName: string, error: boolean, errorMessage: string }> {
    constructor(props: IProps) {
        super(props)
        this.state = {
            roomName: '',
            error: false,
            errorMessage: ''
        }
        Store.setRoom()
    }

    render() {
        const roomForm = (
            <ApolloConsumer>
                {client => (
                    <FormControl id="room-form" className="joinInnerContainer">
                        <h1 className="heading">Create a Room</h1>
                        <input
                            placeholder="Room Name"
                            className="joinInput"
                            type="text" onChange={
                                (event) => this.setState({ roomName: (event.target.value) })
                            } />
                        <div style={{ flex: 1, flexDirection: 'row' }}>
                            <PurpleButtonSecondPage variant="outlined" onClick={async (e) => {
                                e.preventDefault()
                                if (!this.state.roomName) {
                                    this.setState({ errorMessage: 'Please Enter name', error: true })
                                } else {
                                    const roomNameAvailable = await client.query({
                                        query: GET_ROOM_CONFIRMATION,
                                        variables: {
                                            roomName: this.state.roomName,
                                        }
                                    })
                                    if (roomNameAvailable.data.room) {
                                        this.setState({ errorMessage: 'RoomName is not available', error: true })
                                    } else {
                                        const { data } = await client.mutate({
                                            mutation: ADD_ROOM,
                                            variables: {
                                                roomName: this.state.roomName,
                                            }
                                        })
                                        this.setState({ errorMessage: '', error: false })
                                        Store.setRoom(data.addRoom.roomName, data.addRoom.id)
                                        this.props.history.push('/room-id')
                                    }
                                }
                            }}>Create Room</PurpleButtonSecondPage>
                            <BackButton onClick={() => { this.props.history.push('/') }}>
                                <ArrowBackIcon />
                            </BackButton>
                        </div>
                        <FormHelperText
                            error={this.state.error}
                            style={{ display: (this.state.error) ? '' : 'none' }}>
                            {this.state.errorMessage}
                        </FormHelperText>
                    </FormControl>
                )}
            </ApolloConsumer>
        )

        return (
            <>
                <div className="joinOuterContainer">
                    {roomForm}
                </div>
                <Footer />
            </>
        )
    }
}

export default CreateRoom