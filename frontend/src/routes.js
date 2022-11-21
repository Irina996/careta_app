import Admin from "./pages/Admin";
import {ADMIN_ROUTE, BOOKING_ROUTE, CAR_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE, HOME_ROUTE, RENT_ROUTE, FINES_ROUTE, RENTADMIN_ROUTE, FINESADMIN_ROUTE} from "./utils/consts";
import Booking from "./pages/Booking";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import Car from "./pages/Car";
import Rent from "./pages/Rent";
import Fines from "./pages/Fines";

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
        path: RENTADMIN_ROUTE,
        Component: Rent
    },
    {
        path: FINESADMIN_ROUTE,
        Component: Fines
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