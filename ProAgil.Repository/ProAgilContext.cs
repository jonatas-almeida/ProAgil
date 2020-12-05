using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using ProAgil.Domain;
using ProAgil.Domain.Identity;

namespace ProAgil.Repository
{
  public class ProAgilContext : IdentityDbContext<User, Role, int, IdentityUserClaim<int>, UserRole, IdentityUserLogin<int>, IdentityRoleClaim<int>, IdentityUserToken<int>>
  {
    public ProAgilContext(DbContextOptions<ProAgilContext> options) : base(options) { }

    //Cria as tabelas do banco de dados com o DbSet
    //Se precisar criar outra tabela é só repetir o processo para as classes que você desejar que tenham uma tabela, como foi o caso do Evento
    public DbSet<Evento> Eventos { get; set; }

    public DbSet<Palestrante> Palestrantes { get; set; }

    public DbSet<PalestranteEvento> PalestrantesEventos { get; set; }

    public DbSet<Lote> Lotes { get; set; }

    public DbSet<RedeSocial> RedesSociais { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {

      base.OnModelCreating(modelBuilder);

      modelBuilder.Entity<UserRole>(userRole => {
        //Cria a relação entre os usuários e os seus cargos
        userRole.HasKey(ur => new {ur.UserId, ur.RoleId});

        //Cria um relacionamento N pra N entre os cargos(Roles) e os usuários(Users)
        userRole.HasOne(ur => ur.Role).WithMany(r => r.UserRoles).HasForeignKey(ur => ur.RoleId).IsRequired();

        //Cria um relacionamento N pra N entre os os usuários(Users) e os cargos(Roles)
        userRole.HasOne(ur => ur.User).WithMany(r => r.UserRoles).HasForeignKey(r => r.UserId).IsRequired();

      });
  

      //Criando relacionamento entre o Evento e o Palestrante
      modelBuilder.Entity<PalestranteEvento>().HasKey(PE => new { PE.EventoId, PE.PalestranteId });
    }
  }
}