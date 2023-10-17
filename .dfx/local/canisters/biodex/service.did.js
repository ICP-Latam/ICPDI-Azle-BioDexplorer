export const idlFactory = ({ IDL }) => {
  return IDL.Service({
    'createAnimal' : IDL.Func(
        [IDL.Text, IDL.Text, IDL.Int8, IDL.Int8, IDL.Text, IDL.Text],
        [
          IDL.Record({
            'weight' : IDL.Int8,
            'height' : IDL.Int8,
            'diet' : IDL.Text,
            'name' : IDL.Text,
            'description' : IDL.Text,
            'habitat' : IDL.Text,
            'AnimalId' : IDL.Principal,
          }),
        ],
        [],
      ),
    'createPlant' : IDL.Func(
        [IDL.Text, IDL.Text, IDL.Text, IDL.Text],
        [
          IDL.Record({
            'name' : IDL.Text,
            'size' : IDL.Text,
            'PlantaId' : IDL.Principal,
            'distribution' : IDL.Text,
            'family' : IDL.Text,
          }),
        ],
        [],
      ),
    'deleteAnimal' : IDL.Func(
        [IDL.Principal],
        [
          IDL.Variant({
            'Ok' : IDL.Record({
              'weight' : IDL.Int8,
              'height' : IDL.Int8,
              'diet' : IDL.Text,
              'name' : IDL.Text,
              'description' : IDL.Text,
              'habitat' : IDL.Text,
              'AnimalId' : IDL.Principal,
            }),
            'Err' : IDL.Variant({ 'AnimalDoesNotExist' : IDL.Principal }),
          }),
        ],
        [],
      ),
    'deletePlant' : IDL.Func(
        [IDL.Principal],
        [
          IDL.Variant({
            'Ok' : IDL.Record({
              'name' : IDL.Text,
              'size' : IDL.Text,
              'PlantaId' : IDL.Principal,
              'distribution' : IDL.Text,
              'family' : IDL.Text,
            }),
            'Err' : IDL.Variant({ 'PlantDoesNotExist' : IDL.Principal }),
          }),
        ],
        [],
      ),
    'getAnimal' : IDL.Func(
        [IDL.Principal],
        [
          IDL.Opt(
            IDL.Record({
              'weight' : IDL.Int8,
              'height' : IDL.Int8,
              'diet' : IDL.Text,
              'name' : IDL.Text,
              'description' : IDL.Text,
              'habitat' : IDL.Text,
              'AnimalId' : IDL.Principal,
            })
          ),
        ],
        ['query'],
      ),
    'getPlant' : IDL.Func(
        [IDL.Principal],
        [
          IDL.Opt(
            IDL.Record({
              'name' : IDL.Text,
              'size' : IDL.Text,
              'PlantaId' : IDL.Principal,
              'distribution' : IDL.Text,
              'family' : IDL.Text,
            })
          ),
        ],
        ['query'],
      ),
    'updateAnimal' : IDL.Func(
        [
          IDL.Principal,
          IDL.Text,
          IDL.Text,
          IDL.Int8,
          IDL.Int8,
          IDL.Text,
          IDL.Text,
        ],
        [
          IDL.Variant({
            'Ok' : IDL.Record({
              'weight' : IDL.Int8,
              'height' : IDL.Int8,
              'diet' : IDL.Text,
              'name' : IDL.Text,
              'description' : IDL.Text,
              'habitat' : IDL.Text,
              'AnimalId' : IDL.Principal,
            }),
            'Err' : IDL.Variant({ 'AnimalDoesNotExist' : IDL.Principal }),
          }),
        ],
        [],
      ),
    'updatePlant' : IDL.Func(
        [IDL.Principal, IDL.Text, IDL.Text, IDL.Text, IDL.Text],
        [
          IDL.Variant({
            'Ok' : IDL.Record({
              'name' : IDL.Text,
              'size' : IDL.Text,
              'PlantaId' : IDL.Principal,
              'distribution' : IDL.Text,
              'family' : IDL.Text,
            }),
            'Err' : IDL.Variant({ 'PlantDoesNotExist' : IDL.Principal }),
          }),
        ],
        [],
      ),
  });
};
export const init = ({ IDL }) => { return []; };
