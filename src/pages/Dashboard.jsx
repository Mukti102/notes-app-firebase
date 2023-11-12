import React, { useEffect, useState } from "react";
import Button from "../components/atoms/Button";
import app from "../configs/firebase";
import { connect } from "react-redux";
import { addDataToApi } from "../configs/redux/action";
import { getDataFromApi } from "../configs/redux/action";
import { updateDataToApi } from "../configs/redux/action";
import {
  getDatabase,
  ref,
  set,
  get,
  update,
  push,
  child,
  remove,
} from "firebase/database";

function Dashboard({
  userData,
  updateData,
  saveNotes,
  isLoading,
  getData,
  NoteData,
  removeData,
}) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isUpdate, setIsUpdate] = useState(false);
  const [index, setIndex] = useState("");
  const [bgColor, setBgColor] = useState("");
  const [target, setTarget] = useState("s");

  const inputTitleChange = (e) => {
    setTitle(e.target.value);
  };
  const inputContentChange = (e) => {
    setContent(e.target.value);
  };
  const dataStorage = JSON.parse(localStorage.getItem("saveNotes"));
  useEffect(() => {
    const userId = JSON.parse(localStorage.getItem("userData"));
    getData(userId);
  }, [NoteData]);

  const idStorage = JSON.parse(localStorage.getItem("userData"));

  const handleSaveNotes = async (e) => {
    // e.preventDefault();
    const random = handleRandomBackground();
    setBgColor(random);
    const data = {
      title,
      content,
      date: new Date().getTime(),
      userId: idStorage,
      index,
      color: `${bgColor}`,
      isUpdate: isUpdate,
    };

    if (isUpdate) {
      const result = await updateData(data);
      if (result) {
        setIsUpdate(!isUpdate);
        setTarget(100);
      }
    } else {
      const res = await saveNotes(data);
      if (res) {
        setTitle("");
        setContent("");
      }
    }
    setTarget(100);
  };
  const addNotesCard = async (e) => {
    setIndex(e);
    const random = handleRandomBackground();
    setBgColor(random);
    const data = {
      title,
      content,
      date: new Date(),
      userId: idStorage,
      index,
      color: `${bgColor}`,
      isUpdate: isUpdate,
    };
    const res = await saveNotes(data);
    if (res) {
      setTitle("");
      setContent("");
    }
    setIsUpdate(true);
    setTarget(dataStorage[0].data.length);
    console.log(e);
  };

  const handleUpdate = (item, index) => {
    setTarget(index);
    setIsUpdate(!isUpdate);
    setTitle(item.title);
    setContent(item.content);
    setIndex(index);
    // if (isUpdate) {
    //   setTarget(index);
    // } else {
    //   setTarget("false");
    // }
  };

  const handleRemove = async (data, index) => {
    const targetRemove = {
      userId: idStorage,
      index,
    };
    const res = await removeData(targetRemove);
    res ? console.log("Succes") : console.log("Failed");
    console.log(targetRemove.index);
  };

  const handleRandomBackground = () => {
    const red = Math.floor(Math.random() * 256);
    const green = Math.floor(Math.random() * 256);
    const blue = Math.floor(Math.random() * 256);

    return `rgb(${red}, ${green}, ${blue})`;
  };

  return (
    <div className="sm:w-full sm:h-full h-screen sm:py-8 inline-block sm:gap-3 justify-center bg-slate-800 p-1">
      <h1
        className="text-white sm:text-4xl sm:ml-5 sm:mb-5 text-lg"
        style={{ fontFamily: "Quicksand" }}
      >
        Selamat Menulis😊
      </h1>
      <div className="w-full flex p-1 ">
        {dataStorage.length ? (
          <div className="w-full flex justify-center items-start flex-wrap sm:gap-y-10 sm:gap-x-5 gap-y-2 gap-x-2 sm:flex-wrap">
            {dataStorage[0].data.map((item, index) => {
              return (
                // card notes
                <div
                  key={index}
                  className={`group shadow-md sm:w-1/5 w-20  sm:h-max sm:px-2 relative sm:py-2  rounded-sm hover:bg-teal-300 transition-all delay-100 whitespace-normal h-max p-1 pt-0 py-1`}
                  style={{
                    backgroundColor: item.color || "teal",
                  }}
                >
                  {/* Remove Button */}
                  <button
                    className="absolute sm:-right-2 sm:-top-3 -right-[2px] -top-[2px] sm:w-5 sm:h-5 w-[5px] h-[5px] rounded-full sm:text-sm text-[4px] bg-white text-slate-500
                  "
                    onClick={() => handleRemove(item, index)}
                  >
                    X
                  </button>

                  {/* Title */}
                  <p className="sm:text-slate-50 sm:text-sm my-1 text-[5px]">
                    {showFormattedDate(item.date)}
                  </p>
                  <div className="sm:mb-3 mb-0 bg-slate-800 s:h-10  flex  bg-opacity-50 sm:p-2 sm:rounded-md h-max px-1 rounded-sm ">
                    {index == target ? (
                      <input
                        type="text"
                        value={title}
                        className=" bg-slate-900 bg-opacity-0 w-full sm:p-2 rounded-md ont-semibold sm:text-lg text-slate-50 capitalize  outline-none whitespace-normal h-max placeholder:text-slate-400 text-[5px]"
                        placeholder="Title..."
                        onChange={(e) => inputTitleChange(e)}
                      />
                    ) : (
                      <h1 className="sm:font-semibold sm:text-[16px]  text-slate-50 capitalize whitespace-normal overflow-hidden h-max p-0 text-[5.5px] px-[1px] font-medium">
                        {item.title}
                      </h1>
                    )}
                  </div>

                  {/* content */}
                  <div className="w-full sm:h-max sm:my-2 my-[3px] bg-slate-900 bg-opacity-50 sm:rounded-md sm:p-2 px-1 h-max">
                    {target == index ? (
                      <textarea
                        name=""
                        id=""
                        cols="33"
                        rows="7"
                        className="bg-transparent sm:p-1 outline-none text-white scrollbar-hide placeholder:text-slate-400 sm:text-sm text-[4px] p-[2px] w-full"
                        onChange={(e) => inputContentChange(e)}
                        value={content}
                        placeholder="Content..."
                      ></textarea>
                    ) : (
                      <p className="text-slate-50 w-full h-max overflow-hidden whitespace-normal sm:text-sm text-[4px] py-[1px]">
                        {item.content}
                      </p>
                    )}
                  </div>
                  <div className="flex gap-2 flex-row-reverse">
                    {/* Update Button */}
                    <button
                      className={
                        "sm:w-max w-max sm:text-sm sm:px-4 bg-yellow-600 sm:py-1 right-0 -bottom-5 rounded-sm shadow-md text-white hover:bg-yellow-700 text-[5px] px-1 h-max py-[2px]"
                      }
                      onClick={() => handleUpdate(item, index)}
                    >
                      {"Update"}
                    </button>
                    <button
                      className={
                        "sm:w-max w-max sm:text-sm sm:px-4 bg-green-600 sm:py-1 right-0 -bottom-5 rounded-sm shadow-md text-white hover:bg-green-700 text-[5px] px-1 h-max py-[2px]"
                      }
                      onClick={() => handleSaveNotes()}
                    >
                      Simpan
                    </button>
                  </div>
                </div>
              );
            })}
            <button
              className={`sm:text-3xl text-slate-800 bg-white sm:w-7 sm:h-8 sm:text-center rounded-sm ml-2 hover:bg-slate-200 text-[8px] w-2 h-2 p-0 flex items-center justify-center ${
                isUpdate ? " scale-0" : "scale-100"
              }`}
              onClick={() => addNotesCard(dataStorage[0].data.length)}
            >
              +
            </button>
          </div>
        ) : (
          <h1>No data</h1>
        )}
      </div>
    </div>
  );
}

const removeDataFromApi = (data) => (dispatch) => {
  const db = getDatabase();
  return new Promise((resolve, reject) => {
    const notesRef = ref(db, `/notes${data.userId}`);
    get(notesRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          const keyTarget = Object.keys(snapshot.val()).map((unix) => {
            return unix;
          })[data.index];
          remove(ref(db, `/notes${data.userId}/${keyTarget}`));
          resolve(true);
        } else {
          reject(false);
        }
      })
      .catch((e) => {
        console.log("Error", e);
      });
  });
};

const showFormattedDate = (date) => {
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return new Date(date).toLocaleDateString("id-ID", options);
};

const mapStateToProps = (state) => ({
  userData: state.user,
  isLoading: state.isLoading,
  NoteData: state.Notes,
});

const dispatchDataToApi = (dispatch) => ({
  saveNotes: (data) => dispatch(addDataToApi(data)),
  getData: (data) => dispatch(getDataFromApi(data)),
  updateData: (data) => dispatch(updateDataToApi(data)),
  removeData: (data) => dispatch(removeDataFromApi(data)),
});

export default connect(mapStateToProps, dispatchDataToApi)(Dashboard);
