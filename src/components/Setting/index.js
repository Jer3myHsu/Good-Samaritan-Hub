import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';

import SaveSnackBar from './SaveSnackBar/index';
import { updateUser } from '../../actions/user';

import './styles.css';

class Setting extends Component {
    state = { firstName: this.props.displayedUser.firstName,
        lastName: this.props.displayedUser.lastName,
        bio: this.props.displayedUser.bio,
        location: this.props.displayedUser.location,

        oldPassword: null,
        newPassword: null,
        confirmPassword: null,
        
        firstNameEmpty: false,
        lastNameEmpty: false,
        locationEmpty: false,
        oldNotMatch: false,
        newNotMatch: false,

        snackBarOpen: false
    }

    handleCloseSnackBar = () => this.setState({snackBarOpen: false});

    handleInputChange = event => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: value.trim()
        });
    }

    handleSaveInfo = (user, displayedUser) => {
        let changed = false;
        this.setState({firstNameEmpty: this.state.firstName === ''});
        if (this.state.firstName && displayedUser.firstName !== this.state.firstName) {
            displayedUser.firstName = this.state.firstName;
            changed = true;
        }
        this.setState({lastNameEmpty: this.state.lastName == ''});
        if (this.state.lastName && displayedUser.lastName !== this.state.lastName) {
            displayedUser.lastName = this.state.lastName;
            changed = true;
        }
        if (this.state.bio && displayedUser.bio !== this.state.bio) {
            displayedUser.bio = this.state.bio;
            changed = true;
        }
        this.setState({locationEmpty: this.state.location == ''});
        if (this.state.location && displayedUser.location !== this.state.location) {
            displayedUser.location = this.state.location;
            changed = true;
        }
        if (changed) {
            updateUser(user, displayedUser, this.props.appComponent);
            this.setState({snackBarOpen: true});
            setTimeout(() => this.handleCloseSnackBar(), 5000);
        }
    }

    handleChangePassword = (user, displayedUser) => {
        this.setState({oldNotMatch: displayedUser.password !== this.state.oldPassword});
        this.setState({newNotMatch: !this.state.newPassword ||
            this.state.newPassword !== this.state.confirmPassword});
        if (displayedUser.password === this.state.oldPassword && this.state.newPassword &&
            this.state.newPassword === this.state.confirmPassword &&
            this.state.newPassword !== displayedUser.password) {
            displayedUser.password = this.state.newPassword;
            updateUser(user, displayedUser, this.props.appComponent);
            this.setState({snackBarOpen: true});
            setTimeout(() => this.handleCloseSnackBar(), 5000);
        }
    }
    render() {
        // NOTE: since The user can only edit their own profile, user === displayUser on this page
        const {user, displayedUser} = this.props
        const {firstNameEmpty, lastNameEmpty, locationEmpty, oldNotMatch, newNotMatch, snackBarOpen} = this.state;
        
        return (
        <div className='profile'>
            <div className='profile__container'>
                <div className="setting__icon-container">
                    <div className="setting__icon-button">Change</div>
                    <img src={require('../../resources/userIcon.png')} className='profile__icon setting_icon'/>
                </div>
                
                <Card className='profile__card'>
                    <h1>Your Profile</h1>
                    <TextField className="profile_textField"
                        label="Username"
                        defaultValue={displayedUser.username}
                        variant="outlined"
                        disabled/>
                    <div className='profile__name'>
                        <TextField className="profile_textField"
                            label="First Name"
                            defaultValue={displayedUser.firstName}
                            variant="outlined"
                            name="firstName"
                            error={firstNameEmpty}
                            helperText={firstNameEmpty && "Name cannot be empty"}
                            onChange={this.handleInputChange}/>
                        <TextField className="profile_textField"
                            label="Last Name"
                            defaultValue={displayedUser.lastName}
                            variant="outlined"
                            name="lastName"
                            error={lastNameEmpty}
                            helperText={lastNameEmpty && "Name cannot be empty"}
                            onChange={this.handleInputChange}/>
                    </div>
                    <TextField className="profile_textField"
                        label="Biography"
                        defaultValue={displayedUser.bio}
                        variant="outlined"
                        rows={5}
                        multiline
                        name="bio"
                        onChange={this.handleInputChange}/>
                    <TextField className="profile_textField"
                        label="Location"
                        defaultValue={displayedUser.location}
                        variant="outlined"
                        name="location"
                        error={locationEmpty}
                        helperText={locationEmpty && "Name cannot be empty"}
                        onChange={this.handleInputChange}/>
                    <div className='profile__button'>
                        <Button className='profile__save-button' startIcon={<EditIcon/>} onClick={() => this.handleSaveInfo(user, displayedUser)}>Save</Button>
                    </div>
                </Card>
                <Card className='profile__card'>
                    <h1>Change Password</h1>
                    <TextField className="profile_textField"
                        label="Old Password"
                        type="password"
                        variant="outlined"
                        error={oldNotMatch}
                        helperText={oldNotMatch && "Incorrect Password"}
                        name="oldPassword"
                        onChange={this.handleInputChange}/>
                    <TextField className="profile_textField"
                        label="New Password"
                        type="password"
                        variant="outlined"
                        error={newNotMatch}
                        name="newPassword"
                        onChange={this.handleInputChange}/>
                    <TextField className="profile_textField"
                        label="Confirm Password"
                        type="password"
                        variant="outlined"
                        error={newNotMatch}
                        helperText={newNotMatch && "Password does not match"}
                        name="confirmPassword"
                        onChange={this.handleInputChange}/>
                    <div className='profile__button'>
                        <Button className='profile__save-button' startIcon={<EditIcon/>} onClick={() => this.handleChangePassword(user, displayedUser)}>Save</Button>
                    </div>
                </Card>
            </div>
            <div className='profile__footer'></div>
            {snackBarOpen && <SaveSnackBar handleClose={this.handleCloseSnackBar}/>}
        </div>
        )
    }
}
 
export default Setting;