import React, { Component } from 'react';
import Profile from './Profile';
import ProfileList from './ProfileList';
import axios from "axios";

class UserView extends Component {
    state = { currentMenu : "suggestions" , list : [] }

    componentDidMount(){
        //suggestions call
    }

    updateCurrentMenu = (cMenu) =>{
        console.log(cMenu);
        if(cMenu == "followers"){
            axios.get("http://localhost:2012/api/v1/user/request/89399c87-8032-44f9-8e8f-3141b3250dc2")
            .then((res)=>{
                let followers = res.data.message.filter(follower=>follower.is_accepted === 1);
                console.log(followers);
                let followerDetailsP = followers.map((follower)=>{
                    return axios.get(`http://localhost:2012/api/v1/user/${follower.follower_id}`);
                });

                return Promise.all(followerDetailsP);
            })
            .then((followerDetailsArray)=>{ 
                let listForProfileList = [];
                for(let i = 0; i < followerDetailsArray.length; i++){
                    let {uid,name,handle} = followerDetailsArray[i].data.user;
                    listForProfileList.push({uid,name,handle});
                }
                this.setState({currentMenu : cMenu,list : listForProfileList});
            })
            .catch(err=>console.log(err));
        }
    }

    render() { 
        return ( 
            <div className="user-view">
                <Profile updateCurrentMenu={this.updateCurrentMenu}/>
                <ProfileList list={this.state.list}/>
            </div>
        );
    }
}
 
export default UserView;