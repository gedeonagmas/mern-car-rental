import { Link } from "react-router-dom";

function CarBox({ data }) {
  return (
    <>
      <div className="box-cars">
        {/* car */}
        <div className="pick-car">
          <img src={`http://localhost:5000/uploads/${data.carPhoto}`} alt="car_img" className="h-[320px] rounded-md" />
        </div>
        {/* description */}
        <div className="pick-description">
          <div className="pick-description__price">
            <span>${data.price}</span>/ rent per day
          </div>
          <div className="pick-description__table">
            <div className="pick-description__table__col">
              <span>Model</span>
              <span>{data.model}</span>
            </div>

            <div className="pick-description__table__col">
              <span>Mark</span>
              <span>{data.mark}</span>
            </div>

            <div className="pick-description__table__col">
              <span>Year</span>
              <span>{data.year}</span>
            </div>

            <div className="pick-description__table__col">
              <span>Doors</span>
              <span>{data.door}</span>
            </div>

            <div className="pick-description__table__col">
              <span>AC</span>
              <span>{data.ac}</span>
            </div>

            <div className="pick-description__table__col">
              <span>Transmission</span>
              <span>{data.transmission}</span>
            </div>

            <div className="pick-description__table__col">
              <span>Fuel</span>
              <span>{data.fuel}</span>
            </div>
          </div>
          {/* btn cta */}
          <Link className="cta-btn" to="book">
            Reserve Now
          </Link>
        </div>
      </div>
    </>
  );
}

export default CarBox;
