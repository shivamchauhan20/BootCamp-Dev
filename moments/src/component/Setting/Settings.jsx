import React, { Component } from 'react';
import axios from "axios";
class Settings extends Component {
    state = {
        src: "",
        name: "",
        handle: "",
        bio: "",
        disabled: ""
    }

    componentDidMount(){
        axios.get("http://localhost:2012/api/v1/user/7a5da2de-dd5c-4f9b-b361-b387f609cc04")
        .then((res)=>{
            let {src,name,handle,bio} = res;
            this.setState({
                src : src,
                name : name,
                handle : handle,
                bio : bio
            })
        })
    }

    handleEdit = (event) => {
        event.preventDefault();
        this.setState({
            disabled : false
        })
    }

    handleChange = (event) => {
        event.preventDefault();
        let prop = event.target.name;
        let val = event.target.value;
        this.setState({
            [prop] : val
        })
    }

    handleSubmit = async () => {
        
    }

    render() {
        return (
            <React.Fragment>
                <form onSubmit={this.handleSubmit}>
                    <img src={this.state.src}></img>
                    <label htmlFor="name">Name
                    <input name="name" id="name"
                            onChange={this.handleChange}
                            disabled={this.state.disabled}
                            value={this.state.name}
                        />
                    </label>
                    <label htmlFor="handle">Handle
                    <input name="handle" id="handle"
                            onChange={this.handleChange}
                            disabled={this.state.disabled}
                            value={this.state.handle}
                        />
                    </label>
                    <label htmlFor="bio">Bio
                    <input name="bio" id="bio"
                            onChange={this.handleChange}
                            disabled={this.state.disabled}
                            value={this.state.bio}
                        />
                    </label>
                    <button onClick={this.handleEdit}>Edit</button>
                    <button type="submit">Submit</button>
                </form>
            </React.Fragment>);
    }
}

export default Settings;

export default Settings;