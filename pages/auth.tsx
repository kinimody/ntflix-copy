import Input from "@/components/Input";
import { useCallback, useState } from "react";
import axios from "axios";
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import Image from "next/image";

const Auth = () => {

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [variant, setVariant] = useState("login");
  
  
  const toggleVariant = useCallback(() => {
    setVariant((currentVariant) =>
      currentVariant === "login" ? "register" : "login"
    );
  }, []);



  const login = useCallback(async () => {
    try {
      await signIn("credentials", {
        email,
        password,
        callbackUrl: "/profiles",
      });
    } catch (error) {
      console.log(error);
    }
  }, [email, password]);

  const register = useCallback(async () => {
    try {
      await axios.post("/api/register", {
        email,
        name,
        password,
        
      });
      login();
    } catch (error) {
      console.log(error);
    }
  }, [email, name, password, login]);




  return (
    <div className="relative h-full bg-[url('/images/hero.jpg')] bg-no-repeat bg-center bg-cover">
      <div className="bg-black w-full h-full lg:bg-opacity-50">
        <nav className="px-12 py-5">
          <Image src="/images/logo.png" alt="logo" height={"48"} width={177.56}/>
          <div className="flex justify-center ">
            <div className="bg-black bg-opacity-70 px-16 py-16 self-center mt-2 lg:w-3/5 lg:max-w-md rounded-md w-full md:flex md:flex-col md:items-center">
              <h2 className="text-white text-4xl mb-8 font-semibold">
                {variant === "login" ? "Sign in" : "Register"}
              </h2>
              <div className="flex flex-col gap-4 md:w-3/5 lg:w-full">
                {variant === "register" && (
                  <Input
                    label="Username"
                    onChange={(ev: any) => setName(ev.target.value)}
                    id="name"
                    value={name}
                  />
                )}
                <Input
                  label="Email"
                  onChange={(ev: any) => setEmail(ev.target.value)}
                  id="email"
                  type="email"
                  value={email}
                />
                <Input
                  label="Password"
                  onChange={(ev: any) => setPassword(ev.target.value)}
                  id="password"
                  type="password"
                  value={password}
                />
              </div>
              <button
                onClick={variant === "login" ? login : register}
                className="bg-red-600 py-3 text-white rounded-md w-full mt-10 hover:bg-red-700 transition md:w-3/5 lg:w-full"
              >
                {variant === "login" ? "Login" : "Sign up"}
              </button>
              <div className="lg:w-full md:w-3/5 flex flex-row items-center gap-4 mt-8 justify-center">
                <div onClick={()=> signIn("google",{callbackUrl:"/profiles"})} className="w-8 h-8 bg-white rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition">
                  <FcGoogle size={30} />
                </div>
                <div onClick={()=> signIn("github",{callbackUrl:"/profiles"})} className="w-8 h-8 bg-white rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition">
                  <FaGithub size={30} />
                </div>
              </div>
              <p className="text-neutral-500 mt-12">
                {variant === "login"
                  ? "First time using Netflix ?"
                  : "Alredy have an account?"}
                <span
                  onClick={toggleVariant}
                  className="text-white text-sm ml-1 hover:underline cursor-pointer"
                >
                  {variant === "login" ? "Register" : "Login"}
                </span>
              </p>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
}

export default Auth;
