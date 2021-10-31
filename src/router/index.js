import { createRouter, createWebHistory} from 'vue-router';
import Onboard from '@/views/Onboard';
import Login from '@/views/Login';
import Register from '@/views/Register';
import ForgotPassword from '@/views/ForgotPassword';
import Dashboard from '@/views/Dashboard';
import Questions from '@/views/Questions';
import { auth } from '../firebase/firebaseInit';


const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'Onboard',
            component: Onboard
        },
        {
            path: '/login',
            name: 'Login',
            component: Login,
            meta: {
                guest: true
            }
        },
        {
            path: '/register',
            name: 'Register',
            component: Register,
            meta: {
                guest: true
            }
        },
        {
            path: '/forgotpassword',
            name: 'ForgotPassword',
            component: ForgotPassword
        },
        {
            path: '/dashboard',
            // redirect: '/login',
            name: 'Dashboard',
            component: Dashboard,
            meta: {
                user: true
            }
        },
        {
            path: '/questions',
            name: 'Questions',
            component: Questions
        }
    ]
    
});


// Nav Guards
router.beforeEach((to, from, next) => {
    // Check if user auth needed
    if(to.matched.some(record => record.meta.user)) {
        // Check if NOT logged in
        if(!auth.currentUser) {
            // Go to Login page
            next({
                path: '/login',
                query: {
                    redirect: to.fullPath
                }
            });
            // return false;
        } else {
            // If logged in, proceed to route
            next();
        }
        // Check if guest auth needed
    } else if(to.matched.some(record => record.meta.guest)) {
        // Check if logged in
        if(auth.currentUser) {
            // Go to Dashboard
            next({
                path: '/dashboard',
                query: {
                    redirect: to.fullPath
                }
            });
        } else {
            // If NOT logged in, proceed to route
            next();
        }
    } else {
        // If no user or guest auth needed, proceed to route
        next();
    }
});

export default router;