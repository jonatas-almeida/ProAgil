using System.Linq;
using AutoMapper;
using ProAgil.Domain;
using ProAgil.Domain.Identity;
using ProAgil.WebAPI.DTOs;

namespace ProAgil.WebAPI.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            //Referenciando as classes que irão ser utilizadas pelo AutoMapper

            //O mapeamento serve para referenciarmos com mais "segurança" qual objeto está sendo consumido da API. É necessário esse referênciamento porque ele é de muitos pra muitos, então é necessário especificar o que queremos pegar de informações importantes.

            //É usado o ReverseMap para que o mapeamento seja feito por completo
            
            //O método PUT na controller teve que ser refeito porque algumas valores mudaram de tipo, como é o caso do DateTime que mudou para string.
            CreateMap<Evento, EventoDto>().ForMember(dest => dest.Palestrantes, opt => {
                opt.MapFrom(src => src.PalestrantesEventos.Select(x => x.Palestrante).ToList());
            }).ReverseMap();
            CreateMap<Palestrante, PalestranteDto>().ForMember(dest => dest.Eventos, opt => {
                opt.MapFrom(src => src.PalestrantesEventos.Select(x => x.Evento).ToList());
            }).ReverseMap();
            CreateMap<Lote, LoteDto>().ReverseMap();
            CreateMap<RedeSocial, RedeSocialDto>().ReverseMap();

            CreateMap<User, UserDto>().ReverseMap();
            CreateMap<User, UserLoginDto>().ReverseMap();
        }
    }
}