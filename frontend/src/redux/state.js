const globalState = {
   login : {
    user : {},
    accessToken : localStorage.getItem('access_token')  
   },
   products : [],
   categories : [],
   orders : [],
}
export default globalState;