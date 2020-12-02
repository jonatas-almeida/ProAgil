using System.Collections.Generic;

namespace ProAgil.WebAPI.DTOs
{
    //Nos DTOs é possível definir os valores que serão retornado e mapeados pelo AutoMapper. No AutoMapper é possível criar uma configuração onde nós referênciamos os DTOs e criamos suas "Opções".

    //No caso em questão são definidos apenas os dados importantes para retornar ao usuário, funcionando como uma espécie de "filtro"
    public class EventoDto
    {
        public int Id { get; set; }

        public string Local { get; set; }

        public string DataEvento { get; set; }

        public string Tema { get; set; }

        public int QtdPessoas { get; set; }

        public string Lote { get; set; }

        public string Telefone { get; set; }

        public string Email { get; set; }

        public string ImagemURL { get; set; }

        public List<LoteDto> Lotes { get; set; }
        
        public List<RedeSocialDto> RedesSociais { get; set; }

        public List<PalestranteDto> Palestrantes { get; set; }
    }
}