using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ProAgil.Domain;
using ProAgil.Repository;
using ProAgil.WebAPI.DTOs;

namespace ProAgil.WebAPI.Controllers
{
  //CONTROLLER DOS EVENTOS
  [Route("api/[controller]")]
  [ApiController]//Retorna erros de validação
  public class EventoController : ControllerBase
  {
    //Instância do Repositório
    private readonly IProAgilRepository _repo;

    //Instância do Mapeamento 
    private readonly IMapper _mapper;


    //Construtor da Controller
    public EventoController(IProAgilRepository repo, IMapper mapper)
    {
      _mapper = mapper;
      _repo = repo;
    }

    //Retorna todos os Eventos
    [HttpGet]
    public async Task<IActionResult> Get()
    {
      try
      {
        var eventos = await _repo.GetAllEventoAsync(true);
        //Pega os valores específicos do EventoDto, já que ele está sendo passado como parâmetro no método Map. No caso em questão, ele retorna um array de valores json 
        var results = _mapper.Map<EventoDto[]>(eventos);
        return Ok(results);
      }
      catch (System.Exception)
      {
        return this.StatusCode(StatusCodes.Status500InternalServerError, "Banco de Dados falhou!");
      }
    }

    //Retorna os eventos pelo ID
    [HttpGet("{EventoId}")]
    public async Task<IActionResult> Get(int EventoId)
    {
      try
      {
        var evento = await _repo.GetEventoAsyncById(EventoId, true);

        //Aqui também é usado o EventoDto, porém aqui não é necessário usar um array porque aqui só é retornado um valor, o ID do evento
        var results = _mapper.Map<EventoDto>(evento);

        return Ok(results);
      }
      catch (System.Exception)
      {
        return this.StatusCode(StatusCodes.Status500InternalServerError, "Banco de Dados falhou!");
      }
    }

    //Retorna os Eventos pelo tema (Nome do evento)
    [HttpGet("getByTema/{tema}")]
    public async Task<IActionResult> Get(string tema)
    {
      try
      {
        var results = await _repo.GetAllEventoAsyncByTema(tema, true);
        return Ok(results);
      }
      catch (System.Exception)
      {
        return this.StatusCode(StatusCodes.Status500InternalServerError, "Banco de Dados falhou!");
      }
    }


    //FUNÇÕES DA CONTROLLER
    //-----------------------------------------------------------------------------------

    //Função de Inserir
    [HttpPost]
    public async Task<IActionResult> Post(EventoDto model)
    {
      try
      {
        //Aqui é passado no método Map a classe de eventos em que será realizada ação do método Post. Aqui ocorre um mapeamento da classe Evento para que possa ser atribuído aos respectivos campos no Banco de Dados.

        //Com o mapeamento fica mais simples de definir o que será alterado, adicionado ou excluído do banco de dados
        var evento = _mapper.Map<Evento>(model);

        _repo.Add(evento); //Mudança de estado

        if (await _repo.SaveChangesAsync())
        {
          //Salva todas as mudanças de estado
          return Created($"/api/evento/{model.Id}", model);
        }
      }
      catch (System.Exception)
      {
        return this.StatusCode(StatusCodes.Status500InternalServerError, "Banco de Dados falhou!");
      }

      return BadRequest();//Se não conseguir fazer o post, ele retorna um Bad Request
    }

    //Função de Update
    //--------------------------------------------------
    //Recebe o id do evento como parâmetro para que quando o botão de editar seja clicado, ele receba o id do evento em questão e faça com que assim possa ser realizada a função de update no banco de dados
    [HttpPut("{EventoId}")]
    public async Task<IActionResult> Put(int EventoId, Evento model)
    {
      try
      {
        var evento = await _repo.GetEventoAsyncById(EventoId, false);//Esperar para retornar o Evento

        //Se não encontrar um evento ele retorna um NotFound()
        if (evento == null)
        {
          return NotFound();
        }

        _repo.Update(model); //Mudança de estado

        if (await _repo.SaveChangesAsync())
        {
          //Salva todas as mudanças de estado
          return Created($"/api/evento/{model.Id}", model);
        }
      }
      catch (System.Exception)
      {
        return this.StatusCode(StatusCodes.Status500InternalServerError, "Banco de Dados falhou!");
      }

      return BadRequest();//Se não conseguir fazer o post, ele retorna um Bad Request
    }


    //Função Delete
    //------------------------------------------------------------
    //Recebe como parâmetro o id do evento em questão, esse id será usado para excluir um evento específico e suas informações
    [HttpDelete("{EventoId}")]
    public async Task<IActionResult> Delete(int EventoId)
    {
      try
      {
        var evento = await _repo.GetEventoAsyncById(EventoId, false);//Esperar para retornar o Evento

        //Se não encontrar um evento ele retorna um NotFound()
        if (evento == null)
        {
          return NotFound();
        }

        _repo.Delete(evento); //Mudança de estado

        if (await _repo.SaveChangesAsync())
        {
          //Salva todas as mudanças de estado
          return Ok();
        }
      }
      catch (System.Exception)
      {
        return this.StatusCode(StatusCodes.Status500InternalServerError, "Banco de Dados falhou!");
      }

      return BadRequest();//Se não conseguir fazer o post, ele retorna um Bad Request
    }

  }
}