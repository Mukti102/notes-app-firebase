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
    const res = await saveNotes(data);
    if (res) {
      setTitle("");
      setContent("");
    }
    setIsUpdate(true);
    setTarget(dataStorage[0].data.length);
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
    <div className="w-full h-full py-8 gap-3 flex flex-col justify-center items-center bg-slate-700">
      {/* <div className="w-[30%] flex flex-col gap-3 overflow-hidden ">
        <input
          type="text"
          placeholder="Title"
          className="border-[1.5px] border-teal-400 rounded-sm w-full py-1 px-2 focus:outline-none"
          onChange={(e) => inputTitleChange(e)}
          value={title}
        />
        <textarea
          name=""
          id=""
          cols="30"
          rows="10"
          className="border-[1.5px] px-2 py-1 rounded-sm border-cyan-500 w-full focus:outline-none"
          placeholder="Write here..."
          value={content}
          onChange={(e) => inputContentChange(e)}
        ></textarea>
        <Button
          Title={isUpdate ? "Update" : "Simpan"}
          onClick={handleSaveNotes}
          isLoading={isLoading}
          // background="bg-red-500"
        />
      </div> */}
      <div className="w-full flex p-1">
        {dataStorage.length ? (
          <div className="w-full flex justify-center flex-wrap gap-y-10 gap-x-5">
            {dataStorage[0].data.map((item, index) => {
              return (
                <div
                  key={index}
                  className={`group shadow-md w-1/4 h-max px-2 relative py-2 rounded-sm hover:bg-teal-300 transition-all delay-100 whitespace-normal`}
                  style={{
                    backgroundColor: item.bgColor || handleRandomBackground,
                  }}
                >
                  {/* Remove Button */}
                  <button
                    className="absolute -right-2 -top-2 w-5 h-5 rounded-full text-sm bg-white text-slate-500
                  "
                    onClick={() => handleRemove(item, index)}
                  >
                    X
                  </button>

                  {/* Title */}
                  <div className="mb-3 bg-slate-900 h-10 flex items-center bg-opacity-60 p-2 rounded-md">
                    {index == target ? (
                      <input
                        type="text"
                        value={title}
                        className=" bg-slate-900 bg-opacity-0 w-full p-2 rounded-md ont-semibold text-xl text-slate-50 capitalize  outline-none whitespace-normal h-max "
                        onChange={(e) => inputTitleChange(e)}
                      />
                    ) : (
                      <h1 className="font-semibold text-xl text-slate-50 capitalize whitespace-normal overflow-hidden h-max">
                        {item.title}
                      </h1>
                    )}
                  </div>
                  {/* <p className="text-slate-100 text-sm">{item.date}</p> */}

                  {/* content */}
                  <div className="w-full h-max my-3 bg-slate-900 bg-opacity-50 rounded-md p-2">
                    {target == index ? (
                      <textarea
                        name=""
                        id=""
                        cols="33"
                        rows="7"
                        className="bg-transparent p-1 outline-none text-white scrollbar-hide"
                        onChange={(e) => inputContentChange(e)}
                        value={content}
                      ></textarea>
                    ) : (
                      <p className="text-slate-50 w-full h-max  overflow-hidden whitespace-normal">
                        {item.content}
                      </p>
                    )}
                  </div>

                  {/* Update Button */}
                  <button
                    className={
                      "w-max text-sm px-4 bg-[#8E8FFA] py-1 absolute right-0 -bottom-5 rounded-md shadow-md hover:bg-slate-50"
                    }
                    onClick={() => handleUpdate(item, index)}
                  >
                    {"Update"}
                  </button>
                  <button
                    className={
                      "w-max text-sm px-4 bg-[#8E8FFA] py-1 absolute right-24 -bottom-5 rounded-md shadow-md hover:bg-slate-50"
                    }
                    onClick={() => handleSaveNotes()}
                  >
                    Simpan
                  </button>
                </div>
              );
            })}
            <button
              className="text-3xl text-slate-800 bg-white w-8 h-9 text-center rounded-sm"
              onClick={addNotesCard}
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
