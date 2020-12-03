namespace ProAgil.WebAPI.DTOs
{
    public class RedeSocialDto
    {
        //Nos DTOs é possível definir os valores que serão retornado e mapeados pelo AutoMapper. No AutoMapper é possível criar uma configuração onde nós referênciamos os DTOs e criamos suas "Opções".

        //No caso em questão são definidos apenas os dados importantes para retornar ao usuário, funcionando como uma espécie de "filtro"
        public int Id { get; set; }

        public string Nome { get; set; }

        public string URL { get; set; }
    }
}