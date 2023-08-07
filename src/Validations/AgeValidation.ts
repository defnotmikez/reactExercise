export function ageValidation (age : any) {
    if(age <= 0 || !age || isNaN(age)){
      return true;
    } else {
      return false;
    }
}