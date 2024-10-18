import React from 'react';
import { useQuery } from "@tanstack/react-query";
import { useSearchParams, Link } from "react-router-dom";
import { commitTransaction } from "./commitTransaction";

function PurchaseCompleted() {
   const [searchParams] = useSearchParams();
   const token_ws = searchParams.get('token_ws') || '';
   const request_id = localStorage.getItem('request_id') || '';  // Recuperar el request_id del localStorage
  
   const { data, isLoading } = useQuery({
      queryKey: ['completed-purchase'],
      queryFn: () => commitTransaction({ token: token_ws, request_id })  // Enviar ambos: token_ws y request_id
   });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-8 mt-20 flex flex-col gap-3 w-1/3 mx-auto rounded-xl shadow-[0_0px_8px_#b4b4b4]">
      <h1 className="text-center">Compra Completa</h1>
      <p>{data.message}</p>
      <Link to="/" className="bg-black text-white px-3 py-2 rounded text-center">
        Volver a inicio
      </Link>
    </div>
  );
}

export default PurchaseCompleted;

