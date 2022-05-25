import LoginPage from "./components/LoginPage/LoginPage";
import {default as AdminMain} from "./components/AdminMainPage/UserMainPage";
import {default as EngineerMain} from './components/EngineerMainPage/UserMainPage';
import {default as OperatorMain} from './components/CallOperatorMainPage/UserMainPage'


export const routes = [
    {
        path: '/admin-main',
        exact: true,
        element: <AdminMain />,
        isProtected: true,
        users: ['Admin']
    },

    {
        path: '/engineer-main',
        exact: true,
        element: <EngineerMain />,
        isProtected: true,
        users: ['Engineer']
    },

    {
        path: '/operator-main',
        exact: true,
        element: <OperatorMain />,
        isProtected: true,
        users: ['CallOperator']
    },

    {
        path: '/',
        exact: true,
        element: <OperatorMain />,
        isProtected: true,
        users: ['CallOperator', 'Engineer', 'Admin']
    },

    {
        path: '/login',
        exact: true,
        element: <LoginPage />,
        isProtected: false,
        users: ['CallOperator', 'Engineer', 'Admin']
    }
]