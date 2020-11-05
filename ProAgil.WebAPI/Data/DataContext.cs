using Microsoft.EntityFrameworkCore;
using ProAgil.WebAPI.Model;

namespace ProAgil.WebAPI.Data
{
  public class DataContext : DbContext
  {
    public DataContext(DbContextOptions<DataContext> options) : base (options) {}

    //Cria as tabelas do banco de dados com o DbSet
    //Se precisar criar outra tabela é só repetir o processo para as classes que você desejar que tenham uma tabela, como foi o caso do Evento
    public DbSet<Evento> Eventos { get; set; }
  }
}