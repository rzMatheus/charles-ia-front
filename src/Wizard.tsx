import FormWizard from "react-form-wizard-component";
import "react-form-wizard-component/dist/style.css";
import {useState} from "react";

export default function FormWizardSample() {

    const [selecionada, setSelecionada] = useState("");
    const imagens = [
        { id: "estilo1", src: "/img/estilo1.png" },
        { id: "estilo2", src: "/img/estilo2.png" },
        { id: "estilo3", src: "/img/estilo3.png" }
    ];

    const handleComplete = () => {
        console.log("Form completed!");
        // Handle form completion logic here
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
                                    checked={selecionada === img.id}
                                    onChange={() => setSelecionada(img.id)}
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
                    <p>Texto que a IA pensou para gerar sua logo</p>
                </FormWizard.TabContent>
            </FormWizard>
            {/* add style */}
            <style>{`
        @import url("https://cdn.jsdelivr.net/gh/lykmapipo/themify-icons@0.1.2/css/themify-icons.css");
      `}</style>
        </>
    );
}
