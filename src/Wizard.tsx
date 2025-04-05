import FormWizard from "react-form-wizard-component";
import "react-form-wizard-component/dist/style.css";
import {ChangeEvent, useState} from "react";

export default function FormWizardSample() {


    const [selecionada, setSelecionada] = useState<{id: string, color: string, is_lettered: boolean}>({});
    const [descricao, setDescricao] = useState<string>("");
    const [retornoBackend, setRetornoBackend] = useState({})
    const [sending, setSending] = useState<boolean>(true);

    const imagens = [
        { id: "estilo1", src: "/img/estilo1.png", color: "preto", is_lettered: false },
        { id: "estilo2", src: "/img/estilo2.png", color: "azul", is_lettered: true},
        { id: "estilo3", src: "/img/estilo3.png", color: "amarelo", is_lettered: true }
    ];

    const handleComplete = () => {
        console.log("Form completed! : ", selecionada, descricao);
        enviarParaBackend({
            briefing: descricao,
            is_lettered: selecionada.is_lettered,
            color: selecionada.color
        })
    };
    const enviarParaBackend = async (dados: any) => {
        setSending(true);
        try {
            const resposta = await fetch("http://localhost:8080/seu-endpoint", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(dados)
            });

            if (!resposta.ok) {
                throw new Error(`Erro na requisição: ${resposta.status}`);
            }

            const retorno = await resposta.json();

            console.log("Sucesso:", retorno);
        } catch (erro) {
            console.error("Erro ao enviar:", erro);
        }finally {
            setSending(false)
        }
    };

    const handleChangeTextArea = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setDescricao(e.target.value)
    };
    const customTitleTemplate = () => {
        return (
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "1rem",
                }}
            >
                <h2
                    style={{
                        color: "red",
                    }}
                >
                    MAGNA BRANDING
                </h2>
                <p
                    style={{
                        color: "purple",
                    }}
                >
                    Gere o seu branding personalizado com a gente
                </p>
            </div>
        );
    };

    return (
        <>
            <FormWizard
                onComplete={handleComplete}
                title={customTitleTemplate()}
                color="red"
                stepSize="lg"
            >
                <FormWizard.TabContent title="Descreva" icon="ti-user">
                    <h3>Descreva sua empresa</h3>
                    <p>De forma sucinta, objetiva e clara descreva a sua empresa para nós e como você a imagina.</p>
                    <textarea rows={5} className="w-full" placeholder="Conte com detalhes como é sua empresa e como você a imagina..."
                              onChange={(event) => handleChangeTextArea(event)}
                              value={descricao}
                    ></textarea>
                </FormWizard.TabContent>
                <FormWizard.TabContent title="Complemente" icon="ti-settings">
                    <h3>Complemente sua ideia</h3>
                    <p>Diga para nós quais dessas marcas aqui você acha que combina mais com sua ideia</p>
                    <div className="flex gap-4">
                        {imagens.map((img) => (
                            <label key={img.id} className="cursor-pointer">
                                <input
                                    type="radio"
                                    name="estilo"
                                    value={img.id}
                                    checked={selecionada?.id === img.id}
                                    onChange={() => setSelecionada({id: img.id, is_lettered: img.is_lettered, color: img.color})}
                                    className="sr-only"
                                />
                                <div
                                    className={`border-4 rounded-xl overflow-hidden transition w-[100px] h-[100px] ${
                                        selecionada === img.id ? "border-blue-600" : "border-transparent"
                                    }`}
                                >
                                    <img
                                        src={img.src}
                                        alt={img.id}
                                        className="w-[100px] h-[100px] object-cover"
                                        width="100"
                                    />
                                </div>
                            </label>
                        ))}
                    </div>
                </FormWizard.TabContent>
                <FormWizard.TabContent title="Finalize" icon="ti-check">
                    <h3>O que temos para você</h3>
                    <p>Input enviado:</p>
                    <p>Descrição: <b>{descricao}</b></p>
                    <p>Imagem selecionada: <b>{JSON.stringify(selecionada)}</b></p>

                    {sending && (
                        <div className="flex items-center space-x-2 text-blue-600">
                            <span>Enviando dados para o servidor...</span>
                        </div>
                    )}
                </FormWizard.TabContent>
            </FormWizard>
            {/* add style */}
            <style>{`
        @import url("https://cdn.jsdelivr.net/gh/lykmapipo/themify-icons@0.1.2/css/themify-icons.css");
      `}</style>
        </>
    );
}
