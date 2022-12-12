CREATE TABLE public.User (
    user_id SERIAL PRIMARY KEY,
    email text NOT NULL UNIQUE,
    user_password text NOT NULL
);

CREATE TABLE public.Admin (
    admin_id SERIAL PRIMARY KEY,
    user_id integer NOT NULL REFERENCES  public.User(user_id)
);

CREATE TABLE public.Client (
    client_id SERIAL PRIMARY KEY ,
    user_id integer NOT NULL REFERENCES  public.User(user_id),
    client_name text NOT NULL,
    surname text NOT NULL,
    phone text NOT NULL UNIQUE,
    rate integer DEFAULT 5 NOT NULL,
    client_address text NOT NULL
);

CREATE TABLE public.Car_model (
	model_id SERIAL PRIMARY KEY ,
	model_name text NOT NULL UNIQUE
);

CREATE TABLE public.Car_brand (
	brand_id SERIAL PRIMARY KEY ,
	brand_name text NOT NULL UNIQUE
);

CREATE TABLE public.Car_class (
	class_id SERIAL PRIMARY KEY ,
	class_name text NOT NULL UNIQUE
);

CREATE TABLE public.Gearbox_type (
	type_id SERIAL PRIMARY KEY ,
	type_name text NOT NULL UNIQUE
);

CREATE TABLE public.Color (
	color_id SERIAL PRIMARY KEY ,
	color_name text NOT NULL UNIQUE
);

CREATE TABLE public.Credit_card (
	client_id SERIAL PRIMARY KEY REFERENCES Client(client_id),
	card_number INTEGER NOT NULL,
	card_holder text NOT NULL,
	exp_date date NOT NULL,
	CVV INTEGER NOT NULL
);

CREATE TABLE public.Car_group (
	group_id SERIAL PRIMARY KEY,
	car_brand_id INTEGER NOT NULL REFERENCES  public.Car_brand(brand_id),
	car_model_id INTEGER NOT NULL REFERENCES  public.Car_model(model_id),
	car_class_id INTEGER NOT NULL REFERENCES  public.Car_model(model_id),
	gearbox_type_id INTEGER NOT NULL REFERENCES public.Gearbox_type(type_id),
	creation_year INTEGER NOT NULL,
	fuel_consumption REAL NOT NULL,
	seats_number INTEGER NOT NULL,
	image VARCHAR(300),
	car_cost REAL NOT NULL
);

CREATE TABLE public.Car (
	car_id SERIAL PRIMARY KEY,
	car_group_id INTEGER NOT NULL REFERENCES public.Car_group(group_id),
	color_id INTEGER NOT NULL REFERENCES public.Color(color_id),
	car_number text NOT NULL UNIQUE,
    is_deleted BOOLEAN DEFAULT false NOT NULL
);

CREATE TABLE public.State(
    state_id SERIAL PRIMARY KEY,
    state_name text NOT NULL UNIQUE
);

CREATE TABLE public.Booking(
	booking_id SERIAL PRIMARY KEY,
	client_id INTEGER NOT NULL REFERENCES public.Client(client_id),
	car_id INTEGER NOT NULL REFERENCES public.Car(car_id),
	start_date date NOT NULL,
	end_date date NOT NULL,
	baby_seat_amount INTEGER NOT NULL,
	is_driver BOOLEAN NOT NULL,
	booking_date date NOT NULL,
	booking_state INTEGER NOT NULL REFERENCES public.State(state_id)
);

CREATE TABLE public.Rent(
	rent_id SERIAL PRIMARY KEY,
	booking_id INTEGER NOT NULL REFERENCES public.Booking(booking_id),
	rent_cost REAL NOT NULL,
	rent_state INTEGER NOT NULL REFERENCES public.State(state_id)
);

CREATE TABLE public.Fine(
	fine_id SERIAL PRIMARY KEY,
	car_id INTEGER NOT NULL REFERENCES public.Car(car_id),
	fine_cost REAL NOT NULL,
	fine_date date NOT NULL
);