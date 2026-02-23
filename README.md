# Space Travel Bookings 

A **backend API** for offering bookings for rocket launches.

- Rockets have limited seats; launch requests are validated against rocket capacity.

- Launches are scheduled for specific rockets, with pricing and minimum passenger thresholds.

- Launch status lifecycle: scheduled → confirmed → successful, or cancellation/suspension paths.

- A customer is identified by their email address and has a name and phone number.

- One customer can book multiple seats on a launch but cannot exceed the available seats.

- Customers are billed upon booking, and payments are processed through a mock gateway.

## Features

### Rocket Management API
- Create, read, update, and delete rockets
- Filter rockets by range (suborbital, orbital, moon, mars)
- Filter rockets by minimum capacity (1-10 passengers)
- Paginated rocket listings
- Full data validation and error handling

## Logging

- Logs are written to stdout/stderr with timestamped level tags.
- Default log level is `info`. Set `LOG_LEVEL=debug` to enable debug output.