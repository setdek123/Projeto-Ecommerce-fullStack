import { useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../../../Backend/api";

const DashBoard = () => {
    const [apiRestResponse , setApiRestResponse] = useState([])
    const { id } = useParams();

    const SeachUsersDb = async () =>{
        
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3NmRlOWJiNDE0MWE2NjMwMDdhOWFjMyIsImlhdCI6MTczNTYwMjI2Nn0.jMl6KWa8XVhQQf3mikieNHqzNod1FM2ERO6PAT2QxBE'
        try{
          const resApi = await api.get(`/user/:${id}`, {
            Authorization: `${token}`
          });
          
          setApiRestResponse(resApi.data);
        }catch(error){

        }
    }

    SeachUsersDb();
    

    return (
        <div className="container mx-auto">
      <table className="min-w-full">
        <thead>
          <tr>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Nome</th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Email</th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Senha</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {apiRestResponse.map((item) => (
            <tr key={item.id}>
              <td className="px-6 py-4 whitespace-nowrap">{item.name}</td>
              <td className="px-6 py-4 whitespace-nowrap">{item.email}</td>
              <td className="px-6 py-4 whitespace-nowrap">{item.password}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    )
}

export default DashBoard;