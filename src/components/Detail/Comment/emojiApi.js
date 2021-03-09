export const getPeople = async () => {
  const data = [];

  const smile = await fetch(
    `https://emoji-api.com/categories/smileys-emotion?access_key=df4a5a5f10a369ac9b30b42dfefc33826e32df52`,
  ).then((res) => res.json());
  const people = await fetch(
    `https://emoji-api.com/categories/people-body?access_key=df4a5a5f10a369ac9b30b42dfefc33826e32df52`,
  ).then((res) => res.json());
  const component = await fetch(
    `https://emoji-api.com/categories/component?access_key=df4a5a5f10a369ac9b30b42dfefc33826e32df52`,
  ).then((res) => res.json());

  data.push(smile);
  data.push(people);
  data.push(component);

  return data;
};

export const getActivity = async () => {
  const data = await fetch(
    `https://emoji-api.com/categories/activities?access_key=df4a5a5f10a369ac9b30b42dfefc33826e32df52`,
  ).then((res) => res.json());

  return data;
};

export const getAnimalAndNature = async () => {
  const data = await fetch(
    `https://emoji-api.com/categories/animals-nature?access_key=df4a5a5f10a369ac9b30b42dfefc33826e32df52`,
  ).then((res) => res.json());

  return data;
};

export const getFoodAndDrink = async () => {
  const data = await fetch(
    `https://emoji-api.com/categories/food-drink?access_key=df4a5a5f10a369ac9b30b42dfefc33826e32df52`,
  ).then((res) => res.json());

  return data;
};

export const getTravelAndPlaces = async () => {
  const data = await fetch(
    `https://emoji-api.com/categories/travel-places?access_key=df4a5a5f10a369ac9b30b42dfefc33826e32df52`,
  ).then((res) => res.json());

  return data;
};

export const getObjects = async () => {
  const data = await fetch(
    `https://emoji-api.com/categories/objects?access_key=df4a5a5f10a369ac9b30b42dfefc33826e32df52`,
  ).then((res) => res.json());

  return data;
};

export const getSymbols = async () => {
  const data = await fetch(
    `https://emoji-api.com/categories/symbols?access_key=df4a5a5f10a369ac9b30b42dfefc33826e32df52`,
  ).then((res) => res.json());

  return data;
};

export const getFlags = async () => {
  const data = await fetch(
    `https://emoji-api.com/categories/flags?access_key=df4a5a5f10a369ac9b30b42dfefc33826e32df52`,
  ).then((res) => res.json());

  return data;
};

export const getAllEmoji = async () => {
  const data = await fetch(
    `https://emoji-api.com/emojis?access_key=df4a5a5f10a369ac9b30b42dfefc33826e32df52`,
  ).then((res) => res.json());

  return data;
};
