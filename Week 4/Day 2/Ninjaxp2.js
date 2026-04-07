class Bird {
  constructor() {
    console.log("I'm a bird. 🦢");
  }
}

class Flamingo extends Bird {
  constructor() {
    super(); // Must be called first!
    console.log("I'm pink. 🌸");
  }
}

const pet = new Flamingo();


