import Cookies from 'js-cookie';
import qs from 'qs';

const BASEAPI = '';

const apiFetchFile = async (endpoint, body) => {
    if(!body.token) {
        let token = Cookies.get('token');
        if (token) {
            body.append('token', token);
        }
    }
    const res = await fetch(BASEAPI + endpoint, {
        method: 'POST',
        body
    });
    const json = await res.json();
    if(json.notallowed) {
        window.location.href = '/signin';
        return;
    }
    return json;
}


const apiFetchPost = async (endpoint, body) => {
    if(!body.token) {
        let token = Cookies.get('token');
        if (token) {
            body.token = token;
        }
    }
    const res = await fetch(BASEAPI + endpoint, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    });
    const json = await res.json();
    if(json.notallowed) {
        window.location.href = '/signin';
        return;
    }
    return json;
}

const apiFetchGet = async (endpoint, body = []) => {
    if(!body.token) {
        let token = Cookies.get('token');
        if (token) {
            body.token = token;
        }
    }
    const res = await fetch(`${BASEAPI + endpoint}?${qs.stringify(body)}`);
    const json = await res.json();
    if(json.notallowed) {
        window.location.href = '/signin';
        return;
    }
    return json;
}

const apiFetchPut = async (endpoint, body = []) => {
    if(!body.token) {
        let token = Cookies.get('token');
        if (token) {
            body.token = token;
        }
    }
    const res = await fetch(BASEAPI + endpoint, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    });
    const json = await res.json();
    if(json.notallowed) {
        window.location.href = '/signin';
        return;
    }
    return json;
}

const OlxAPI = {
    login: async (email, password) => {
        const json = await apiFetchPost('user/signin', { email, password });
        return json;
    },

    register: async (name, stateLoc, email, password) => {
        const json = await apiFetchPost('user/signup', {
            name,
            state: stateLoc,
            email,
            password
        });
        return json;
    },

    getState: async () => {
        const json = await apiFetchGet('/states');
        return json.states;
    },

    getCategories: async () => {
        const json = await apiFetchGet(
            '/categories'
        );
        return json.categories;
    },

    getAds: async (options) => {
        const json = await apiFetchGet(
            '/ad/list',
            options
        );
        return json;
    },

    getAd: async (id, othersAds = false) => {
        const json = await apiFetchGet(
            '/ad/item',
            { id, othersAds }
        );
        return json;
    },

    addAd: async (fData) => {
        const json = await apiFetchFile(
            '/ad/add',
            fData
        );
        return json;
    },

getUser: async () => {
    const json = await apiFetchGet(
      '/user/me'
    );
    return json;
},

updateUser: async (name, stateLoc, email, password) => {
const json = await apiFetchPut(
    '/user/me',
    { name, state: stateLoc, email, password }
);
return json;
},

updateAd: async (id, status, title, category, price, priceNegotiable, description, images) => {
    const json = await apiFetchPost(
        '/ad/:id',
        { id, status, title, category, price, priceNegotiable, description, images}
    );
    return json;
    }
}

export default () => OlxAPI;