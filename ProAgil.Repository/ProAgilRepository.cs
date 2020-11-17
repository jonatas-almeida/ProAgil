using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using ProAgil.Domain;

namespace ProAgil.Repository
{
  public class ProAgilRepository : IProAgilRepository
  {
    private readonly ProAgilContext _context;

    public ProAgilRepository(ProAgilContext context)
    {
      _context = context;
      _context.ChangeTracker.QueryTrackingBehavior = QueryTrackingBehavior.NoTracking;
    }

    //GERAIS
    public void Add<T>(T entity) where T : class
    {
      _context.Add(entity);
    }

    public void Update<T>(T entity) where T : class
    {
      _context.Update(entity);
    }

    public void Delete<T>(T entity) where T : class
    {
      _context.Remove(entity);
    }

    public async Task<bool> SaveChangesAsync()
    {
      return (await _context.SaveChangesAsync()) > 0; //Se o valor do boolean for maior que zero, significa que algum dado foi salvo
    }


    //EVENTO
    public async Task<Evento[]> GetAllEventoAsync(bool includePalestrantes = false)//Esse parâmetro se torna opcional quando adicionado o valor booleano, fica ao critério do usuário 
    {
      //Faz uma query para puxar os palestrantes e ao mesmo tempo puxa Lotes e Redes Sociais
      IQueryable<Evento> query = _context.Eventos.Include(c => c.Lotes).Include(c => c.RedesSociais);

      //Se o parâmetro includePalestrantes for passado como TRUE
      if (includePalestrantes)
      {
        query = query.Include(pe => pe.PalestrantesEventos).ThenInclude(p => p.Palestrante);
      }

      query = query.AsNoTracking().OrderByDescending(c => c.DataEvento);

      return await query.ToArrayAsync();
    }

    //Pesquisa por tema
    public async Task<Evento[]> GetAllEventoAsyncByTema(string tema, bool includePalestrantes)
    {
      IQueryable<Evento> query = _context.Eventos.Include(c => c.Lotes).Include(c => c.RedesSociais);

      if (includePalestrantes)
      {
        query = query.Include(pe => pe.PalestrantesEventos).ThenInclude(p => p.Palestrante);
      }

      query = query.AsNoTracking().OrderByDescending(c => c.DataEvento).Where(c => c.Tema.ToLower().Contains(tema.ToLower()));

      return await query.ToArrayAsync();
    }

    public async Task<Evento> GetEventoAsyncById(int EventoId, bool includePalestrantes)
    {
      IQueryable<Evento> query = _context.Eventos.Include(c => c.Lotes).Include(c => c.RedesSociais);

      if (includePalestrantes)
      {
        query = query.Include(pe => pe.PalestrantesEventos).ThenInclude(p => p.Palestrante);
      }

      query = query.AsNoTracking().OrderByDescending(c => c.DataEvento).Where(c => c.Id == EventoId);

      return await query.FirstOrDefaultAsync();
    }


    //PALESTRANTES
    //Retorna apenas um palestrante. Usa-se o Task para abrir uma Thread para não travar o banco de dados e assim ter uma resposta assíncrona melhor.
    public async Task<Palestrante> GetPalestranteAsync(int PalestranteId, bool includeEventos = false)
    {
      IQueryable<Palestrante> query = _context.Palestrantes.Include(c => c.RedesSociais);

      if(includeEventos){
        query = query.Include(pe => pe.PalestrantesEventos).ThenInclude(e => e.Evento);
      }

      query = query.AsNoTracking().OrderBy(c => c.Nome).Where(p => p.Id == PalestranteId);

      return await query.FirstOrDefaultAsync();
    }


    public async Task<Palestrante[]> GetAllPalestrantesAsyncByName(string name, bool includeEventos = false)
    {
      IQueryable<Palestrante> query = _context.Palestrantes.Include(c => c.RedesSociais);

      if(includeEventos){
        query = query.Include(pe => pe.PalestrantesEventos).ThenInclude(e => e.Evento);
      }

      query = query.Where(p => p.Nome.ToLower().Contains(name.ToLower()));

      return await query.ToArrayAsync();
    }


  }
}