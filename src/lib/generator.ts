import { faker } from "@faker-js/faker";

export function createRandomUser() {
  const sex = faker.person.sexType();
  const firstName = faker.person.firstName(sex);
  const lastName = faker.person.lastName();
  const email = faker.internet.email({
    firstName: firstName.toLowerCase(),
    lastName: lastName.toLowerCase(),
  });

  return {
    id: faker.string.uuid(),
    index: 0,
    avatar: faker.image.avatar(),
    birthday: faker.date.birthdate(),
    email,
    firstName,
    lastName,
    sex,
    subscriptionTier: faker.helpers.arrayElement(["free", "basic", "business"]),
  };
}
