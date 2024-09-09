import {jwtDecode} from 'jwt-decode';

const getUserFromToken = () => {
    const token = localStorage.getItem('access_token');
    if (!token) return null;
    
    try {
        const decodedToken = jwtDecode(token);
        return {
            userEmail: decodedToken.userId,
            username: decodedToken.username,
            role: decodedToken.role
        };
    } catch (error) {
        console.error('Invalid token', error);
        return null;
    }
};



const initialState = (() => {
    const user = getUserFromToken();
    return {
        IsLoggedIn: user !== null,
        Username: user ? user.username : '',
        UserEmail: user ? user.userEmail : '',
        Role: user ? user.role : ''
    };
})();

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'IsLoggedIn':
            const user = getUserFromToken();
            return {
                ...state,
                IsLoggedIn: true,
                Username: user.username,
                UserEmail: user.userEmail,
                Role: user.role
            };
        case 'LogOut':
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            return { ...state, IsLoggedIn: false, Username: '', Role: '' , UserEmail: ''};
        default:
            return state;
    }
};

export default reducer;
