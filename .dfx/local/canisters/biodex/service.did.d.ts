import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export interface _SERVICE {
  'createAnimal' : ActorMethod<
    [string, string, number, number, string, string],
    {
      'weight' : number,
      'height' : number,
      'diet' : string,
      'name' : string,
      'description' : string,
      'habitat' : string,
      'AnimalId' : Principal,
    }
  >,
  'createPlant' : ActorMethod<
    [string, string, string, string],
    {
      'name' : string,
      'size' : string,
      'PlantaId' : Principal,
      'distribution' : string,
      'family' : string,
    }
  >,
  'deleteAnimal' : ActorMethod<
    [Principal],
    {
        'Ok' : {
          'weight' : number,
          'height' : number,
          'diet' : string,
          'name' : string,
          'description' : string,
          'habitat' : string,
          'AnimalId' : Principal,
        }
      } |
      { 'Err' : { 'AnimalDoesNotExist' : Principal } }
  >,
  'deletePlant' : ActorMethod<
    [Principal],
    {
        'Ok' : {
          'name' : string,
          'size' : string,
          'PlantaId' : Principal,
          'distribution' : string,
          'family' : string,
        }
      } |
      { 'Err' : { 'PlantDoesNotExist' : Principal } }
  >,
  'getAnimal' : ActorMethod<
    [Principal],
    [] | [
      {
        'weight' : number,
        'height' : number,
        'diet' : string,
        'name' : string,
        'description' : string,
        'habitat' : string,
        'AnimalId' : Principal,
      }
    ]
  >,
  'getPlant' : ActorMethod<
    [Principal],
    [] | [
      {
        'name' : string,
        'size' : string,
        'PlantaId' : Principal,
        'distribution' : string,
        'family' : string,
      }
    ]
  >,
  'updateAnimal' : ActorMethod<
    [Principal, string, string, number, number, string, string],
    {
        'Ok' : {
          'weight' : number,
          'height' : number,
          'diet' : string,
          'name' : string,
          'description' : string,
          'habitat' : string,
          'AnimalId' : Principal,
        }
      } |
      { 'Err' : { 'AnimalDoesNotExist' : Principal } }
  >,
  'updatePlant' : ActorMethod<
    [Principal, string, string, string, string],
    {
        'Ok' : {
          'name' : string,
          'size' : string,
          'PlantaId' : Principal,
          'distribution' : string,
          'family' : string,
        }
      } |
      { 'Err' : { 'PlantDoesNotExist' : Principal } }
  >,
}
