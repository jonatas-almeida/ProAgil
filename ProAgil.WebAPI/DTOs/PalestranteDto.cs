using System.Collections.Generic;

namespace ProAgil.WebAPI.DTOs
{
    public class PalestranteDto
    {
        //Nos DTOs é possível definir os valores que serão retornado e mapeados pelo AutoMapper. No AutoMapper é possível criar uma configuração onde nós referênciamos os DTOs e criamos suas "Opções".

        //No caso em questão são definidos apenas os dados importantes para retornar ao usuário, funcionando como uma espécie de "filtro"
        
        public int Id { get; set; }

        public string Nome { get; set; }

        public string MiniCurriculo { get; set; }

        public string ImagemURL { get; set; }
        
        public string Telefone { get; set; }

        public string Email { get; set; }

        public List<RedeSocialDto> RedesSociais { get; set; }

        public List<EventoDto> Eventos { get; set; }
    }
}