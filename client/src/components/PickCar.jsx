import { useEffect, useState } from "react";
import { useGetAllCarsQuery } from "../features/api/apiSlice";
import CarBox from "./CarBox";

function PickCar() {
  const { data } = useGetAllCarsQuery({ type: "user" });
  const [singleCar, setSingleCar] = useState();

  useEffect(() => {
    if (data) {
      const car = document.getElementById(0);
      car.classList.remove("bg-white", "text-black");
      car.classList.add("bg-[#ff4d30]", "text-white");
      setSingleCar(data[0]);
    }
  }, [data]);

  const clickHandler = (val) => {
    for (let i = 0; i < data.length; i++) {
      const car = document.getElementById(i);
      car.classList.remove("bg-[#ff4d30]", "text-white");
      car.classList.add("bg-white", "text-black");
    }
    const car = document.getElementById(val);
    car.classList.remove("bg-white", "text-black");
    car.classList.add("bg-[#ff4d30]", "text-white");
  };

  return (
    <>
      <section className="pick-section">
        <div className="container">
          <div className="pick-container">
            <div className="pick-container__title">
              <h3>Vehicle Models</h3>
              <h2>Our rental fleet</h2>
              <p>Choose from a variety of our amazing vehicles to rent for your next adventure or business trip</p>
            </div>
            <div className="pick-container__car-content">
              {/* pick car */}

              <div className="flex flex-col text-3xl font-extrabold">
                {data ? (
                  data.map((d, i) => {
                    return (
                      <button
                        id={i}
                        className="h-24 rounded-md w-auto px-4 uppercase border-2 border-gray-300 mt-2 bg-white text-black"
                        onClick={() => {
                          clickHandler(i);
                          setSingleCar(d);
                        }}
                      >
                        {d.model} <span className="ml-3">{d.mark}</span>
                      </button>
                    );
                  })
                ) : (
                  <div className="pick-box"></div>
                )}
              </div>
              {singleCar && <CarBox data={singleCar} />}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default PickCar;
