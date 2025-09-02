import{faker} from'@faker-js/faker';
export class RandomDataUtil{
     static getFirstName(){
        return faker.person.firstName();

     }
     static getLastName(){
        return faker.person.lastName();
     }
     static getEmail(){
        return faker.internet.email();
     }
     static getPhoneNumber(){
        return faker.phone.number();
    }
    static getPassword(){
       const password = faker.internet.password();
       return password;
    }
   //  static getConfirmPassword(password: string){
   //     return password;
   //  }
    static getwrongConfirmPassword(){
      return faker.internet.password()
   }
}