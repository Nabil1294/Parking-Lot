export function formatDateTime(dateTime) {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '12', minute: '2-digit' };
    return new Date(dateTime).toLocaleDateString('en-US', options);
  }
  
  export function calculateParkingFee(hours, rate) {
    return hours * rate;
  }