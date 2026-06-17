const getTimeUntilNewYear = () => {
    const now = new Date();
    const newYear = new Date(now.getFullYear() + 1, 0, 1);
    const diff = newYear - now;

    const days = Math.floor(diff / 864e5);
    const hours = Math.floor((diff / 36e5) % 24);
    const mins = Math.floor((diff / 6e4) % 60);
    const secs = Math.floor((diff / 1e3) % 60);

    return `the 1st January is in ${days} days and ${hours}:${mins}:${secs} hours`;
};

const getMinutesLived = (birthdateStr) => {
    return Math.floor((new Date() - new Date(birthdateStr)) / 6e4);
};

const getNextHoliday = () => {
    const now = new Date();
    const holidayDate = new Date(now.getFullYear(), 11, 25);
    if (now > holidayDate) holidayDate.setFullYear(now.getFullYear() + 1);

    const diff = holidayDate - now;
    const days = Math.floor(diff / 864e5);
    const hours = Math.floor((diff / 36e5) % 24);

    return `Next holiday (Christmas) is in ${days} days and ${hours} hours.`;
};

console.log(getTimeUntilNewYear());
console.log(`Minutes lived: ${getMinutesLived("1995-05-15")}`);
console.log(getNextHoliday());
