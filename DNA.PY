import random

class Gene:
    """A single genetic unit (0 or 1) that can flip its state."""
    def __init__(self):
        self.value = random.randint(0, 1)

    def mutate(self):
        # Flip bit: 0 becomes 1, 1 becomes 0
        self.value = 1 if self.value == 0 else 0

    def __repr__(self):
        return str(self.value)

class Chromosome:
    """A series of 10 Genes."""
    def __init__(self):
        self.genes = [Gene() for _ in range(10)]

    def mutate(self):
        """Randomly flips genes with a 1/2 probability."""
        for gene in self.genes:
            if random.random() < 0.5:
                gene.mutate()

    def is_all_ones(self):
        return all(gene.value == 1 for gene in self.genes)

    def __repr__(self):
        return "".join(map(str, self.genes))

class DNA:
    """A series of 10 Chromosomes."""
    def __init__(self):
        self.chromosomes = [Chromosome() for _ in range(10)]

    def mutate(self, probability):
        """Mutates chromosomes based on environmental probability."""
        for chromosome in self.chromosomes:
            if random.random() < probability:
                chromosome.mutate()

    def is_target_reached(self):
        """Checks if the entire DNA sequence consists of 1s."""
        return all(chrom.is_all_ones() for chrom in self.chromosomes)

    def __repr__(self):
        return " | ".join(map(str, self.chromosomes))

class Organism:
    """An entity with DNA that reacts to its environment."""
    def __init__(self, dna, environment_prob):
        self.dna = dna
        self.mutation_rate = environment_prob
        self.generations = 0

    def evolve(self):
        """Mutates DNA until the 'Perfect' state (all 1s) is reached."""
        while not self.dna.is_target_reached():
            self.dna.mutate(self.mutation_rate)
            self.generations += 1
            
            # Optional: Print progress every 1000 generations to see it working
            if self.generations % 1000 == 0:
                print(f"Gen {self.generations}: Evolution in progress...", end="\r")
        
        return self.generations

# --- Simulation ---
if __name__ == "__main__":
    print("--- Starting Biological Research Simulation ---")
    
    # Environment probability (e.g., 0.2 chance for a chromosome to trigger mutation)
    env_hazard = 0.2 
    
    my_dna = DNA()
    subject_zero = Organism(my_dna, env_hazard)
    
    total_gens = subject_zero.evolve()
    
    print(f"\nTarget DNA Reached: {subject_zero.dna}")
    print(f"Total Generations to achieve 'Perfect DNA': {total_gens}")
