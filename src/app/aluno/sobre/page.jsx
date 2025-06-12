//pagina sobre e contato

'use client';

import { useState } from 'react';


const IconPhone = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 mx-auto text-[#556b2f]"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-1.49 1.49c-1.824-1.027-3.289-2.492-4.316-4.316l1.49-1.49c.362-.362.527-.833.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" /></svg>
);
const IconEmail = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 mx-auto text-[#556b2f]"><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" /></svg>
);
const IconLocation = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 mx-auto text-[#556b2f]"><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" /></svg>
);


export default function SobreContatoPage() {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [telefone, setTelefone] = useState('');
    const [relacao, setRelacao] = useState('');
    const [conteudo, setConteudo] = useState('');
    
    const handleEnviarComentario = (e) => {
        e.preventDefault(); 
       
        if (!nome || !email || !telefone || !relacao || !conteudo) {
           alert("Por favor, preencha todos os campos antes de enviar.");
           return; 
        }
        alert(`Obrigado, ${nome}! Sua mensagem foi enviada e logo será respondida.`);
       
        setNome('');
        setEmail('');
        setTelefone('');
        setRelacao('');
        setConteudo('');
    };


  return (
    <main className="min-h-screen bg-[#e9dcc3] font-serif text-[#556b2f]">
        
       <div className="p-4 sm:p-6 lg:p-8 space-y-16 sm:space-y-20">
           
             <header 
                className="relative bg-cover bg-center text-center py-20 rounded-2xl overflow-hidden flex items-center justify-center animate-fade-in-up" 
                style={{ backgroundImage: `url('https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2070&auto=format&fit=crop')` }}
            >
                <div className="absolute inset-0 bg-[#556b2f] opacity-60"></div>
                <div className="relative z-10 max-w-3xl mx-auto px-4">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white">
                        Conheça a nossa Escola
                    </h1>
                    <p className="mt-4 text-xl text-[#e9dcc3]">
                        Uma jornada dedicada à excelência e ao desenvolvimento de futuros líderes.
                    </p>
                </div>
            </header>

             <section className="max-w-6xl mx-auto animate-fade-in-up" style={{ animationDelay: '150ms' }}>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div className="space-y-4">
                        <h2 className="text-3xl md:text-4xl font-bold">
                            Nosso Compromisso com a Excelência
                        </h2>
                        <p className="text-lg text-[#556b2f]/90 text-justify">
                            Fundada em 1998, nossa escola nasceu do sonho de criar um ambiente de aprendizado que fosse ao mesmo tempo desafiador e acolhedor. Acreditamos que cada aluno possui um potencial único, e nossa missão é fornecer as ferramentas, o suporte e a inspiração para que eles o descubram e o desenvolvam plenamente.
                        </p>
                        <p className="text-lg text-[#556b2f]/90 text-justify">
                            Ao longo dos anos, evoluímos e nos adaptamos, mas nosso núcleo permaneceu o mesmo: um profundo respeito pelo conhecimento e um compromisso inabalável com o sucesso de cada estudante que passa por nossas portas.
                        </p>
                    </div>
                    <div>
                        <img 
                            src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=1770&auto=format&fit=crop" 
                            alt="Biblioteca da escola"
       
                            className="rounded-2xl w-full h-auto object-cover shadow-[24px_16px_0px_4px_rgba(85,107,47,1)]"
                        />
                    </div>
                </div>
            </section>

             <section className="max-w-6xl mx-auto animate-fade-in-up" style={{ animationDelay: '300ms' }}>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                 
                     <div className="order-last lg:order-first">
                        <img 
                            src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=2070&auto=format&fit=crop" 
                            alt="Alunos em sala de aula interativa"
                            className="rounded-2xl w-full h-auto object-cover  shadow-[-21px_20px_0px_4px_rgba(85,107,47,1)]"
                        />
                    </div>
        
                    <div className="space-y-4 order-first lg:order-last">
                        <h2 className="text-3xl md:text-4xl font-bold">
                           Nossa Metodologia Inovadora
                        </h2>
                        <p className="text-lg text-[#556b2f]/90 text-justify">
                            Combinamos métodos de ensino tradicionais com abordagens inovadoras, utilizando a tecnologia como aliada para personalizar a jornada de aprendizado. Nossos projetos interdisciplinares incentivam a colaboração, o pensamento crítico e a resolução de problemas do mundo real.
                        </p>
                         <p className="text-lg text-[#556b2f]/90 text-justify">
                            Preparamos os alunos não apenas para os exames, mas para os desafios da vida, fomentando a curiosidade, a resiliência e a paixão por aprender que os acompanharão para sempre.
                        </p>
                    </div>
                </div>
            </section>

             <section className="text-center">
                <h2 className="text-3xl md:text-4xl font-bold animate-fade-in-up" style={{ animationDelay: '450ms' }}>Entre em Contato</h2>
                <p className="text-[#556b2f] mt-2 text-lg animate-fade-in-up" style={{ animationDelay: '550ms' }}>Estamos aqui para ajudar. Escolha a melhor forma de falar conosco.</p>
              
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto mt-12">
               
            
                    <div className="bg-white/50 p-8 rounded-2xl text-center shadow-[0_7px_0px_1.1px] shadow-[#556b2f] border border-[#556b2f]/20 hover:-translate-y-2 transition-all duration-300 animate-fade-in-up" style={{ animationDelay: '650ms' }}>
                        <IconPhone />
                        <h3 className="mt-4 text-2xl font-bold">Ligue para nós</h3>
                        <p className="mt-2 text-[#c28762] text-lg">Para matrículas e informações gerais.</p>
                        <a href="tel:+5511999998888" className="mt-4 inline-block text-[#556b2f] font-bold text-xl hover:underline">
                            (11) 99999-8888
                        </a>
                    </div>
      
                    <div className="bg-white/50 p-8 rounded-2xl text-center shadow-[0_7px_0px_1.1px] shadow-[#556b2f] border border-[#556b2f]/20 hover:-translate-y-2 transition-all duration-300 animate-fade-in-up" style={{ animationDelay: '750ms' }}>
                        <IconEmail />
                        <h3 className="mt-4 text-2xl font-bold">Envie um Email</h3>
                        <p className="mt-2 text-[#c28762] text-lg">Nossa equipe responderá o mais breve possível.</p>
                        <a href="mailto:contato@suaescola.com" className="mt-4 inline-block text-[#556b2f] font-bold text-xl hover:underline break-all">
                            contato@suaescola.com
                        </a>
                    </div>

                    <div className="bg-white/50 p-8 rounded-2xl text-center shadow-[0_7px_0px_1.1px] shadow-[#556b2f] border border-[#556b2f]/20 hover:-translate-y-2 transition-all duration-300 animate-fade-in-up" style={{ animationDelay: '850ms' }}>
                        <IconLocation />
                        <h3 className="mt-4 text-2xl font-bold">Visite-nos</h3>
                        <p className="mt-2 text-[#c28762] text-lg">
                            Av. da Educação, 123 <br/>
                            Bairro do Saber, São Paulo - SP
                        </p>
                       <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer" className="mt-4 inline-block text-[#556b2f] font-bold text-xl hover:underline break-all">
                            Agende sua Visita
                        </a>
                    </div>
                </div>
            </section>

             <section className="animate-fade-in-up" style={{ animationDelay: '950ms' }}>
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">Nossa Localização</h2>
            
                 <div className="bg-white/50 p-4 sm:p-6 rounded-2xl shadow-[0_7px_0px_1.1px] shadow-[#556b2f] border border-[#556b2f]/20 max-w-6xl mx-auto">
                     <div className="rounded-xl overflow-hidden h-[450px]">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3657.197576527582!2d-46.65878198554238!3d-23.5613322674916!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce59c8da0aa315%3A0x5de5da9531ad7869!2sMuseu%20de%20Arte%20de%20S%C3%A3o%20Paulo%20Assis%20Chateaubriand%20(MASP)!5e0!3m2!1spt-BR!2sbr!4v1678811802958!5m2!1spt-BR!2sbr"
                            width="100%"
                            height="100%" 
                            style={{ border: 0 }}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            className="filter grayscale(50%) contrast(1.1) opacity-90" 
                        ></iframe>
                    </div>
                </div>
            </section>
            
         
            <section className="max-w-6xl mx-auto animate-fade-in-up" style={{ animationDelay: '1050ms' }}>
               
                <div className="bg-white/50 p-6 sm:p-8 md:p-10 rounded-2xl shadow-[0_7px_0px_1.1px] shadow-[#556b2f] border border-[#556b2f]/20">
                    <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">Deixe seu Comentário</h2>
                    <form onSubmit={handleEnviarComentario} className="space-y-6">
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="nome" className="block text-lg font-semibold mb-2">Nome</label>
                                <input 
                                    type="text" 
                                    id="nome" 
                                    value={nome}
                                    onChange={(e) => setNome(e.target.value)}
                               
                                    className="w-full p-3 rounded-lg bg-[#e9dcc3]/60 border border-[#556b2f]/40 focus:ring-2 focus:ring-[#556b2f] focus:border-[#556b2f] outline-none transition" 
                                    placeholder="Seu nome completo" 
                                    required 
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-lg font-semibold mb-2">Email</label>
                                <input 
                                    type="email" 
                                    id="email" 
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full p-3 rounded-lg bg-[#e9dcc3]/60 border border-[#556b2f]/40 focus:ring-2 focus:ring-[#556b2f] focus:border-[#556b2f] outline-none transition" 
                                    placeholder="seu.email@exemplo.com" 
                                    required 
                                />
                            </div>
                            <div>
                                <label htmlFor="telefone" className="block text-lg font-semibold mb-2">Telefone</label>
                                <input 
                                    type="tel" 
                                    id="telefone" 
                                    value={telefone}
                         
                                    pattern="\([0-9]{2}\) ?[0-9]{4,5}-?[0-9]{4}" 
                                    title="Formato (XX) XXXXX-XXXX"
                                    onChange={(e) => setTelefone(e.target.value)}
                                    className="w-full p-3 rounded-lg bg-[#e9dcc3]/60 border border-[#556b2f]/40 focus:ring-2 focus:ring-[#556b2f] focus:border-[#556b2f] outline-none transition" 
                                    placeholder="(XX) XXXXX-XXXX" 
                                    required 
                                />
                            </div>
                            <div>
                                <label htmlFor="relacao" className="block text-lg font-semibold mb-2">Relação com a Escola</label>
                                <select 
                                    id="relacao"
                                    value={relacao}
                                    onChange={(e) => setRelacao(e.target.value)}
                                    className="w-full p-3 rounded-lg bg-[#e9dcc3]/60 border border-[#556b2f]/40 focus:ring-2 focus:ring-[#556b2f] focus:border-[#556b2f] outline-none transition appearance-none" // appearance-none ajuda na estilização cross-browser
                                    required
                                >
                                    
                                    <option value="" disabled>Selecione uma opção</option>
                                    <option value="aluno">Aluno(a)</option>
                                    <option value="ex_aluno">Ex-Aluno(a)</option>
                                    <option value="pai_responsavel">Pai, Mãe ou Responsável</option>
                                    <option value="professor">Professor(a)</option>
                                     <option value="futuro_aluno">Futuro Aluno/Interessado</option>
                                    <option value="funcionario">Funcionário(a)</option>
                                    <option value="candidato">Candidato(a) a vaga</option>
                                    <option value="outro">Outro</option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <label htmlFor="conteudo" className="block text-lg font-semibold mb-2">Conteúdo da Mensagem</label>
                            <textarea 
                                id="conteudo" 
                                rows="5"
                                value={conteudo}
                                onChange={(e) => setConteudo(e.target.value)}
                                className="w-full p-3 rounded-lg bg-[#e9dcc3]/60 border border-[#556b2f]/40 focus:ring-2 focus:ring-[#556b2f] focus:border-[#556b2f] outline-none transition" 
                                placeholder="Escreva sua dúvida, sugestão ou comentário aqui..." 
                                required
                            ></textarea>
                        </div>
                        <div className="text-center">
                            <button 
                                type="submit" 
                                className="bg-[#556b2f] text-white font-bold text-lg py-3 px-12 rounded-lg hover:bg-[#4a5f28] transition-colors duration-300 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#e9dcc3] focus:ring-[#556b2f]">
                                Enviar Mensagem
                            </button>
                        </div>
                    </form>
                </div>
            </section>
        </div>
    </main>
  );
}