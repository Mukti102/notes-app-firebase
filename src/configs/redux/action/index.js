import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import app from "../../firebase";
import { getDatabase, ref,set, push,get,child,onValue} from "firebase/database";

export const actionUserName = (dispatch) => {
    setTimeout(() => {
      return dispatch({ type: "CHANGE_USERNAME", value: "Mukti" });
    }, 2000);
  }

export const registerUserApi = (email, password) => (dispatch) => {
  return new Promise((resolve,reject) => {
    dispatch({type : "CHANGE_ISLOADING",value : true})
    const auth = getAuth(app);
    const userCredential = createUserWithEmailAndPassword(
      auth,
      email,
      password
    )
    .then((res) => {
      const user = res.user;
      console.log("User created:", user);
      dispatch({type : "CHANGE_ISLOADING",value : false})
      resolve(true)
    }).catch((error) => {
      if (error.code === "auth/email-already-in-use") {
        alert("Email sudak di gunakan. Gunakan email lain");
      }
      else if(error.code == "auth/weak-password"){
        alert("Password minimal 6 karakter")
      }
      else if(password == "" || email == "" ){
        alert("Harap tidak boleh ada yang kosong")
      }
      // console.error("Error creating user:", error);
      dispatch({type : "CHANGE_ISLOADING",value : false})
      reject(false)
    })
  })

  };



export const loginUserApi = (email, password) => (dispatch) => {
  return new Promise((resolve,reject) => {
    dispatch({type : "CHANGE_ISLOADING",value : true})
    const auth = getAuth(app);
    const userCredential = signInWithEmailAndPassword(
      auth,
      email,
      password
    ).
     then((res) => {
      const user = res.user;
      const userData = {
        email : user.email,
        emailVerified : user.emailVerified,
        refreshToke : user.refreshToken,
        uId : user.uid
      }
      dispatch({type : "CHANGE_ISLOADING",value : false})
      dispatch({type : "CHANGE_USER" , value : userData})
      localStorage.setItem("userData",JSON.stringify(userData.uId))
      // alert("Login Succes")
      resolve(userData)
    })
    .catch((error) => {
      if (error.code === "auth/invalid-login-credentials") {
        alert("Tidak bisa Login. Ada yang salah Silahkan Cobalagi");
      }
      else if(error.code == "auth/weak-password"){
        alert("Password minimal 6 karakter")
      }
      else if(password == "" || email == "" ){
        alert("Harap tidak boleh ada yang kosong")
      }
      console.error("Error creating user:", error);
      dispatch({type : "CHANGE_ISLOADING",value : false})
      reject(false)
    })
    
  })
};




 export const addDataToApi = (data) => (dispatch) => {
   dispatch({ type: "CHANGE_ISLOADING", value: true})
  return new Promise((resolve,reject) => {
  const db = getDatabase(app);
      try {
        push(ref(db,"/notes"+ data.userId), {
          title: data.title,
          content: data.content,
          date: data.date,
          bgColor : data.color,
          isUpdate : data.isUpdate
        });
        dispatch({ type: "CHANGE_ISLOADING", value: false });
        resolve(true)
      } catch (err) {
        console.log("ERROR", err);
        reject(err)
      }
  })
};



export const getDataFromApi = (data1) => (dispatch) => {
  const dbRef = ref(getDatabase());
  return new Promise((solve, reject) => {
    get(child(dbRef, `/notes${data1}`)).then((snapshot) => {
      const data = []
      if (snapshot.exists()) {
        data.push({
               id : data1,
                 data :Object.keys(snapshot.val()).map((keys) => {
                   return snapshot.val()[keys]
                 }),
               })
               dispatch({ type: "GET_NOTES", value: data });
                   localStorage.setItem("saveNotes",JSON.stringify(data))
      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    });
  })
}

export const updateDataToApi = (data) => (dispatch) => {
  dispatch({ type: "CHANGE_ISLOADING", value: true });
  const db = getDatabase(app);
  return new Promise((resolve, reject) => {
    try {
      get(ref(db, `/notes${data.userId}`))
        .then((snapshot) => {
          if (snapshot.exists()) {
            const key = Object.keys(snapshot.val())[data.index];
            set(ref(db, "/notes" + data.userId + "/" + key), data);
          } else {
            console.log("data tidak di temukan");
          }
        })
        .catch((err) => {
          console.log(err);
        });
      resolve(true);
      dispatch({ type: "CHANGE_ISLOADING", value: false });
    } catch (err) {
      console.log("Erro", err);
      reject(false);
      dispatch({ type: "CHANGE_ISLOADING", value: false });
    }
  });
};

