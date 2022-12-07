import Admin from "./pages/Admin";
import {ADMIN_ROUTE, BOOKING_ROUTE, PAYMENT_ROUTE, CAR_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE, HOME_ROUTE, RENT_ROUTE, FINES_ROUTE, ADMINRENT_ROUTE, ADMINFINES_ROUTE} from "./utils/consts";
import Booking from "./pages/Booking";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import Car from "./pages/Car";
import Rent from "./pages/Rent";
import Fines from "./pages/Fines";
import Payment from "./pages/Payment";
import AdminFines from "./pages/AdminFines";
import AdminRent from "./pages/AdminRent";

export const authRoutes = [
    {
        path: ADMIN_ROUTE,
        Component: Admin
    },
    {
        path: BOOKING_ROUTE,
        Component: Booking
    },
    {
        path: RENT_ROUTE,
        Component: Rent
    },
    {
        path: FINES_ROUTE,
        Component: Fines
    },
    {
        path: PAYMENT_ROUTE,
        Component: Payment
    },
    {
        path: ADMINRENT_ROUTE,
        Component: AdminRent
    },
    {
        path: ADMINFINES_ROUTE,
        Component: AdminFines
    },
]

export const publicRoutes = [
    {
        path: HOME_ROUTE,
        Component: Home
    },
    {
        path: LOGIN_ROUTE,
        Component: Auth
    },
    {
        path: REGISTRATION_ROUTE,
        Component: Auth
    },
    {
        path: CAR_ROUTE + '/:id',
        Component: Car
    },
]