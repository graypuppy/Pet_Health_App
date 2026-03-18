import React, { createContext, useContext, useState } from 'react';

export interface Pet {
  id: string;
  name: string;
  type: string;
  breed: string;
  age: string;
  avatar: string;
  weight: number;
  nextDeworming: string;
  nextVaccine: string;
}

interface PetContextType {
  pets: Pet[];
  currentPetId: string;
  setCurrentPetId: (id: string) => void;
  addPet: (pet: Omit<Pet, 'id'>) => void;
  currentPet: Pet | undefined;
}

const defaultPets: Pet[] = [
  {
    id: '1',
    name: 'Max',
    type: 'Dog',
    breed: '金毛寻回犬',
    age: '3岁2个月',
    avatar: 'https://picsum.photos/seed/goldenretriever/200/200',
    weight: 29.3,
    nextDeworming: '2026-04-15',
    nextVaccine: '2026-10-20',
  },
  {
    id: '2',
    name: 'Luna',
    type: 'Cat',
    breed: '布偶猫',
    age: '1岁5个月',
    avatar: 'https://picsum.photos/seed/ragdoll/200/200',
    weight: 4.5,
    nextDeworming: '2026-05-01',
    nextVaccine: '2027-01-10',
  }
];

const PetContext = createContext<PetContextType | undefined>(undefined);

export function PetProvider({ children }: { children: React.ReactNode }) {
  const [pets, setPets] = useState<Pet[]>(defaultPets);
  const [currentPetId, setCurrentPetId] = useState<string>(defaultPets[0].id);

  const addPet = (pet: Omit<Pet, 'id'>) => {
    const newPet = { ...pet, id: Date.now().toString() };
    setPets([...pets, newPet]);
    setCurrentPetId(newPet.id);
  };

  const currentPet = pets.find(p => p.id === currentPetId);

  return (
    <PetContext.Provider value={{ pets, currentPetId, setCurrentPetId, addPet, currentPet }}>
      {children}
    </PetContext.Provider>
  );
}

export function usePet() {
  const context = useContext(PetContext);
  if (context === undefined) {
    throw new Error('usePet must be used within a PetProvider');
  }
  return context;
}
