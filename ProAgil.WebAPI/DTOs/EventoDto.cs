using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace ProAgil.WebAPI.DTOs
{
    //Nos DTOs é possível definir os valores que serão retornado e mapeados pelo AutoMapper. No AutoMapper é possível criar uma configuração onde nós referênciamos os DTOs e criamos suas "Opções".

    //No caso em questão são definidos apenas os dados importantes para retornar ao usuário, funcionando como uma espécie de "filtro"

    //É usado o Data Annotation para validar não só apenas no Front-End, mas também no Back-End
    public class EventoDto
    {
        public int Id { get; set; }

        [Required (ErrorMessage="Campo obrigatório")]
        [StringLength(100, MinimumLength=3, ErrorMessage="Local é entre 3 e 100 caracteres")]
        public string Local { get; set; }

        [Required (ErrorMessage="A data do evento deve ser definida")]
        public DateTime DataEvento { get; set; }

        [Required (ErrorMessage="O tema deve ser preenchido")]
        public string Tema { get; set; }

        [Range (2, 12000, ErrorMessage="Quantidade de pessoas é entre 2 e 120.000")]
        public int QtdPessoas { get; set; }

        public string Lote { get; set; }

        [Phone]
        public string Telefone { get; set; }

        [EmailAddress]
        public string Email { get; set; }

        [Required (ErrorMessage="A imagem deve ser adicionada ao evento")]
        public string ImagemURL { get; set; }

        public List<LoteDto> Lotes { get; set; }
        
        public List<RedeSocialDto> RedesSociais { get; set; }

        public List<PalestranteDto> Palestrantes { get; set; }
    }
}