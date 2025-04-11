"use client"

import { useRouter } from "next/navigation";
import { useState } from "react";
import { doLogin } from "@/services/Web3Service";

export default function Home() {

  const { push } = useRouter();

  const [message, setMessage] = useState("");

  function btnLoginClick() {
    setMessage("Conectando na carteira...aguarde...");
    doLogin()
      .then(account => push("/create"))
      .catch(err => {
        console.error(err);
        setMessage(err.message);
      })

  }

  return (
    <>
      <div className="container px-4 py-5">
        <div className="row flex-lg-row-reverse align-items-center g-5 py-5">
          <div className="col-6">
            <img src="https://images.unsplash.com/photo-1520694478166-daaaaec95b69?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2370&q=80" className="d-block mx-lg-auto img-fluid" width="700" height="500" />
          </div>
          <div className="col-6">
            <h1 className="display-5 fw-bold text-body-emphasis lh-1 mb-3">Donate Crypto</h1>
            <p className="lead">Sua plataforma descentralizada de doações.</p>
            <p className="lead">Autentique-se com sua carteira e crie sua campanha.</p>
            <p className="lead mb-3">Para doações, use o link da campanha já existente.</p>
            <div className="d-flex justify-content-start mt-5">
              <button type="button" className="btn btn-primary btn-lg px-4 me-2 col-12" onClick={btnLoginClick}>
                <img src="/metamask.svg" width="64" className="me-2" />
                Conectar com a MetaMask
              </button>
            </div>
            {
              message
                ? <div className="alert alert-success p-3 col-12 mt-3" role="alert">{message}</div>
                : <></>
            }
          </div>
        </div>
      </div>
    </>
  );
}
