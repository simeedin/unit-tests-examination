import "./BookingInfo.scss";

import Input from "../Input/Input";

function BookingInfo({ updateBookingDetails }) {
  return (
    <section className="booking-info">
      <header>
        <h2 className="booking-info__heading">When, WHAT & Who</h2>
      </header>
      <form className="booking-info__details">
        <section className="booking-info__when">
          <Input
            label="Date"
            type="date"
            customClass="booking-info__date"
            name="when"
            data-testid="when"
            disabled="disabled"
            handleChange={updateBookingDetails}
          />
          <Input
            label="Time"
            type="text"
            name="time"
            data-testid="time"
            handleChange={updateBookingDetails}
          />
        </section>
        <Input
          label="Number of awesome bowlers"
          type="number"
          customClass="booking-info__who"
          name="people"
          data-testid="people"
          handleChange={updateBookingDetails}
        />
        <Input
          label="Number of lanes"
          type="number"
          customClass="booking-info__lanes"
          name="lanes"
          data-testid="lanes"
          handleChange={updateBookingDetails}
        />
      </form>
    </section>
  );
}

export default BookingInfo;
