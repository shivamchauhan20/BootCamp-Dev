import React from 'react';

const ProfileList = (props) => {
    let { list } = props;
    return (
        <React.Fragment>
            <div className="list">
                {list.map((follower) => {
                    return (
                        <div key={follower.handle} className="card">
                            <div className="uid">{follower.uid}</div>
                            <div className="name">{follower.name}</div>
                            <div className="handle">{follower.handle}</div>
                        </div>
                    )
                })}
            </div>
        </React.Fragment>
    );
}

export default ProfileList;