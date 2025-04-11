"use client"

import { useEffect, useState } from "react";
import { getCampaign, donate } from "@/services/Web3Service";
import { useParams } from "next/navigation";
import Web3 from "web3";

export default function Donate() {

    const params = useParams();

    const [message, setMessage] = useState("");
    const [campaign, setCampaign] = useState({});
    const [donation, setDonation] = useState(0);

    useEffect(() => {
        setMessage("Buscando campanha...aguarde...");
        getCampaign(params.id)
            .then(result => {
                setMessage("");
                result.id = params.id;
                setCampaign(result);
            })
            .catch(err => {
                console.error(err);
                setMessage(err.message);
            })
    }, [])

    function onDonationChange(evt) {
        setDonation(evt.target.value);
    }

    function btnDonateClick() {
        setMessage("Fazendo sua doação...aguarde...");
        donate(campaign.id, donation)
            .then(tx => {
                setMessage("Doação realizada, obrigado. Em alguns minutos o saldo será atualizado.");
                setDonation(0);
            })
            .catch(err => {
                console.error(err);
                setMessage(err.message);
            })
    }

    return (
        <>
            <div className="container">
                <h1 className="display-5 fw-bold text-body-emphasis lh-1 mb-3 mt-5">Donate Crypto</h1>
                <p>Verifique se esta campanha é a correta antes de finalizar a sua doação.</p>
                <hr />
                <div className="row flex-lg-row-reverse align-items-center g-5">
                    <div className="col-7">
                        {
                            campaign.videoUrl
                                ? <iframe width="100%" height="480" src={`https://www.youtube.com/embed/${campaign.videoUrl}`}></iframe>
                                : <img src={campaign.imageUrl} className="d-block mx-lg-auto img-fluid" width="640" height="480" />
                        }
                    </div>
                    <div className="col-5 mb-5" style={{ height: 480, scrollbars: true }}>
                        <h2>{campaign.title}</h2>
                        <p><strong>Autor: </strong>{campaign.author}</p>
                        <p className="mb-3">{campaign.description}</p>
                        <p className="mb-3 fst-italic mt-5">
                            E aí, o que achou do projeto? Já foi arrecadado {Web3.utils.fromWei(campaign.balance || 0, "ether")} POL nesta campanha.
                            O quanto você quer doar (em POL)?
                        </p>
                        <div className="mb-3">
                            <div className="input-group">
                                <input type="number" id="donation" className="form-control p-3 w-50" value={donation} onChange={onDonationChange} />
                                <span className="input-group-text">POL</span>
                                <button type="button" className="btn btn-primary p-3 w-25" onClick={btnDonateClick}>Doar</button>
                            </div>
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
    )
}