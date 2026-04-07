const inventory = [
  { id: 1, car_make: "Lincoln", car_model: "Navigator", car_year: 2009 },
  { id: 2, car_make: "Mazda", car_model: "Miata MX-5", car_year: 2001 },
  { id: 3, car_make: "Honda", car_model: "Accord", car_year: 1983 },
  { id: 4, car_make: "Land Rover", car_model: "Defender Ice Edition", car_year: 2010 },
  { id: 5, car_make: "Honda", car_model: "Accord", car_year: 1995 },
];

// ---  Find Honda ---
function getCarHonda(carInventory) {
  // Use find() to get the first object where car_make is "Honda"
  const honda = carInventory.find(car => car.car_make === "Honda");
  
  if (honda) {
    return `This is a ${honda.car_make} ${honda.car_model} from ${honda.car_year}.`;
  }
}

console.log("Honda Search:", getCarHonda(inventory));


// ---  Sort by Year ---
function sortCarInventoryByYear(carInventory) {
  // Use sort() with a comparison function for ascending order
  return carInventory.sort((a, b) => a.car_year - b.car_year);
}

const sortedInventory = sortCarInventoryByYear(inventory);
console.log("Sorted Inventory:", sortedInventory);
