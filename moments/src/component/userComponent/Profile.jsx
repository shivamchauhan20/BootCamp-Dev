import React, { Component } from 'react';
import axios from "axios";
class Profile extends Component {
    state = {
        src: "",
        title: "Data will be filled",
        name: "",
        handle: "",
        noOfPost: "",
        followerCount: "",
        followingCount: ""
    }

    componentDidMount() {
        axios.get("http://localhost:2012/api/v1/user/89399c87-8032-44f9-8e8f-3141b3250dc2")
            .then((res) => {
                console.log(res.data);
                let { pimg_url, handle, name } = res.data.user;
                this.setState({
                    src: pimg_url,
                    name: name,
                    handle: handle
                })
            })
            .then(() => {
                return axios.get("http://localhost:2012/api/v1/user/count/89399c87-8032-44f9-8e8f-3141b3250dc2");
            })
            .then((res) => {
                let followerCount = res.data.message[0].COUNT;
                this.setState({ followerCount: followerCount });
            })
            .catch((err) => { console.log(err); })
    }

    render() {
        let { updateCurrentMenu } = this.props;
        let { src, name, handle, noOfPost, followerCount, followingCount } = this.state;
        return (
            <React.Fragment>
                <div className="profile-parent">
                    <div className="profile">
                        <div className="profile-details">
                            <img src={src} alt={"profile-img"}></img>
                            <p>{name}</p>
                            <p>{handle}</p>
                        </div>
                        <div className="profile-stats">
                            <div className="stat">
                                <div className="post">{noOfPost}</div>
                                <div>POST</div>
                            </div>
                            <div className="stat">
                                <div className="follower">{followerCount}</div>
                                <div>Followers</div>
                            </div>
                            <div className="stat">
                                <div className="following">{followingCount}</div>
                                <div>Following</div>
                            </div>
                        </div>
                        <div className="menu">
                            <div className="menu-list">
                                <div className="suggestions" onClick={() => updateCurrentMenu("suggestions")}>Suggestions</div>
                                <div className="requests" onClick={() => updateCurrentMenu("requests")}>Requests</div>
                                <div className="followers" onClick={() => updateCurrentMenu("followers")}>Followers</div>
                                <div className="following" onClick={() => updateCurrentMenu("following")}>Following</div>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default Profile;