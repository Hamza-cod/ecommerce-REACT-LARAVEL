const globalState = {
   login : {
    user : {},
    accessToken : localStorage.getItem('access_token')  
   },
   products : [],
   categories : [],
}
export default globalState;