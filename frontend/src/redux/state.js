const globalState = {
   login : {
    user : {},
    accessToken : localStorage.getItem('access_token')  
   },
   products : [],
   categories : [],
   orders : [],
   dashboard :{}
}
export default globalState;