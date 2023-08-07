export function isAgeInvalid (age : any) {
    if(age <= 0 || !age || isNaN(age)){
      return true;
    } else {
      return false;
    }
}