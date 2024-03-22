// const moment = require('moment');
// const bookings = [
//     {
//         startDate: '2024-03-09T00:00:03',
//         endDate: '2024-03-20T00:05:03'
//     },
//     {
//         startDate: '2024-03-25T00:00:00',
//         endDate: '2024-03-27T00:00:00'
//     },
//     {
//         startDate: '2024-04-02T12:00:00',
//         endDate: '2024-04-05T12:00:00'
//     },
//     {
//         startDate: '2024-04-02T12:00:00',
//         endDate: '2024-04-05T12:00:00'
//     }
// ];

const { SERVER_URL } = require("./utils/config");

// const checkBookingOverlap = async (startDate, endDate) => {
//     try {
//         // const overlappingBooking = bookings.find(booking =>
//         //     (new Date(booking.startDate) < endDate && new Date(booking.endDate) > startDate) ||
//         //     (new Date(booking.startDate).getTime() === startDate.getTime() && new Date(booking.endDate).getTime() === endDate.getTime())
//         // );
//         // return { hasOverlap: !!overlappingBooking, overlappingBooking }; // Return boolean and overlapping booking object


//         const overlappingBookings = bookings.filter(booking =>
//             (new Date(booking.startDate) < endDate && new Date(booking.endDate) > startDate) ||
//             (new Date(booking.startDate).getTime() === startDate.getTime() && new Date(booking.endDate).getTime() === endDate.getTime())
//         );
//         return { hasOverlap: overlappingBookings.length > 0, overlappingBookings }; // Return boolean and array of overlapping bookings
//     } catch (error) {
//         console.error("Error checking for overlap:", error);
//         throw error;
//     }
// };

// // Example usage
// const startDate = moment('2024-04-01 07:07:30', 'YYYY-MM-DD HH:mm:ss').toDate();
// const endDate = moment('2024-04-02 12:01:00', 'YYYY-MM-DD HH:mm:ss').toDate();

// checkBookingOverlap(startDate, endDate)
//     .then(isOverlap => {
//         console.log("Is there an overlap?", isOverlap);
//     })
//     .catch(error => {
//         console.error("Error checking for overlap:", error);
//     });

console.log(SERVER_URL)