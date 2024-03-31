import { useRef, useState } from "react";
import axiosClient from "../Axios/axios";
import { useNavigate } from "react-router-dom";
import { login, setUser } from "../redux/sclices/loginSlice";
import { useDispatch } from "react-redux";

export default function Login() {
  const [loading, setLoading] = useState(false);
  // console.log(context)

  const [err, setErr] = useState();
  const mailRel = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();
  const dispatche = useDispatch();

  const onSubmit = async (values) => {
    try {
      setLoading(true);
      await axiosClient.get("/sanctum/csrf-cookie");
      const response = await axiosClient
        .post("/login", values)
        .catch(({ response }) => {
          setErr(response.data.message);
        });
      console.log(response);

      if (response?.data.token) {
        localStorage.setItem("access_token", response.data.token);
        dispatche(login(response.data.token))
        dispatche(setUser(response.data.user))
        navigate("/");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };


  const handelSubmit = (e) => {
    e.preventDefault();
    const data = {
      email: mailRel.current.value,
      password: passwordRef.current.value,
    };
    onSubmit(data);
  };
  return (
    <>
      <div className=" bg-gradient-to-r h-screen from-gray-900   to-black flex justify-center items-center">
        <form
          action=""
          onSubmit={handelSubmit}
          className="flex flex-col gap-4 w-[60%] mx-auto my-9 p-6 bg-gray-400/60 shadow-xl rounded-md "
        >
          <div className="flex flex-col gap-4 w-[90%] mx-auto ">
            {err && <span className="text-red-600">{err}</span>}
            <label htmlFor="" className="text-md font-semibold ">
              email
            </label>
            <input
              type="email"
              className="px-6 py-2 rounded-md"
              ref={mailRel}
              defaultValue={"Hamza@gmail.com"}
            />

            <label htmlFor="" className="text-md font-semibold ">
              password
            </label>
            <input
              type="password"
              className="px-6 py-2 rounded-md"
              id=""
              ref={passwordRef}
              defaultValue={""}
            />
            <button
              type="submit"
              className={`p-3 rounded-md
         bg-blue-600 w-1/2 mx-auto text-white text-xl disabled:cursor-not-allowed disabled:bg-blue-400 hover:bg-blue-400 transition 
         duration-300`}
              disabled={loading ? true : false}
            >
              {loading ? "loading..." : "submit"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
