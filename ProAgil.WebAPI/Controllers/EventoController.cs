using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ProAgil.Domain;
using ProAgil.Repository;

namespace ProAgil.WebAPI.Controllers
{
  //CONTROLLER DOS EVENTOS
  [Route("api/[controller]")]
  [ApiController]
  public class EventoController : ControllerBase
  {
    private readonly IProAgilRepository _repo;

    public EventoController(IProAgilRepository repo)
    {
      _repo = repo;
    }

    //Retorna todos os Eventos
    [HttpGet]
    public async Task<IActionResult> Get()
    {
      try
      {
        var results = await _repo.GetAllEventoAsync(true);
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
        var results = await _repo.GetEventoAsyncById(EventoId, true);
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
    public async Task<IActionResult> Post(Evento model)
    {
      try
      {
        _repo.Add(model); //Mudança de estado

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
    [HttpPut]
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
    [HttpDelete]
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