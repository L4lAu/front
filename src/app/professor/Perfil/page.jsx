'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  User, Mail, Phone, MapPin, GraduationCap, Building2, Pencil, Check, X, LogOut, Wrench
} from 'lucide-react';

const EditableInfoItem = ({ icon, label, value, isEditing, onChange }) => {
  return (
    <div className="flex items-start space-x-4">
      <div className="rounded-full  p-3 text-[#556b2f] shrink-0 border border-[#556b2f]">
        {icon}
      </div>
      <div className="w-full">
        <p className="text-sm font-semibold text-[#556b2f]">{label}</p>
        {isEditing ? (
          <input
            type="text"
            value={value}
            onChange={onChange}
            className="w-full p-1 text-black bg-transparent border-b-2 border-gray-400 focus:outline-none focus:border-[#556b2f] transition-colors
                       text-base sm:text-lg" // Fonte um pouco menor em telas muito pequenas
          />
        ) : (
          <p className="pt-1 text-black min-h-[32px]
                       text-base sm:text-lg" // Fonte um pouco menor em telas muito pequenas
          >
            {value}
          </p>
        )}
      </div>
    </div>
  );
};

const PerfilPageFinal = () => {
  const [isEditing, setIsEditing] = useState(false);
  
  const [profileData, setProfileData] = useState({
    bio: 'Professor Convidado pela instituição para ministrar algumas aulas técnicas e de nível médio. Qualquer dúvida consultar a secretaria.',
    email: 'Convidado.Prof@email.com',
    telefone: '(00) 00000-0000',
    rua: 'Rua das Oportunidades, 123',
    cidade: 'Av Paulista SP, BR'
  });
  
  const [originalProfileData, setOriginalProfileData] = useState(profileData);

  const handleEditClick = () => { setOriginalProfileData(profileData); setIsEditing(true); };
  const handleSaveClick = () => { setIsEditing(false); console.log("Dados salvos:", profileData); };
  const handleCancelClick = () => { setProfileData(originalProfileData); setIsEditing(false); };
  const handleInputChange = (field, value) => { setProfileData(prevData => ({ ...prevData, [field]: value })); };

  return (
    <main className="flex items-center min-h-screen bg-[#f4deb5] p-2 sm:p-4 md:p-8 font-sans">
      
      {/* CARD DO PERFIL - Classes de responsividade adicionadas */}
      <div 
        className="w-full max-w-3xl mx-auto bg-[#fff6e0] rounded-2xl p-6 md:p-8 transition-all duration-300
                   shadow-[0_7px_0px_1.1px] shadow-[#556b2f]" // Padding menor em telas pequenas
      >
        
        <div className="text-center md:text-left mb-2">
          <p className="text-sm text-gray-500">Você está logado como:</p>
          {/* Fonte do título ajustada para telas menores */}
          <h1 className="text-3xl md:text-4xl font-bold text-black">Convidado</h1>
        </div>
        
        <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-8">
          <div className="relative flex-shrink-0">
             {/* Tamanho do Avatar ajustado para telas menores */}
            <div className="w-28 h-28 md:w-36 md:h-36 rounded-full bg-gray-200 flex items-center justify-center border-2 border-[#556b2f]">
              <User className="w-16 h-16 md:w-20 md:h-20 text-gray-400" />
            </div>
            <span className="absolute bottom-1 right-0 md:bottom-2 md:right-1 bg-green-500 w-5 h-5 rounded-full border-4 border-[#f4deb5]" title="Online"></span>
          </div>
          
          <div className="w-full text-center md:text-left">
            <h3 className="text-lg font-bold text-[#556b2f] mb-2">Biografia</h3>
            {isEditing ? (
              <textarea
                value={profileData.bio}
                onChange={(e) => handleInputChange('bio', e.target.value)}
                className="w-full p-2 text-black border border-[#c28762] rounded-md focus:ring-2 focus:ring-[#556b2f] transition-shadow duration-200 bg-white/50 text-base"
                rows="5"
              />
            ) : (
              <p className="text-black leading-relaxed text-base">{profileData.bio}</p>
            )}
          </div>
        </div>

        <hr className="my-6 md:my-8 border-[#c28766]" />

        {/* Grid com espaçamento ajustado */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 md:gap-x-8 md:gap-y-6">
          <div className="space-y-6">
            <h3 className="text-lg md:text-xl font-bold text-[#556b2f]">Educação</h3>
            <div className="flex items-start space-x-4">
                <div className="rounded-full  p-3 text-[#556b2f] border border-[#556b2f]"><GraduationCap size={24} /></div>
                <div>
                    <p className="text-sm font-semibold text-[#556b2f]">Formação Principal</p>
                    <p className="text-lg text-black">Engenheiro de Controle e Automação</p>
                </div>
            </div>
            <div className="flex items-start space-x-4">
                <div className="rounded-full  p-3 text-[#556b2f] border border-[#556b2f]"><Wrench size={24} /></div>
                <div>
                    <p className="text-sm font-semibold text-[#556b2f]">Cursos Ministrados</p>
                    <ul className="text-lg text-black list-disc list-inside">
                        <li>Desenvolvimento de Sistemas</li>
                        <li>Automação Industrial</li>
                    </ul>
                </div>
            </div>
          </div>
          <div className="space-y-6">
            <h3 className="text-lg md:text-xl font-bold text-[#556b2f] border-[#556b2f]">Contato & Endereço</h3>
            <EditableInfoItem icon={<Mail size={24} />} label="Email" value={profileData.email} isEditing={isEditing} onChange={(e) => handleInputChange('email', e.target.value)} />
            <EditableInfoItem icon={<Phone size={24} />} label="Telefone" value={profileData.telefone} isEditing={isEditing} onChange={(e) => handleInputChange('telefone', e.target.value)} />
            <EditableInfoItem icon={<MapPin size={24} />} label="Rua" value={profileData.rua} isEditing={isEditing} onChange={(e) => handleInputChange('rua', e.target.value)} />
            <EditableInfoItem icon={<Building2 size={24} />} label="Cidade / Estado" value={profileData.cidade} isEditing={isEditing} onChange={(e) => handleInputChange('cidade', e.target.value)} />
          </div>
        </div>

        {/* Seção de botões com melhor empilhamento em mobile */}
        <div className="mt-10 pt-6 border-t border-[#c28762] flex flex-col-reverse sm:flex-row items-center justify-between gap-4">
          <Link href="/professores" className="flex items-center justify-center gap-2 text-[#556b2f] font-semibold hover:text-[#556b2f] transition-colors w-full sm:w-auto">
            <LogOut className="w-5 h-5" />
            <span>Sair</span>
          </Link>
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            {isEditing ? (
              <>
                <button onClick={handleCancelClick} className="font-bold text-gray-600 hover:text-red-600 transition-colors px-6 py-2 rounded-lg w-full sm:w-auto">Cancelar</button>
                <button onClick={handleSaveClick} className="flex items-center justify-center gap-2 bg-[#556b2f] text-white font-bold py-2 px-6 rounded-lg transition-transform transform hover:scale-105 w-full sm:w-auto">
                  <Check className="w-5 h-5" /> Salvar Alterações
                </button>
              </>
            ) : (
              <button onClick={handleEditClick} className="flex items-center justify-center gap-2 bg-[#556b2f] text-white font-bold py-2 px-6 rounded-lg transition-colors hover:bg-gray-300 w-full sm:w-auto">
                <Pencil className="w-4 h-4" /> Editar Perfil
              </button>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default PerfilPageFinal;