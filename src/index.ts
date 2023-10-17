// Import necessary modules from the 'azle' library
import {
    Canister,
    Principal,
    query,
    Record,
    StableBTreeMap,
    text,
    update,
    ic,
    Vec,
    Opt,
    Variant,
    Result,
    Err,
    Ok,
    int8,
} from 'azle';

// Import the 'id' function from 'azle/src/lib/ic/id'
import { id } from 'azle/src/lib/ic/id';

// Define a Record type for representing plant entities
const Plant = Record({
    PlantaId: Principal,
    name: text,
    family: text,
    size: text,
    distribution: text,
});

// Define a Record type for representing animal entities
const Animal = Record({
    AnimalId: Principal,
    name: text,
    habitat: text,
    weight: int8,
    height: int8,
    diet: text,
    description: text,
});

// Define a Variant type for handling errors related to plant operations
const PlantError = Variant({
    PlantDoesNotExist: Principal,
});

// Define a Variant type for handling errors related to animal operations
const AnimalError = Variant({
    AnimalDoesNotExist: Principal,
});

// Create a stable B-tree map specifically for storing plant entities
let plants = StableBTreeMap(Principal, Plant, 0);

// Create a stable B-tree map specifically for storing animal entities
let animals = StableBTreeMap(Principal, Animal, 0);

// Export a Canister object with various functions for managing plants and animals
export default Canister({

    // Function to create a new plant entity
    createPlant: update([text, text, text, text], Plant, (name, family, size, distribution) => {
        const id = generateId();
        const plant: typeof Plant = {
            PlantaId: ic.caller(),
            name,
            family,
            size,
            distribution,
        };
        plants.insert(id, plant);
        console.log('New plant added successfully ID: ', id.toText());
        return plant;
    }),

    // Function to create a new animal entity
    createAnimal: update([text, text, int8, int8, text, text], Animal, (name, habitat, weight, height, diet, description) => {
        const id = generateId();
        const animal: typeof Animal = {
            AnimalId: ic.caller(),
            name,
            habitat,
            weight,
            height,
            diet,
            description,
        };
        animals.insert(id, animal);
        console.log('New animal added successfully ID: ', id.toText());
        return animal;
    }),

    // // Function to retrieve all plant entities
    // getPlants: query([], Vec(Plant), () => {
    //     return plants.values();
    // }),

    // // Function to retrieve all animal entities
    // getAnimals: query([], Vec(Animal), () => {
    //     return animals.values();
    // }),

    // Function to retrieve a specific plant entity by ID
    getPlant: query([Principal], Opt(Plant), (id) => {
        return plants.get(id);
    }),

    // Function to retrieve a specific animal entity by ID
    getAnimal: query([Principal], Opt(Animal), (id) => {
        return animals.get(id);
    }),

    // Function to update the details of a specific plant entity
    updatePlant: update([Principal, text, text, text, text], Result(Plant, PlantError), (id, name, family, size, distribution) => {
        const plantOpt = plants.get(id);
        if ('None' in plantOpt) {
            return Err({
                PlantDoesNotExist: id,
            })
        }
        const plant = plantOpt.Some;
        const updatePlant: typeof Plant = {
            ...plant,
            name,
            family,
            size,
            distribution,
        };
        plants.insert(id, updatePlant);
        return Ok(plant);
    }),

    // Function to update the details of a specific animal entity
    updateAnimal: update([Principal, text, text, int8, int8, text, text], Result(Animal, AnimalError), (id, name, habitat, weight, height, diet, description) => {
        const animalOpt = animals.get(id);
        if ('None' in animalOpt) {
            return Err({
                AnimalDoesNotExist: id,
            });
        }
        const animal = animalOpt.Some;
        const updatedAnimal: typeof Animal = {
            ...animal,
            name,
            habitat,
            weight,
            height,
            diet,
            description,
        };
        animals.insert(id, updatedAnimal);
        return Ok(animal);
    }),

    // Function to delete a specific plant entity by ID
    deletePlant: update([Principal], Result(Plant, PlantError), (id) => {
        const plantOpt = plants.get(id);
        if ('None' in plantOpt) {
            return Err({
                PlantDoesNotExist: id,
            });
        }
        const plant = plantOpt.Some;
        plants.remove(id);
        return Ok(plant);
    }),

    // Function to delete a specific animal entity by ID
    deleteAnimal: update([Principal], Result(Animal, AnimalError), (id) => {
        const animalOpt = animals.get(id);
        if ('None' in animalOpt) {
            return Err({
                AnimalDoesNotExist: id,
            });
        }
        const animal = animalOpt.Some;
        animals.remove(id);
        return Ok(animal);
    }),
});

// Function to generate a random Principal ID for entities
function generateId(): Principal {
    const randomBytes = new Array(29)
        .fill(0)
        .map((_) => Math.floor(Math.random() * 256));
    return Principal.fromUint8Array(Uint8Array.from(randomBytes));
}
