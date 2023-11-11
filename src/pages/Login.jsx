import { connect } from "react-redux";
import { loginUserApi } from "../configs/redux/action";
import { useState } from "react";
import Button from "../components/atoms/Button";
import { Link, useNavigate } from "react-router-dom";
import Learning from "../assets/Learning.png";
function Login({ isLoading, loginUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  function changeInputEmail(e) {
    setEmail(e.target.value);
  }
  function changeInputPassword(e) {
    setPassword(e.target.value);
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    const res = await loginUser(email, password).catch((err) => err);
    if (res) {
      // console.log("res => ", res);
      setEmail("");
      setPassword("");
      navigate("/Dashboard");
    }
  };

  return (
    <div className="sm:flex sm:w-full w-full sm:h-screen h-full items-center sm:bg-slate-200 bg-[#8E8FFA] sm:flex-row flex-col justify-center ">
      <div className="sm:w-1/2 flex justify-center order-2 items-center  h-full w-full sm:bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-8">
        <div className="sm:w-[100%] w-1/2 sm:scale-110 sm:translate-y-11 sm:-translate-x-8 -translate-x-6 translate-y-5 scale-125 ">
          <img src={Learning} alt="aaset" />
        </div>
      </div>
      <div className="sm:w-1/2 sm:h-full sm:flex items-center justify-center -translate-y-10 sm:translate-y-5">
        <form className="sm:flex sm:flex-col sm:w-[65%] sm:h-max pb-5 rounded-sm px-5 sm:gap-5 w-[70%] bg-slate-200 bg-opacity-20 backdrop-blur-sm mx-auto gap-0 shadow-lg sm:shadow-none">
          <h1 className="sm:text-3xl sm:text-start font-bold py-7 text-xl sm:text-slate-900 text-white">
            Welcome To Notes Web App
          </h1>
          <div className="flex-col flex gap-[2px] sm:gap-1 mb-5 sm:mb-0">
            <label
              htmlFor="Email"
              className="font-semibold sm:text-lg text-sm sm:text-slate-800 text-white"
            >
              Email
            </label>
            <input
              type="email"
              name="Email"
              placeholder="Email..."
              className="border-[1.5px] sm:border-slate-400 bg-transparent py-1 rounded-sm px-1 focus:outline-none placeholder:text-white placeholder:text-sm sm:text-slate-900 sm:placeholder:text-slate-900 sm:text-lg text-[13px] text-white"
              value={email}
              onChange={changeInputEmail}
            />
          </div>
          <div className="flex flex-col sm:gap-1 gap-[2px] sm:mb-0 mb-1">
            <label
              htmlFor="Password"
              className="font-semibold sm:text-lg text-sm sm:text-slate-800 text-white"
            >
              Password
            </label>
            <input
              type="password"
              name="Password"
              placeholder="Password..."
              className="border-[1.5px] sm:border-slate-400 bg-transparent py-1 rounded-sm px-1 focus:outline-none placeholder:text-white placeholder:text-sm sm:text-slate-900 sm:placeholder:text-slate-900 sm:text-lg text-[13px] text-white"
              value={password}
              onChange={changeInputPassword}
            />
          </div>
          <div className="w-full flex justify-between sm:m-0 mb-5">
            <div className="flex  gap-1">
              <input type="checkbox" />
              <p className="sm:text-[13px] text-[12px] sm:text-slate-800 text-white">
                Remember for 30 days
              </p>
            </div>
            <a
              href="#"
              className="sm:text-[13px] text-[12px] sm:text-blue-600 text-blue-800  hover:text-white"
            >
              Forgot Password
            </a>
          </div>
          <Button
            Title="Sing In"
            onClick={handleLogin}
            isLoading={isLoading}
            witdh="w-full"
            background="bg-[#7752FE]"
            textColor="text-white"
          />
          <div className="flex gap-1 items-center">
            <p className="sm:text-sm text-[12px] m-1 sm:text-slate-800 text-white">
              Already have an Account
            </p>
            <Link
              to="/"
              className="underline sm:text-blue-400 sm:text-sm text-[13px] text-blue-700"
            >
              Register
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    isLoading: state.isLoading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loginUser: (email, password) => dispatch(loginUserApi(email, password)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Login);
