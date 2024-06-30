import { http, HttpResponse } from "msw";

export const handlers = [
  http.post(
    "https://h5jbtjv6if.execute-api.eu-north-1.amazonaws.com",
    async ({ request }) => {
      const body = await request.json();
      const price = parseInt(body.lanes) * 100 + parseInt(body.people) * 120;

      const booking = {
        price: price,
        id: "STR123BOW45",
        when: body.when,
        lanes: body.lanes,
        people: body.people,
        shoes: body.shoes,
      };

      console.log(booking);

      return HttpResponse.json({ success: true, booking: booking });
    }
  ),
];
