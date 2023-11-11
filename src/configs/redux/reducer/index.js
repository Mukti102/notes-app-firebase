const globalState = {
    userName : "Abdul",
    isLoading : false,
    user : {},
    Notes : [],
    bgColor : ""
  };
  
  const rootReducer = (state = globalState, action) => {
    switch(action.type){
        case "CHANGE_USERNAME":
          return {
            ...state,
            userName : action.value
          }
        case "CHANGE_ISLOADING":
          return {
            ...state,
            isLoading : action.value
          }
          case "CHANGE_USER" :
            return{
              ...state,
              user : action.value
            }
          case "GET_NOTES" :
            return{
              ...state,
              Notes : action.value
            }
            case "GET_COLOR":
              return {
                ...state,
                bgColor : action.value
              }
        default : 
        return state;
    }
  };

  export default rootReducer
