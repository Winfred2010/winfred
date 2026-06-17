import random

class Gene:
    """A single genetic unit (0 or 1) capable of flipping its state."""
    def __init__(self):
        self.value = random.randint(0, 1)

    def mutate(self):
        # Flip bit: 0 becomes 1, 1 becomes 0
        self.value = 1 if self.value == 0 else 0

    def __repr__(self):
        return str(self.value)

class Chromosome:
    """A collection of 10 Genes."""
    def __init__(self):
        self.genes = [Gene() for _ in range(10)]

    def mutate(self):
        """Each gene in the chromosome has a 50% chance to flip."""
        for gene in self.genes:
            if random.random() < 0.5:
                gene.mutate()

    def is_all_ones(self):
        return all(gene.value == 1 for gene in self.genes)

    def __repr__(self):
        return "".join(map(str, self.genes))

class DNA:
    """A collection of 10 Chromosomes (100 genes total)."""
    def __init__(self):
        self.chromosomes = [Chromosome() for _ in range(10)]

    def mutate(self, probability):
        """Mutates chromosomes based on environmental probability."""
        for chromosome in self.chromosomes:
            if random.random() < probability:
                chromosome.mutate()

    def is_perfect(self):
        """Checks if the entire DNA sequence consists of 1s."""
        return all(chrom.is_all_ones() for chrom in self.chromosomes)

    def __repr__(self):
        return " | ".join(map(str, self.chromosomes))

class Organism:
    """An entity that evolves over generations based on environmental pressure."""
    def __init__(self, dna, environment_prob):
        self.dna = dna
        self.mutation_probability = environment_prob
        self.generations = 0

    def evolve(self):
        """Mutates the organism's DNA until it reaches the target state."""
        while not self.dna.is_perfect():
            self.dna.mutate(self.mutation_probability)
            self.generations += 1
        return self.generations

# ==========================================
# Biological Research Simulation
# ==========================================

if __name__ == "__main__":
    print("--- Biological Evolution Simulator Started ---")
    
    # Environmental mutation probability (e.g., 0.1 or 10%)
    ENVIRONMENT_PROB = 0.1 
    
    # Initialize DNA and Organism
    my_dna = DNA()
    subject = Organism(my_dna, ENVIRONMENT_PROB)
    
    print("Initial DNA Sequence:")
    print(subject.dna)
    print("\nEvolving... (this may take a while depending on randomness)")
    
    total_generations = subject.evolve()
    
    print("\n--- Target Reached! ---")
    print(f"Final DNA: {subject.dna}")
    print(f"Total Generations: {total_generations}")
