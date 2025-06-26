export const userStore = $state({
  country: "Germany",
  gender: "female",
  age: 35,
  lifeExpectancy: 0,
  yearsRemaining: 0,
  secondsRemaining: 0,
  calculate: () => {
    userStore.yearsRemaining = userStore.lifeExpectancy - userStore.age;
    userStore.secondsRemaining = userStore.yearsRemaining * 365.25 * 24 * 60 * 60;
  },
  setAge: (age: number) => {
    userStore.age = age;
    userStore.calculate();
  },
  setLifeExpectancy: (lifeExpectancy: number) => {
    userStore.lifeExpectancy = lifeExpectancy;
    userStore.calculate();
  },
  setCountry: (country: string) => {
    userStore.country = country;
  },
  setGender: (gender: string) => {
    userStore.gender = gender;
  },
  setSecondsRemaining: (secondsRemaining: number) => {
    userStore.secondsRemaining = secondsRemaining;
  }
});