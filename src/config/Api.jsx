import axios from "axios";
export default axios.create({
    baseURL: "http://127.0.0.1:8000/api",
    headers: {
        "Content-type": "application/json"
    }
});

// api.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

// let token = document.head.querySelector('meta[name="csrf-token"]') as HTMLMetaElement;

// if (token) {
//     api.defaults.headers.common['X-CSRF-TOKEN'] = token.content;
// } else {
//     console.error('CSRF token not found: https://laravel.com/docs/csrf#csrf-x-csrf-token');
// }

// export default api;