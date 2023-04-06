import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import { useGetAllCarsQuery, usePickCarMutation } from "../features/api/apiSlice";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import ArrowForward from "@mui/icons-material/ArrowForward";
function Models() {
  const { data } = useGetAllCarsQuery({ type: "user" });
  const [pickCarData, pickCarResponse] = usePickCarMutation();

  const [cars, setCars] = useState();
  const [error, setError] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [carPayment, setCarPayment] = useState("");
  const [pickDate, setPickDate] = useState("");
  const [dropDate, setDropDate] = useState("");
  const [pickTime, setPickTime] = useState("");
  const [dropTime, setDropTime] = useState("");
  const [pickError, setPickError] = useState(false);
  const [fillError, setFillError] = useState(false);

  const [formPopUp, setFormPopUp] = useState(false);

  useEffect(() => {
    if (pickCarResponse.status === "fulfilled") {
      setPickError(true);
      setTimeout(() => {
        setPickError(false);
      }, 6000);
    }
  }, [pickCarResponse]);
  const formHandler = (car) => {
    if (!localStorage.getItem("jwt")) {
      setErrorMessage("to proceed please login first");
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 6000);
    } else if (localStorage.getItem("jwt")) {
      setCarPayment(car);
      setFormPopUp(true);
    }
  };

  useEffect(() => {
    if (data) {
      setCars(data);
      cars && console.log(cars, "cars");
    }
  }, [data]);

  useEffect(() => {
    if (searchInput.length > 0) {
      setCars(data.filter((d) => d.model.toString().toLowerCase().startsWith(searchInput.toLowerCase())));
    } else if (searchInput.length === 0) {
      setCars(data);
    }
  }, [searchInput, data]);

  //pick car handler
  console.log(pickDate.toString().length, pickTime.toString().length);
  const pickCarHandler = (data) => {
    const { firstName, lastName, email, address, phone, profilePic } = JSON.parse(localStorage.getItem("user"));
    if (pickDate.toString().length > 0 && dropDate.toString().length > 0 && pickTime.toString().length > 0 && dropTime.toString().length > 0) {
      pickCarData({
        firstName,
        lastName,
        email,
        address,
        phone,
        profilePic,
        carPhoto: data.carPhoto,
        model: data.model,
        mark: data.mark,
        token: localStorage.getItem("jwt"),
        price: data.price,
        pickDate,
        pickTime,
        dropDate,
        dropTime,
        id: data._id,
      });
      setPickDate(" ");
      setDropDate(" ");
      setPickTime(" ");
      setDropTime(" ");
      setFormPopUp(false);
      setFillError(false);
    } else {
      setFillError(true);
      setTimeout(() => {
        setFillError(false);
      }, 5000);
    }
  };
  //_____________________________________________________________________________________________

  const [paymentContainer, setPaymentContainer] = useState(false);
  const [carPrice, setCarPrice] = useState("");
  const paymentHandler = (car) => {
    if (pickDate.toString().length > 0 && dropDate.toString().length > 0 && pickTime.toString().length > 0 && dropTime.toString().length > 0) {
      setPaymentContainer(true);
    } else {
      setPaymentContainer(false);
      setFillError(true);
      setTimeout(() => {
        setFillError(false);
      }, 5000);
    }
  };
  return (
    <>
      <section className="models-section">
        <input
          onChange={(e) => setSearchInput(e.target.value)}
          type="text"
          className="w-[80%] mx-[10%] h-20 mt-44 border focus:outline-none focus:border-2 rounded-full text-center text-2xl font-extrabold border-[#ff4c30]"
          placeholder="Search Vehicles"
        />
        {/* <HeroPages name="Vehicle Models" /> */}
        <div className="container">
          <div className="models-div">
            {cars ? (
              cars.map((car) => {
                return (
                  <div key={car._id} className="relative flex rounded-md items-center shadow-xl shadow-gray-500 flex-col bg-gray-50 h-[300px] w-[350px]">
                    <img src={`http://localhost:5000/uploads/${car.carPhoto}`} alt="CAR" className="h-64 w-[85%]" />
                    <p className="text-2xl flex top-0 right-[26px] px-2 py-2 text-gray-500 bg-gray-100  font-bold absolute">{car.mark}</p>
                    <div className="mt-4 text-2xl font-extrabold text-gray-500 bg-white flex justify-between h-auto w-[85%]">
                      <div className="flex gap-2">
                        <p className="">Model : </p>
                        <p className="text-red-400">{car.model}</p>
                      </div>
                      <div className="flex gap-2">
                        <p className="">Price : </p>
                        <p className="text-red-400">$ {car.price}</p>
                      </div>
                    </div>
                    <div className="mt-1 text-xl font-extrabold text-gray-500 bg-white flex justify-between h-auto w-[85%]">
                      <div className="flex gap-2">
                        <p className="">Door : </p>
                        <p className="text-red-400">{car.door}</p>
                      </div>
                      <div className="flex gap-2">
                        <p className="">Fuel : </p>
                        <p className="text-red-400">{car.fuel}</p>
                      </div>
                    </div>
                    <div className="mt-1 text-xl font-extrabold text-gray-500 bg-white flex justify-between h-auto w-[85%]">
                      <div className="flex gap-2">
                        <p className="">Transmission : </p>
                        <p className="text-red-400">{car.transmission}</p>
                      </div>
                      <div className="flex gap-2">
                        <p className="">Ac : </p>
                        <p className="text-red-400">{car.ac}</p>
                      </div>
                    </div>
                    {car.status === "Taken" && (
                      <div className="mt-4 rounded-md text-3xl font-extrabold text-white bg-red-400 flex py-3 justify-center items-center h-auto w-[85%] cursor-default">
                        {car.status}{" "}
                        <span className="text-xl text-gray-200 font-bold ml-2">
                          {"("}Visit Later {")"}
                        </span>{" "}
                      </div>
                    )}
                    {car.status === "available" && (
                      <div
                        onClick={() => {
                          formHandler(car);
                          setCarPrice(car.price);
                        }}
                        className="mt-4 rounded-md text-3xl font-extrabold text-white bg-[#ff4d30] flex py-3 justify-center items-center h-auto w-[85%] cursor-pointer hover:scale-105 duration-200"
                      >
                        Book Now
                      </div>
                    )}
                  </div>
                );
              })
            ) : (
              <div className="flex items-center absolute w-[100%] left-0 h-[100%] justify-center  text-3xl font-extrabold text-gray-500">Loading...</div>
            )}

            {error && errorMessage && (
              <div className="absolute z-20 text-3xl top-72 right-10 w-auto rounded-md h-auto border border-gray-500 text-gray-500 py-2 px-2 shadow-xl shadow-gray-400 flex items-center justify-center">
                {errorMessage}
              </div>
            )}
            {/* ################################################################################## */}
            {formPopUp && carPayment && (
              <div className="fixed z-10 backdrop-blur-sm backdrop-brightness-[0.7] bg-transparent  h-[100vh] w-[100%] top-0 left-0 flex flex-col items-center justify-center">
                <div
                  onClick={() => {
                    setPickDate(" ");
                    setDropDate(" ");
                    setPickTime(" ");
                    setDropTime(" ");
                    setFormPopUp(false);
                  }}
                  className="absolute z-20  h-[100vh] w-[100%] top-0 left-0 bg-transparent"
                ></div>
                <div className="relative text-2xl flex overflow- flex-col items-center justify-center rounded-md z-30 bg-white h-auto w-[90%] lg:w-[70%] lg:mt-20  left-0">
                  <p className="text-3xl font-extrabold text-gray-500">Rental Information</p>
                  <div className="hidden md:flex gap-4 px-2 py-2 w-[90%] h-[35%]">
                    <img src={`http://localhost:5000/uploads/${carPayment.carPhoto}`} alt="car" className="w-[50%] rounded-md h-[100%]" />
                    <div className="w-[50%] flex flex-col gap-4">
                      <div className="mt-4 text-2xl font-extrabold text-gray-500 bg-white flex justify-between h-auto w-[85%]">
                        <div className="flex gap-2">
                          <p className="">Model : </p>
                          <p className="text-red-400">{carPayment.model}</p>
                        </div>
                        <div className="flex gap-2">
                          <p className="">Price : </p>
                          <p className="text-red-400">$ {carPayment.price}</p>
                        </div>
                      </div>
                      <div className="mt-1 text-xl font-extrabold text-gray-500 bg-white flex justify-between h-auto w-[85%]">
                        <div className="flex gap-2">
                          <p className="">Door : </p>
                          <p className="text-red-400">{carPayment.door}</p>
                        </div>
                        <div className="flex gap-2">
                          <p className="">Fuel : </p>
                          <p className="text-red-400">{carPayment.fuel}</p>
                        </div>
                      </div>
                      <div className="mt-1 text-xl font-extrabold text-gray-500 bg-white flex justify-between h-auto w-[85%]">
                        <div className="flex gap-2">
                          <p className="">Transmission : </p>
                          <p className="text-red-400">{carPayment.transmission}</p>
                        </div>
                        <div className="flex gap-2">
                          <p className="">Ac : </p>
                          <p className="text-red-400">{carPayment.ac}</p>
                        </div>
                      </div>
                      <p className="text-xl w-[85%] flex justify-start font-extrabold text-gray-500">
                        Mark : <span className="text-red-400 ml-2">{carPayment.mark}</span>
                      </p>
                    </div>
                  </div>

                  {/* ################################################################################# */}
                  <div className="h-auto bg-white gap-4 px-2 mt-6 border-2 border-gray-500 py-2 w-[90%] flex flex-col md:flex-row">
                    <div className="h-auto flex flex-col items-center justify-center">
                      <p className="text-2xl font-extrabold py-1 ml-3 text-gray-500">Rental Form</p>
                      <p className="text-xl font-bold text-red-400">* each fields are required *</p>

                      <div className="border border-gray-500 mt-3 ml-3">
                        <p className="py-2 font-extrabold">Select Pick-Up Date & Time</p>
                        <p className="flex text-xl">
                          <input required onChange={(e) => setPickDate(e.target.value)} type="date" className="" />
                          <input required onChange={(e) => setPickTime(e.target.value)} type="time" className="" />
                        </p>
                      </div>
                      <div className="border border-gray-500 mt-3 ml-3">
                        <p className="py-2 font-extrabold">Select Drop-Off Date & Time</p>
                        <p className="flex text-xl">
                          <input required onChange={(e) => setDropDate(e.target.value)} type="date" className="" />
                          <input required onChange={(e) => setDropTime(e.target.value)} type="time" className="" />
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col bg-white text-gray-600 h-auto w-[100%] items-center justify-center">
                      <p className="text-3xl font-extrabold">Payment Methods</p>
                      <div className="flex gap-8 mt-6">
                        <div className="flex items-center px-2 border-r border-gray-600 flex-col gap-4 bg-white justify-center w-[50%]">
                          <p className="text-xl font-extrabold underline">Test Mode</p>
                          <p className="text-xl font-extrabold">Test This System With Out Any Payment</p>
                          <button
                            onClick={() => pickCarHandler(carPayment)}
                            className="w-[90%] flex gap-3 text-white h-20 bg-[#ff4d30] hover:scale-105 font-extrabold duration-150 rounded-md cursor-pointer items-center justify-center"
                          >
                            Book Car
                          </button>
                        </div>
                        <div className="flex items-center flex-col gap-4 bg-white justify-center w-[50%]">
                          <p className="text-xl font-extrabold underline">Real Payment</p>
                          <div className="flex gap-1 bg-white justify-center w-[50%]">
                            <img src="./paypal.png" alt="VISA" className="h-14 w-14" />
                            <img src="./discover.png" alt="VISA" className="h-14 w-14" />
                            <img src="./visa.png" alt="VISA" className="h-14 w-14" />
                            <img src="./master.png" alt="VISA" className="h-14 w-14" />
                          </div>
                          <div
                            onClick={() => paymentHandler()}
                            className="w-[90%] flex gap-3 text-white h-20 bg-blue-500 hover:scale-105 duration-150 rounded-md cursor-pointer items-center justify-center"
                          >
                            <p className="text-2xl font-extrabold">Pay</p>
                            <ArrowForward fontSize="large" className="" />
                          </div>
                        </div>
                      </div>
                    </div>
                    {pickCarResponse.status === "rejected" && <div className="w-[100%] px-2 py-2 border text-xl font-bold text-gray-500 absolute top-10 right-20">{pickCarResponse.error.data}</div>}
                    {pickError && (
                      <div className="w-[50%] px-2 py-5 border border-emerald-400 bg-white text-2xl font-bold text-emerald-400 absolute z-40 bottom-10 right-0">{pickCarResponse.data.message}</div>
                    )}
                    {fillError && (
                      <div className="w-[50%] px-2 py-5 border border-gray-500 bg-white text-2xl font-bold text-gray-500 absolute z-40 bottom-10 right-2">please insert pick and drop date</div>
                    )}
                  </div>
                  {/* ############################################################################### */}
                </div>
              </div>
            )}
            {/* ______________________________________________###################____________________ */}
            {paymentContainer && (
              <div className={`fixed overflow-y-scroll left-0 py-10 top-0 flex flex-col z-50 min-h-[100vh] max-h-[200vh] h-auto w-full bg-white justify-center items-center`}>
                <div className="absolute overflow-y-scroll left-0 py-10 top-0 flex flex-col z-50 min-h-[100vh] max-h-[200vh] h-auto w-full bg-white justify-center items-center">
                  <p className="text-3xl font-extrabold my-4 uppercase">Pay with</p>
                  <div className="flex gap-1 w-[50%] bg-white justify-center">
                    <img src="./paypal.png" alt="VISA" className="h-20 w-20" />
                    <img src="./discover.png" alt="VISA" className="h-20 w-20" />
                    <img src="./visa.png" alt="VISA" className="h-20 w-20" />
                    <img src="./master.png" alt="VISA" className="h-20 w-20" />
                  </div>
                  <PayPalScriptProvider options={{ "client-id": "AXbnaHO5pAQ6QObPGEGgbpZmMfYz6vjA9RyeqYnTSt07Jk52Og84IIL0fkyjnQ_E - iGzE6B6yqi2CBVb" }}>
                    <PayPalButtons
                      createOrder={(data, actions) => {
                        return actions.order
                          .create({
                            purchase_units: [
                              {
                                amount: {
                                  value: carPrice,
                                },
                              },
                            ],
                          })
                          .then((orderId) => {
                            // Your code here after create the order
                            return orderId;
                          });
                      }}
                      onApprove={function (data, actions) {
                        pickCarHandler(carPayment);
                        return actions.order.capture().then(function () {
                          alert("payment is done car booked successfully");
                        });
                      }}
                      onError={(err) => {
                        alert(err);
                      }}
                    />
                  </PayPalScriptProvider>
                </div>
                <p
                  fontSize="large"
                  className="absolute cursor-pointer z-50 top-4 right-4 text-black hover:bg-gray-200 font-extrabold py-2 text-xl px-2 border"
                  onClick={() => setPaymentContainer(false)}
                >
                  Close
                </p>
              </div>
            )}
            {/* ################################################################################## */}
          </div>
          {cars && cars.length < 1 && <div className="w-[100%] font-extrabold h-[100%] flex items-center justify-center text-3xl text-gray-500">Cars Not Found</div>}
        </div>
        <div className="book-banner">
          <div className="book-banner__overlay"></div>
          <div className="container">
            <div className="text-content">
              <h2>Book a car by getting in touch with us</h2>
              <span>
                <i className="fa-solid fa-phone"></i>
                <h3>(123) 456-7869</h3>
              </span>
            </div>
          </div>
        </div>
        <Footer />
      </section>
    </>
  );
}

export default Models;
