using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Deftility.Data.Repository
{
    public class EfRepository<TEntity> : IRepository<TEntity>
        where TEntity : class
    {
        private readonly ApplicationDbContext context;
        private readonly DbSet<TEntity> dbSet;

        public EfRepository(ApplicationDbContext context)
        {
            this.context = context;
            this.dbSet = context.Set<TEntity>();
        }

        public IQueryable<TEntity> All()
        {
            return this.dbSet;
        }

        public IQueryable<TEntity> AllAsNoTracking()
        {
            return this.dbSet.AsNoTracking();
        }

        public void Add(TEntity entity)
        {
            this.dbSet.Add(entity);
        }

        public void AddRange(IEnumerable<TEntity> entities)
        {
            this.dbSet.AddRange(entities);
        }

        public void Update(TEntity entity)
        {
            this.dbSet.Update(entity);
        }

        public void Remove(TEntity entity)
        {
            this.dbSet.Remove(entity);
        }

        public void RemoveRange(IEnumerable<TEntity> entities)
        {
            this.dbSet.RemoveRange(entities);
        }

        public Task<int> SaveChangesAsync()
        {
            return this.context.SaveChangesAsync();
        }
    }
}
