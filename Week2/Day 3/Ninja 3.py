import random
from abc import ABC, abstractmethod

# =================================================================
# TEMPERATURE CONVERSION SYSTEM (SOLID PRINCIPLES)
# =================================================================

class Temperature(ABC):
    """
    Base class following the Open/Closed Principle.
    New temperature scales can be added without modifying this base.
    """
    def __init__(self, value):
        self.value = value

    @abstractmethod
    def to_celsius(self):
        """All subclasses must implement a path to Celsius."""
        pass

class Celsius(Temperature):
    def to_celsius(self):
        return self.value
    
    def to_kelvin(self):
        return self.value + 273.15
    
    def to_fahrenheit(self):
        return (self.value * 9/5) + 32

class Kelvin(Temperature):
    def to_celsius(self):
        return self.value - 273.15
    
    def to_fahrenheit(self):
        return (self.to_celsius() * 9/5) + 32

class Fahrenheit(Temperature):
    def to_celsius(self):
        return (self.value - 32) * (5/9)
    
    def to_kelvin(self):
        return self.to_celsius() + 273.15


# =================================================================
# QUANTUM PHYSICS SIMULATION
# =================================================================

class QuantumParticle:
    """
    Models a particle with position (x), momentum (y), and spin (p).
    Implements measurement disturbance and Quantum Entanglement.
    """
    def __init__(self, x=0, y=0.0, p=0.5):
        self.x = x  # Position
        self.y = y  # Momentum
        self.p = p  # Spin
        self.entangled_with = None

    def _apply_disturbance(self):
        """Simulates the observer effect where measurement alters state."""
        self.x = random.randint(1, 10000)
        self.y = random.random()
        print("Quantum Interferences!!")

    def measure_position(self):
        self._apply_disturbance()
        return self.x

    def measure_momentum(self):
        self._apply_disturbance()
        return self.y

    def measure_spin(self):
        """
        Collapses the spin state. If entangled, the partner particle 
        instantly collapses to the opposite state.
        """
        self.p = random.choice([0.5, -0.5])
        
        if self.entangled_with:
            # Spooky Action at a Distance
            self.entangled_with.p = -self.p
            print("Spooky Action at a Distance !!")
            
        self._apply_disturbance()
        return self.p

    def entangle(self, other):
        """Links this particle to another QuantumParticle."""
        if not isinstance(other, QuantumParticle):
            raise TypeError("Entanglement only possible between QuantumParticle instances.")
        
        self.entangled_with = other
        other.entangled_with = self
        print(f"Status: Particle {id(self)} and {id(other)} are now entangled.")

    def __repr__(self):
        state = "Entangled" if self.entangled_with else "Isolated"
        return f"Particle(x={self.x}, y={self.y:.4f}, p={self.p}, state='{state}')"


# =================================================================
# MAIN EXECUTION BLOCK
# =================================================================

if __name__ == "__main__":
    # --- Test Temperature System ---
    print("--- Temperature System Test ---")
    boiling_water = Celsius(100)
    print(f"100C to Kelvin: {boiling_water.to_kelvin()}K")
    print(f"100C to Fahrenheit: {boiling_water.to_fahrenheit()}F\n")

    # --- Test Quantum System ---
    print("--- Quantum Realm Test ---")
    p1 = QuantumParticle(x=10, y=0.1)
    p2 = QuantumParticle(x=20, y=0.2)

    p1.entangle(p2)
    
    # Measuring spin on P1 affects P2
    print(f"Measuring P1 Spin...")
    p1.measure_spin()
    
    print(f"Resulting P1: {p1}")
    print(f"Resulting P2: {p2}")
