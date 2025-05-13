using Microsoft.EntityFrameworkCore;
using music_backend_asp.Models;
using System.Collections.Generic;

namespace music_backend_asp
{
    public class MusicContext : DbContext
    {
        public MusicContext(DbContextOptions<MusicContext> options) : base(options) { }

        public DbSet<Song> Songs { get; set; }
    }
}
