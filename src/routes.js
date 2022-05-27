import LoginPage from "./components/LoginPage/LoginPage";
import {default as AdminMain} from "./components/AdminMainPage/UserMainPage";
import {default as EngineerMain} from './components/EngineerMainPage/UserMainPage';
import {default as OperatorMain} from './components/CallOperatorMainPage/UserMainPage'
import TarrifManagement from "./components/TarrifManagement/TarrifManagement";
import PeopleManagement from "./components/PeopleManagement/PeopleManagement";
import EngineerManagement from "./components/EngineerManagement/EngineerManagement";
import CallOperatorManagement from "./components/CallOperatorManagement/CallOperatorManagement";
import AdminManagement from "./components/AdminManagement/AdminManagement";


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
    },

    {
        path: '/tarrif-management',
        exact: true,
        element: <TarrifManagement />,
        isProtected: false,
        users: ['Admin']
    },

    {
        path: '/people',
        exact: true,
        element: <PeopleManagement />,
        isProtected: false,
        users: ['Admin']
    },

    {
        path: '/engineers',
        exact: true,
        element: <EngineerManagement />,
        isProtected: false,
        users: ['Admin']
    },

    {
        path: '/operators',
        exact: true,
        element: <CallOperatorManagement/>,
        isProtected: false,
        users: ['Admin']
    },

    {
        path: '/admins',
        exact: true,
        element: <AdminManagement/>,
        isProtected: false,
        users: ['Admin']
    },


]