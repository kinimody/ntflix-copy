import useCurrentUser from "@/hooks/useCurrentUser";
import { NextPageContext } from "next";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);
  console.log("this is session",session);

  if (!session) {
    return {
      redirect: {
        destination: "/auth",
        permanent: false,
      },
    };
  }

  return {
    
    props: {},
    
  };
}

const profiles = () => {
    const router = useRouter();
    const {data:user} = useCurrentUser();
    

  return (
    <div className="flex items-center h-full justify-center">
        <div className="flex flex-col justify-center items-center">
            <h1 className="text-3xl md:text-6xl text-white text-center"> Choose your profile</h1>
            <div className="flex items-center jusitfy-center gap-8 mt-10">
                <div onClick={() => router.push("/")}>
                    <div className="group flex-row w-44 mx-auto">
                        <div className="w-44 h-44 rounded-md border-2 border-transparent group-hover:cursor-pointer group-hover:border-white overflow-hidden flex  items-center justify-center">
                            <img src="/images/default-blue.png" alt="Profile " height={"48"} width={177.56}/>
                        </div>
                        <div className="mt-4 text-gray-400 text-2xl text-center group-hover:text-white">
                            {user?.name}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
};

export default profiles;
