async function generateUserDni() {
    try{
      const response = await fetch('https://randomuser.me/api/?nat=au,br,ca,ch,de,dk,es,fi,fr,gb,ie,nl,nz,us');
      const data = await response.json();
      const user = data.results[0];
      const userData = {
        dni: '00956938456',
        lastName: user.name.last.toUpperCase(),
        firstName: user.name.first.toUpperCase(),
        gender: user.gender.charAt(0).toUpperCase(),
        idNumber: '42675456',
        category: 'B',
        birthDate: '29/02/1991',
        issueDate: '29/02/2010'
      };
      // console.log(userData);
      return userData;
    }
    catch(error){
      console.error(error);
      return error;
    }
  }

export default generateUserDni;