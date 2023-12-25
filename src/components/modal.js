import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function MyModal({ open, setOpen, total }) {
  const cancelButtonRef = useRef(null);
  const [paypalorcard, setPaypalorcard] = useState(false);
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [zipcode, setZipcode] = useState("");

  const [cardholder, setCardholder] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expired, setExpired] = useState({ month: "", year: "" });
  const [securityCode, setSecurityCode] = useState("");

  const [paypalEmail, setPaypalEmail] = useState("");

  const years = [];
  const currentDate = new Date();
  const date = currentDate.getFullYear();
  for (let i = 0; i < 8; i++) {
    years.push(date + i);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const deliveryData = JSON.parse(localStorage.getItem("cart"));
    const addressData = {
      fullName: fullName,
      email: email,
      address: address,
      city: city,
      country: country,
      state: state,
      zipcode: zipcode,
    };
    // const cardData = {
    //   cardholder: cardholder,
    //   cardNumber: cardNumber,
    //   expired: expired,
    //   securityCode: securityCode,
    // };
    const paymentData = () =>{
      if(paypalorcard === true){
        return {
          paypalEmail: paypalEmail
        }
      }else{
        return {
          cardholder: cardholder,
          cardNumber: cardNumber,
          expired: expired,
          securityCode: securityCode,
        }
      }
    }
    const cardData = paymentData();
    console.log(addressData);
    console.log(cardData);
    console.log(deliveryData);
    const userID  = localStorage.getItem("userID");
    async function setOrder() {
      const cartResponse = await axios.get(`/fakeapi/cart?userID=${userID}`);
      const orderData = {
        id: Math.floor(Math.random() * 100000000),
        userID: userID,
        addressData: addressData,
        products: cartResponse.data[0].products,
        status: "pending",
        date: `${currentDate.getFullYear()}-${currentDate.getMonth()}-${currentDate.getDate()}`,
        total: total
      }
      await axios.post(`/fakeapi/orders`, orderData); 
      axios.patch(`/fakeapi/cart/${cartResponse.data[0].id}`, {products: []});
      navigate("/order-history");
    }
    setOrder();
  
    // const orderDate = `${currentDate.getFullYear()}-${currentDate.getMonth()}-${currentDate.getDate()}`;
    // const user = JSON.parse(localStorage.getItem("profile"));
    // localStorage.setItem("order", JSON.stringify({user:user.username, deliveryData:deliveryData, totalprice:total, date:orderDate}));
    // console.log(total);
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={setOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-gray-600 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="mt-3 text-center">
                  <div className="flex justify-center w-full mt-2">
                    <div class="container max-w-screen-lg mx-auto">
                      <div class="bg-gray-700 rounded p-4 px-4 md:p-8">
                        <div class="grid gap-4 gap-y-2 text-sm text-white grid-cols-1">
                          <div class="text-white">
                            <p class="font-medium text-lg">Shipping address</p>
                            <p>Please fill out all the fields.</p>
                          </div>

                          <div class="lg:col-span-2">
                            <div class="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                              <div class="md:col-span-5">
                                <label for="full_name">Full Name</label>
                                <input
                                  type="text"
                                  name="full_name"
                                  id="full_name"
                                  class="h-10 border mt-1 rounded px-4 w-full bg-gray-600 focus:ring focus:outline-none"
                                  value={fullName}
                                  onChange={(e) => {
                                    setFullName(e.target.value);
                                  }}
                                />
                              </div>

                              <div class="md:col-span-5">
                                <label for="email">Email Address</label>
                                <input
                                  type="text"
                                  name="email"
                                  id="email"
                                  class="h-10 border mt-1 placeholder-white rounded px-4 w-full bg-gray-600 focus:ring focus:outline-none"
                                  value={email}
                                  onChange={(e) => {
                                    setEmail(e.target.value);
                                  }}
                                  placeholder="email@domain.com"
                                />
                              </div>

                              <div class="md:col-span-3">
                                <label for="address">Address / Street</label>
                                <input
                                  type="text"
                                  name="address"
                                  id="address"
                                  class="h-10 border mt-1 rounded px-4 w-full bg-gray-600 focus:ring focus:outline-none"
                                  value={address}
                                  onChange={(e) => {
                                    setAddress(e.target.value);
                                  }}
                                  placeholder=""
                                />
                              </div>

                              <div class="md:col-span-2">
                                <label for="city">City</label>
                                <input
                                  type="text"
                                  name="city"
                                  id="city"
                                  class="h-10 border mt-1 rounded px-4 w-full bg-gray-600 focus:ring focus:outline-none"
                                  value={city}
                                  onChange={(e) => {
                                    setCity(e.target.value);
                                  }}
                                  placeholder=""
                                />
                              </div>

                              <div class="md:col-span-2">
                                <label for="country">Country / region</label>

                                <input
                                  name="country"
                                  id="country"
                                  placeholder="Country"
                                  class="h-10 border mt-1 placeholder-white rounded px-4 w-full bg-gray-600 focus:ring focus:outline-none"
                                  value={country}
                                  onChange={(e) => {
                                    setCountry(e.target.value);
                                  }}
                                />
                              </div>

                              <div class="md:col-span-2">
                                <label for="state">State / province</label>

                                <input
                                  name="state"
                                  id="state"
                                  placeholder="State"
                                  class="h-10 border mt-1 placeholder-white rounded px-4 w-full bg-gray-600 focus:ring focus:outline-none"
                                  value={state}
                                  onChange={(e) => {
                                    setState(e.target.value);
                                  }}
                                />
                              </div>

                              <div class="md:col-span-1">
                                <label for="zipcode">Zipcode</label>
                                <input
                                  type="text"
                                  name="zipcode"
                                  id="zipcode"
                                  class="transition-all flex items-center h-10 border mt-1 rounded px-4 w-full bg-gray-600 focus:ring focus:outline-none"
                                  placeholder=""
                                  value={zipcode}
                                  onChange={(e) => {
                                    setZipcode(e.target.value);
                                  }}
                                />
                              </div>
                            </div>

                            <div className="w-full sm:w-auto mx-auto rounded-xl bg-gray-700">
                              {paypalorcard === false ? (
                                <div className="p-4">
                                  <h1 className="text-2xl font-semibold text-white text-center">
                                    Card payment
                                  </h1>
                                  <button
                                    className="rounded-md h-7 w-24 bg-blue-600 mt-2 hover:bg-blue-500"
                                    onClick={() =>
                                      setPaypalorcard(!paypalorcard)
                                    }
                                  >
                                    Card/PayPal
                                  </button>
                                  <div className="">
                                    <div className="my-3">
                                      <input
                                        type="text"
                                        className="block w-full px-5 py-2 border rounded-lg bg-gray-600 shadow-lg placeholder-white text-white focus:ring focus:outline-none"
                                        placeholder="Card holder"
                                        maxLength="22"
                                        value={cardholder}
                                        onChange={(e) =>
                                          setCardholder(e.target.value)
                                        }
                                      />
                                    </div>
                                    <div className="my-3">
                                      <input
                                        type="text"
                                        className="block w-full px-5 py-2 border rounded-lg bg-gray-600 shadow-lg placeholder-white text-white focus:ring focus:outline-none"
                                        placeholder="Card number"
                                        value={cardNumber}
                                        onChange={(e) =>
                                          setCardNumber(e.target.value)
                                        }
                                        maxLength="19"
                                      />
                                    </div>
                                    <div className="my-3 flex flex-col">
                                      <div className="mb-2">
                                        <label
                                          htmlFor=""
                                          className="text-white"
                                        >
                                          Expired
                                        </label>
                                      </div>
                                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                                        <select
                                          name=""
                                          id=""
                                          className="form-select appearance-none block w-full px-5 py-2 border rounded-lg bg-gray-600 shadow-lg placeholder-white text-white focus:ring focus:outline-none"
                                          value={expired.month}
                                          onChange={(e) =>
                                            setExpired({
                                              ...expired,
                                              month: e.target.value,
                                            })
                                          }
                                        >
                                          <option value="" selected disabled>
                                            MM
                                          </option>
                                          <option value="01">01</option>
                                          <option value="02">02</option>
                                          <option value="03">03</option>
                                          <option value="04">04</option>
                                          <option value="05">05</option>
                                          <option value="06">06</option>
                                          <option value="07">07</option>
                                          <option value="08">08</option>
                                          <option value="09">09</option>
                                          <option value="10">10</option>
                                          <option value="11">11</option>
                                          <option value="12">12</option>
                                        </select>
                                        <select
                                          name=""
                                          id=""
                                          className="form-select appearance-none block w-full px-5 py-2 border rounded-lg bg-gray-600 shadow-lg placeholder-white text-white focus:ring focus:outline-none"
                                          value={expired.year}
                                          onChange={(e) =>
                                            setExpired({
                                              ...expired,
                                              year: e.target.value,
                                            })
                                          }
                                        >
                                          <option value="" selected disabled>
                                            YY
                                          </option>
                                          {years.map((year) => {
                                            return (
                                              <option value={year}>
                                                {year}
                                              </option>
                                            );
                                          })}
                                        </select>
                                        <input
                                          type="text"
                                          className="block w-full col-span-2 px-5 py-2 border rounded-lg bg-gray-600 shadow-lg placeholder-white text-white focus:ring focus:outline-none"
                                          placeholder="Security code"
                                          maxLength="3"
                                          value={securityCode}
                                          onChange={(e) =>
                                            setSecurityCode(e.target.value)
                                          }
                                        />
                                      </div>
                                    </div>
                                  </div>
                                  <div className="flex flex-col justify-center items-center mt-5">
                                    <ul className="flex">
                                      <li className="mx-2">
                                        <img
                                          className="w-16"
                                          src="https://www.computop-paygate.com/Templates/imagesaboutYou_desktop/images/computop.png"
                                          alt=""
                                        />
                                      </li>
                                      <li className="mx-2">
                                        <img
                                          className="w-14"
                                          src="https://www.computop-paygate.com/Templates/imagesaboutYou_desktop/images/verified-by-visa.png"
                                          alt=""
                                        />
                                      </li>
                                      <li className="ml-5">
                                        <img
                                          className="w-7"
                                          src="https://www.computop-paygate.com/Templates/imagesaboutYou_desktop/images/mastercard-id-check.png"
                                          alt=""
                                        />
                                      </li>
                                    </ul>
                                  </div>
                                </div>
                              ) : (
                                <div className="p-4">
                                  <h1 className="text-2xl font-semibold text-white text-center">
                                    Paypal payment
                                  </h1>
                                  <button
                                    className="rounded-md h-7 w-24 bg-blue-600 mt-2 hover:bg-blue-500"
                                    onClick={() =>
                                      setPaypalorcard(!paypalorcard)
                                    }
                                  >
                                    Card/PayPal
                                  </button>
                                  <div className="">
                                    <div className="my-3">
                                      <input
                                        type="text"
                                        className="block w-full px-5 py-2 border rounded-lg bg-gray-600 shadow-lg placeholder-white text-white focus:ring focus:outline-none"
                                        placeholder="Paypal email"
                                        maxLength="22"
                                        value={paypalEmail}
                                        onChange={(e) =>
                                          setPaypalEmail(e.target.value)
                                        }
                                      />
                                    </div>
                                  </div>
                                  <div className="w-full flex justify-center">
                                    <div className="flex justify-center items-center w-2/5 bg-yellow-400 rounded-lg">
                                      <img
                                        width="30"
                                        class="my-1 me-1"
                                        src="https://www.paypalobjects.com/images/shared/momgram@2x.png"
                                        alt="paypal logo"
                                      />
                                      <h1 className="text-3xl font-bold text-blue-900">
                                        Pay
                                      </h1>
                                      <h1 className="text-3xl font-bold text-blue-500">
                                        Pal
                                      </h1>
                                    </div>
                                  </div>
                                </div>
                              )}
                              <div class="md:col-span-5 text-right">
                                <div class="inline-flex gap-2 mt-2 items-end">
                                  <button
                                    type="button"
                                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                    onClick={() => setOpen(false)}
                                    ref={cancelButtonRef}
                                  >
                                    Cancel
                                  </button>
                                  <button
                                    class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                    onClick={handleSubmit}
                                  >
                                    Submit
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
