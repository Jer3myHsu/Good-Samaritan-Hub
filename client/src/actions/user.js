export const getUserByUsername = async (username) => {
    const url =  `/user/username/${username}`;
    const res = await fetch(url);
    const user = await res.json();
    return user;
}

export const getAllUsers = async () => {
    const url = `/users`;
    const res = await fetch(url);
    const users = await res.json();
    return users;
}

export const updateUser = async (originalUser, updatedUser) => {
    const request = new Request(`/user/${originalUser._id}`, {
        method: "put",
        body: JSON.stringify(updatedUser),
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
        }
    });

    // Send the request with fetch()
    const res = await fetch(request);
    const ok = await res.json();
    return ok
}

// Hides <post> from the current user
export const hidePostFromUser = async (post, appComponent) => {

    const user = appComponent.state.user;
    user.postsHiddenFromUser.push(post._id);

    const url = `/user/username/${user.username}`;

    // Create our request constructor with all the parameters we need
    const request = new Request(url, {
        method: 'PATCH',
        body: JSON.stringify([{ 'op': 'replace', 'path': '/postsHiddenFromUser', 'value': user.postsHiddenFromUser }]),
        headers: {
            Accept: 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        }
    });

    const res = await fetch(request);
    const updatedUser = await res.json();

    appComponent.setState({
        user: updatedUser
    });

    return updatedUser;
    
}